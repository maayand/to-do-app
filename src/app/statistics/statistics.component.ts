import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { nextTick } from 'process';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs/Subscription';

import { ToDoService } from '../do-list/to-do.service';
import { Todo } from '../do-list/to-do.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit, OnDestroy{
  @ViewChild('canvas') canvas: ElementRef; 
  chart = [];
  toDoList: Todo[]; 
  subscription: Subscription;

  constructor(public toDoService: ToDoService) { }

  ngOnInit() {
    this.toDoList = this.addDaysPassed(this.toDoService.getToDoList());
    this.subscription = this.toDoService.toDoListChanged
      .subscribe(
        (todoList: Todo[])=>{
          this.toDoList = this.addDaysPassed(todoList);
        }
      );  
  
    nextTick(() => {
      this.toDoList = this.addDaysPassed(this.toDoList);
    }); 
  }

  addDaysPassed(todoList) {
    let dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let date = new Date(); 
    let dayOfWeek = date.getDay();
    let startOfDayArray = dayArray.slice(dayOfWeek);
    let endOfDayArray = dayArray.slice(0, dayOfWeek);
    
    startOfDayArray.push(...endOfDayArray);
    dayArray = startOfDayArray;
    
    let lastDay = dayArray.shift();
    dayArray.push(lastDay);
    
    let namesArray = [];
    let totalArray = [];
    let remainingArray = [];
    let doneArray = [];
    for(var dayIndex=0; dayIndex<dayArray.length; dayIndex++) {
      let day = new Date();
      let dayDiff = 6 - dayIndex;
      
      // call date function from service and pass dayDiff
      let currentDayMS = this.toDoService.getDateDiff(-1*dayDiff);
      let currentDay = new Date( currentDayMS);

      // get current date of month
      let currentDayDate = currentDay.getDate();

      // push to graph name array
      namesArray.push(currentDayDate);

      let totalCurrentDay = 0;
      let remainigCurrentDay = 0;
      let doneCurrentDay = 0;
      for(let todo of todoList) {
        if(+todo.start < currentDayMS ) {
          totalCurrentDay++;
          if(todo.finish!=='' && +todo.finish<= currentDayMS) {
            doneCurrentDay++;
          }
          else {
            remainigCurrentDay++;
          }
        }
      }

      totalArray.push(totalCurrentDay);
      remainingArray.push(remainigCurrentDay);
      doneArray.push(doneCurrentDay);
    }

    let todoProgress = [
                        this.toDoService.totel,
                        this.toDoService.remaining,
                        this.toDoService.done
                      ]
    if(!this.canvas || !todoList)
    {
      return todoList;
    }
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      legend: {
        horizontalAlign: "center",
        verticalAlign: "top", 
        fontSize: 15
      },
      data: {
        showInLegend: true,
        labels: namesArray,
        datasets: [
          { 
            data: totalArray,
            borderColor: "#3cba9f",
            fill: false,
            label: 'Total', 
          },
          { 
            data: remainingArray,
            borderColor: "#f44141",
            fill: false,
            label: 'Remaining', 
          },
          { 
            data: doneArray,
            borderColor: "#4286f4",
            fill: false,
            label: 'Done',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
    return todoList;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
