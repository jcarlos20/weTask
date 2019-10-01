import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFirestore) { }

  getUsers(){
    return this.db.collection('users').valueChanges({idField: 'id'})
  }

  getOneUser(idUser: string){
    return this.db.collection('users').doc(idUser).valueChanges();
  }
}
