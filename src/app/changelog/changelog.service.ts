import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { concatMap, delay, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { combineLatest, EMPTY, forkJoin, Observable, of, timer, zip } from 'rxjs';

import { GithubService } from '~/app/shared/github/github.service';

@Injectable({
  providedIn: 'root',
})
export class ChangelogService {
  changelog = this.db.collection('changelog');
  changelog$ = this.changelog.valueChanges().pipe(
    map((x) => {
      return x.filter((release: any) => !!release.date).sort(this.sortByDate);
    })
  );

  constructor(private db: AngularFirestore, private github: GithubService) {}

  updateChangelog(fromVersion?, toVersion?) {
    this.getChangelog(fromVersion, toVersion).subscribe((release) => {
      if (!this.github.useMocks) {
        console.log('set ', release.name, ' at firebase');
        this.changelog.doc(release.name).set(release);
      }
    });
  }

  private getChangelog(fromVersion?, toVersion?) {
    let tags: string[];
    let currentTag: string;
    let previousTag: string;
    const delayed = 180000;

    return this.versionsToUpdate(fromVersion, toVersion).pipe(
      map((x) => {
        tags = x.tags;
        return x.versionsToUpdate;
      }),
      mergeMap((x) => x),
      concatMap((x) => of(x).pipe(delay(delayed))),
      switchMap((x: string) => {
        const indexOfPreviousTag = tags.indexOf(x) + 1;
        currentTag = x;
        previousTag = tags[indexOfPreviousTag] || tags[tags.length - 1];

        return forkJoin(this.github.compareCommits(previousTag, currentTag));
      }),
      switchMap((compares: any) => {
        const pullRequests = compares[0].commits.map((compare: any, index: number) => {
          return of(compares).pipe(
            delay(index * 3000),
            switchMap(() => this.github.searchAssociatedPullRequest(compare.sha))
          );
        });
        return forkJoin(pullRequests);
      }),
      map((searchResults: any) => {
        let pullRequests = [];
        let items = searchResults
          .map((x: any) => x.items[0])
          .filter((x: any) => {
            return !!x;
          });
        return this.getUnique(items, 'number');
      }),
      map((pullRequests) => {
        if (pullRequests.length === 0) return { name: currentTag };
        return {
          name: currentTag,
          date: pullRequests[0].closed_at,
          compareLink: `https://github.com/kirbydesign/designsystem/compare/${previousTag}...${currentTag}`,
          associatedPullRequests: pullRequests.map((pullRequest) => {
            return {
              closed_at: pullRequest.closed_at,
              number: pullRequest.number,
              title: pullRequest.title,
              labels: pullRequest.labels.map((label: any) => {
                return { name: label.name, color: label.color };
              }),
            };
          }),
        };
      })
    );
  }

  private getUnique(arr, comp) {
    const unique = arr
      .map((e) => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }

  private versionsToUpdate(fromVersion?, toVersion?): Observable<any> {
    const changelog$ = this.changelog.valueChanges().pipe(take(1));
    const tags$ = this.github.getAllTags();

    const versions$ = combineLatest(changelog$, tags$).pipe(
      map(([changelog, tags]: any) => {
        return [changelog.map((x) => x.name), tags.map((x) => x.name)];
      }),
      map(([changelog, tags]: any) => {
        let versionsToUpdate = tags;

        if (fromVersion || toVersion) {
          const indexOfFromVersion = tags.indexOf(fromVersion);
          const indexOfToVersion = tags.indexOf(toVersion);

          versionsToUpdate = tags.slice(
            indexOfToVersion > -1 ? indexOfToVersion : 0,
            indexOfFromVersion > -1 ? indexOfFromVersion + 1 : tags.length
          );
        } else {
          // Find missing versions
          versionsToUpdate = tags.filter((tag) => changelog.indexOf(tag) === -1);
        }

        console.log('versions to update', versionsToUpdate.length);

        return {
          versionsToUpdate,
          tags,
        };
      })
    );

    return versions$;
  }

  private sortByDate(a: any, b: any) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }
}
