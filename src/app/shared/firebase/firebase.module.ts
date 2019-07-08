import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '~/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [],
  imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
  exports: [AngularFirestoreModule],
})
export class FirebaseModule {}
