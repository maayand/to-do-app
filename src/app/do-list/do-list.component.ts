import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { Response } from '@angular/http';

import { Subscription } from 'rxjs/Subscription';
import { trigger, state, style, transition, animate, group } from '@angular/animations'

import { ToDoService } from './to-do.service';
import { Todo } from './to-do.model';
import{ DataStorageService } from '../data-storage.service';
import { AuthService } from '../auth/auth.srevice';

@Component({
  selector: 'app-do-list',
  templateUrl: './do-list.component.html',
  styleUrls: ['./do-list.component.css'],
  animations: [
    trigger('list1',[
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)'
        }),
        animate(500)
      ]),
      transition('* => void', [
        animate(800, style({
          transform: 'translateY(100px)',
          opacity: 0
        }))
      ]),
    ]),
    trigger('list1',[
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)'
        }),
        animate(500)
      ]),
      transition('* => void', [
        animate(800, style({
          transform: 'translateY(100px)',
          opacity: 0
        }))
      ]),
    ]),
  ]
})

export class DoListComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef;
  
  show = false;
  chart = [];
  toDoList: Todo[];
  subscription : Subscription;
  filterToDo = '';
  calcDays = 0;
  today = '';
  daymonth = '';
  month = '';

  constructor(public toDoSerivce: ToDoService,
              public dataStorageService: DataStorageService,
              public authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.toDoSerivce.toDoListChanged
      .subscribe(
        (todoList: Todo[])=>{
          this.toDoList = todoList;
          this.refreshTodoList(todoList);
        }
      );  
      this.toDoList = this.toDoSerivce.getToDoList();
      this.refreshTodoList(this.toDoList);
    
  }

  refreshTodoList(todoList) {
    let suffix = "";
    let date = new Date(); 
    let dayOfMonth = date.getDate(); 
    let dayOfWeek = date.getDay();
    let Month = date.getMonth();

    var dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var monthArray = ["January","February","March","April,","May","June","July","August","September","October","November","December"];
    
    switch(dayOfMonth) {
        case 1: case 21: case 31: suffix = 'st'; break;
        case 2: case 22:          suffix = 'nd'; break;
        case 3: case 23:          suffix = 'rd'; break;
        default:                  suffix = 'th';
    }
    
    this.today = dayArray[dayOfWeek];
    this.daymonth = " " + dayOfMonth + suffix;
    this.month = monthArray[Month];

    let now = Date.now();
    let milisecondsInDay = (1000 * 60 * 60 * 24);

    for (let todo of todoList) {
      todo.expectedProgress = (now - (+todo.start)) / (todo.days * milisecondsInDay) 
      if (todo.expectedProgress>1) {
        todo.expectedProgress = 1;
      }
      todo.expectedProgress = Math.round(todo.expectedProgress * 100)
    }      
  }

  onDeleteToDo(index:number){
    this.toDoSerivce.deleteItem(index);
  }

  onFinishToDo(index: number){
    this.toDoSerivce.finishToDoItem(index);
  }
  
  onClickPlus(){
    this.toDoSerivce.onChangeShowStatus();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}