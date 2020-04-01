import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


export interface Item { name: string; email: string }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private db: AngularFirestore, private auth: AuthService) { 
   
  }
  save(user: firebase.User){
    this.db.collection('user').doc(user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
  get(uid: string): AngularFirestoreDocument<AppUser>{
    return this.db.collection('user').doc(uid);
  }
 
  
  
}
