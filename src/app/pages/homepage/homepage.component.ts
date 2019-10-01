import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersService } from '../../services/services.index';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  displayedColumns: string[] = ['photoURL','displayName' ];

  users: any[];
  constructor(
    public afAuth:AngularFireAuth, 
    public snackBar: MatSnackBar,
    private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => (this.users = users))
  }

  authError(){
    this.snackBar.open('You must be logged', 'OK', {
      duration: 3000
    });
  }

}
