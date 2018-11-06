import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate, group } from '@angular/animations'

import { Todo } from '../to-do.model';
import { ToDoService } from '../to-do.service';
import { nextTick } from 'process';

@Component({
  selector: 'app-do-edit',
  templateUrl: './do-edit.component.html',
  styleUrls: ['./do-edit.component.css'],
  animations: [
    trigger('show1',[
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
export class DoEditComponent implements OnInit {
  @ViewChild('f') toDoListForm: NgForm;

  constructor( public toDoService: ToDoService) { }

  ngOnInit() {
    nextTick(() => {
      this.setFormDefaults();    
    });
  }

  onAddItem(form){
    const value = this.toDoListForm.value;
    let today: number = Date.now();
    const newTodo = new Todo(value.doItem, today.toString(), value.days,'');
    this.toDoService.addToDo(newTodo);
    this.toDoListForm.reset();
    this.setFormDefaults();
    this.toDoService.onChangeShowStatus();
  }

  onClickX(){
    this.toDoService.onChangeShowStatus();
  }

  onClear(){
    this.toDoListForm.reset();
    this.setFormDefaults();
  }

  setFormDefaults() {
    this.toDoListForm.setValue({
      doItem: '',
      days: '',    
    });
  }
}
