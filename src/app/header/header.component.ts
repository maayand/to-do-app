import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.srevice';
import { ToDoService } from '../do-list/to-do.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public authService: AuthService,
               public toDoService: ToDoService) { }

  ngOnInit() {
  }
  onLogout(){
    this.authService.logout();
    this.toDoService.reset();
    
  }

}
