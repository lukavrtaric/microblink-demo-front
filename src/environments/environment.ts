// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendAPIUrl: 'http://localhost:4000',
  //backendAPIUrl: 'https://us-central1-microblinkdemo-79e7b.cloudfunctions.net/microblinkapi',
  firebaseConfig: {
    apiKey: "AIzaSyCFwJvoIvF9CjHz3CI_hB1TPu1VLr2BXKI",
    authDomain: "microblinkdemo-79e7b.firebaseapp.com",
    databaseURL: "https://microblinkdemo-79e7b.firebaseio.com",
    projectId: "microblinkdemo-79e7b",
    storageBucket: "microblinkdemo-79e7b.appspot.com",
    messagingSenderId: "31984227640",
    appId: "1:31984227640:web:fa706521da8ae39a229dcd"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
