import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Task } from "../../models/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private db: AngularFirestore) { }

  getTasks(idUser: string){
    return this.db.collection(`users/${idUser}/tasks`, ref => ref.orderBy('completed')).valueChanges({idField: 'id'})
  }

  addTask(idUser: string, task: Task){
    this.db.collection(`users/${idUser}/tasks`).add(task);
  }

  deleteTask(idUser: string, idTask: string): void{
    this.db.collection(`users/${idUser}/tasks`).doc(idTask).delete();
  }

  updateTask(idUser: string, task: Task): void{
    this.db.collection(`users/${idUser}/tasks`).doc(task.id).update(task);
  }
}
