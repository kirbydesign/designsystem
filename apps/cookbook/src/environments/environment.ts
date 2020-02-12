// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  githubBaseUrl: 'https://github.com/kirbydesign/designsystem',
  githubApi: 'https://api.github.com',
  oauth: {
    githubToken1: 'd84e5664fdc88216170',
    githubToken2: '38b876845f9e791425f45',
  },
  firebase: {
    apiKey: 'AIzaSyAywQylHrFlUNN2v6PD96Gc_82Erwbw7E4',
    authDomain: 'kirby-1817d.firebaseapp.com',
    databaseURL: 'https://kirby-1817d.firebaseio.com',
    projectId: 'kirby-1817d',
    storageBucket: 'kirby-1817d.appspot.com',
    messagingSenderId: '168198500869',
    appId: '1:168198500869:web:d6c5f3fe74a653d0',
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
