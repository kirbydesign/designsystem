import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { expand, map, toArray } from 'rxjs/operators';

import { environment } from '~/environments/environment';
import { GithubTag } from '~/app/shared/github/github.interfaces';
import { tags } from './mocks/tags';
import { compare } from './mocks/compare';
import { associatedPullReqeusts } from './mocks/associated-pull-request';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  useMocks: boolean = false;
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'token ' + environment.oauth.githubToken1 + environment.oauth.githubToken2,
    }),
  };

  constructor(private http: HttpClient) {}

  // TODO: GET ALL TAGS
  getTags(page = 1): Observable<any> {
    if (this.useMocks) {
      return of(tags);
    }
    const url = `${environment.githubApi}/repos/kirbydesign/designsystem/tags?page=${page}&per_page=100`;
    return this.http.get<GithubTag[]>(url, this.httpOptions);
  }

  getAllTags() {
    let page = 1;
    let tags = [];
    return this.getTags(page).pipe(
      expand((fetchedTags) => {
        if (fetchedTags.length > 0) {
          tags = tags.concat(fetchedTags);
          return this.getTags(++page);
        } else {
          return EMPTY;
        }
      }),
      toArray(),
      map(() => tags)
    );
  }

  compareCommits(previousVersion: string, nextVersion: string) {
    if (this.useMocks) {
      return of(compare);
    }
    const url = `${environment.githubApi}/repos/kirbydesign/designsystem/compare/${previousVersion}...${nextVersion}`;
    return this.http.get(url, this.httpOptions);
  }

  searchAssociatedPullRequest(sha: string) {
    if (this.useMocks) {
      return of(associatedPullReqeusts);
    }
    const url = `${environment.githubApi}/search/issues?q=SHA:${sha}`;
    return this.http.get(url, this.httpOptions);
  }
}
