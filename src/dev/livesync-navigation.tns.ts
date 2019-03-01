import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { onBeforeLivesync, onAfterLivesync } from 'nativescript-angular/platform-common';
import { RouterExtensions } from 'nativescript-angular/router';

let cachedUrl: string;
onBeforeLivesync.subscribe((moduleRef) => {
  console.log('#### onBeforeLivesync');
  if (moduleRef) {
    const router = <Router>moduleRef.injector.get(Router);
    cachedUrl = router.url;
    console.log('-------> Caching URL: ' + cachedUrl);
  }
});

onAfterLivesync.subscribe(({ moduleRef, error }) => {
  console.log(`#### onAfterLivesync`);
  if (moduleRef) {
    const router = <RouterExtensions>moduleRef.injector.get(RouterExtensions);
    const ngZone = <NgZone>moduleRef.injector.get(NgZone);
    if (router && cachedUrl) {
      console.log('-------> Navigating to cached URL: ' + cachedUrl);
      ngZone.run(() => {
        // <--  should be wrapped in ngZone
        router.navigateByUrl(cachedUrl, { animated: false });
      });
    }
  }
});
