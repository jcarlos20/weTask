import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/services.index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login();
    
  }
  logout() {
    this.authService.logout();
  }

}
