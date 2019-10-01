import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from "firebase/app";
import { User } from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) { }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(user => {
      this.db.doc(`users/${user.user.uid}`).ref.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            return;
          } else {
            return this.db.collection<User>('users').doc(user.user.uid).set({
              displayName: user.user.displayName,
              uid: user.user.uid,
              email: user.user.email,
              photoURL: user.user.photoURL
            });
          }
        })
    });
  }
  
  logout() {
    this.afAuth.auth.signOut();
  }

  verifyUser(idUser: string): boolean{
    if(this.afAuth.auth.currentUser.uid === idUser){
      return true;
    }else{
      return false;
    }
  }
}
