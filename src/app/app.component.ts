import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'to-do-list';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBF0N7-WaQD_q43zxJRgOVmhiC72JT8Epw",
      authDomain: "to-do-21db6.firebaseapp.com",
    })
  }
}
