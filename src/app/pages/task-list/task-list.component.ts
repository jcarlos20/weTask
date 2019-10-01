import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService, AuthService, UsersService } from '../../services/services.index';
import { Task } from 'src/app/models/task';
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from 'firebase';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  idUser: string;
  tasks: any[];
  taskTitle: string;
  editCache: string;
  checkButton: boolean;
  completed: number;
  uncompleted: number;
  user: User;

  constructor(private route: ActivatedRoute,
    private taskService: TasksService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private userService: UsersService) { }

  ngOnInit() {
    this.editCache = '';
    this.taskTitle = '';
    this.checkOptionButton();
    this.route.paramMap.subscribe(params => {
      this.idUser = params.get("id");
      // console.log(this.idUser)
      this.taskService.getTasks(this.idUser).subscribe(tasks => {
        this.tasks = tasks;
        this.uncompleted = this.tasks.filter(task => !task.completed).length;
        this.completed = this.tasks.filter(task => task.completed).length;
      })
      this.userService.getOneUser(this.idUser).subscribe(user => {
        this.user = <User>user;
      });
    })
  }

  addTask() {
    if (this.taskTitle.trim().length === 0) {
      return;
    }
    const newTask: Task = {
      title: this.taskTitle,
      completed: false,
      editing: false
    }
    if (this.authService.verifyUser(this.idUser)) {
      this.taskService.addTask(this.idUser, newTask);
      this.taskTitle = '';
    } else {
      this.snackBar.open('Can not add others Task', 'OK', {
        duration: 3000
      });
    }
  }

  deleteTask(idTask: string): void {
    if (this.authService.verifyUser(this.idUser)) {
      this.taskService.deleteTask(this.idUser, idTask);
    } else {
      this.snackBar.open('Can not delete others Task', 'OK', {
        duration: 3000
      });
    }
  }

  editTask(task: Task): void {
    if (this.authService.verifyUser(this.idUser)) {
      this.editCache = task.title;
      task.editing = true;
      console.log(task);
    } else {
      this.snackBar.open('Can not edit others Task', 'OK', {
        duration: 3000
      });
    }
  }

  doneEdit(task: Task): void {
    if (task.title.trim().length === 0) {
      task.title = this.editCache
    }
    this.editCache = task.title;
    task.editing = false;
    this.taskService.updateTask(this.idUser, task);
  }

  cancelEditing(task: Task): void {
    task.title = this.editCache;
    task.editing = false;
  }

  completeTask(task: Task) {

    if (this.authService.verifyUser(this.idUser)) {
      if (task.completed === false) {
        task.completed = true;
      } else {
        task.completed = false;
      }
      this.taskService.updateTask(this.idUser, task);
    } else {
      this.snackBar.open('Can not complete others Task', 'OK', {
        duration: 3000
      });
    }
  }

  checkOptionButton(): boolean{
    if (this.authService.verifyUser(this.idUser)) {
      return false;
    } else {
      return true;
    }
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter(task => !task.completed);
  }
}
