import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '~/environments/environment';

@NgModule({
  declarations: [],
  imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
  exports: [AngularFirestoreModule],
})
export class FirebaseModule {}
