import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '~/environments/environment';

@Component({
  selector: 'kirby-current-version',
  templateUrl: './current-version.component.html',
  styleUrls: ['./current-version.component.scss'],
})
export class CurrentVersionComponent implements OnInit {
  version: Observable<string>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setVersion();
  }

  private setVersion() {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'token ' + environment.oauth.githubToken1 + environment.oauth.githubToken2,
      }),
    };
    const url = environment.githubApi + '/repos/kirbydesign/designsystem/contents/package.json';
    this.version = this.http.get(url, options).pipe(
      map((file: any) => atob(file.content)),
      map((content) => JSON.parse(content).version)
    );
  }
}
