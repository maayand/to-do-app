import { Todo } from './to-do.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { AuthService } from '../auth/auth.srevice';

@Injectable()

export class ToDoService{
    show = false;
    toDoListChanged = new Subject<Todo[]>();

    constructor( private dataStorageService: DataStorageService,
                 private authService: AuthService) {
        this.calculateStats();
        this.orderToDos();
     }

    createSampleTodo(title, daysDiff, daysTarget, finishDay) {
        return new Todo(title, this.getDateDiff(daysDiff).toString(), daysTarget, finishDay.toString());
    } 

    createSampleTodos(){
        return [
            this.createSampleTodo('', -1, 7, ''),
            this.createSampleTodo('Mark', -2, 7, ''),
            this.createSampleTodo('Add a task of your own', -4, 7, ''),
            this.createSampleTodo('Register to manage your own tasks', -4, 7, ''),
            this.createSampleTodo('Check out the statistics', -8, 7, ''),
            this.createSampleTodo('Search a task', -9, 7 , ''),
            this.createSampleTodo('Add task', -11, 7, ''),
            this.createSampleTodo('Mark this task as done', -13, 7, ''),
            this.createSampleTodo('Delete this task', -15, 7, ''),
            this.createSampleTodo('Be ready to explore', -17, 7, this.getDateDiff(-3)),
            this.createSampleTodo('Get into todo website', -19, 7, this.getDateDiff(-1)),
        ];
    }

    toDoList: Todo[] = this.createSampleTodos();
 
    totel:number = this.toDoList.length;
    remaining: number = this.toDoList.length;
    done: number = 0;

    calculateStats() {
        this.totel = 0;
        this.remaining = 0;
        this.done = 0;
        for (let todo of this.toDoList) {
            if(todo.finish) {
                this.done++;
            }
            else {
                this.remaining++;
            }
            this.totel++;
        }
    }
    reset() {
        this.setToDos(this.createSampleTodos());       
    }
    getDateDiff(dayDiff){
        let d = new Date();
        let milliseconds = d.setDate(d.getDate() + dayDiff);
        return milliseconds;    
    }
    getToDoList(){
        if(this.authService.isAuthenticated()) {
            this.dataStorageService.getToDos((todos) => {this.setToDos(todos);});
            return [];
        }
        return this.toDoList.slice();
    }

    setToDos(todos: Todo[]){
        this.toDoList = todos;
        this.calculateStats();
        this.orderToDos();
        this.toDoListChanged.next(this.toDoList.slice());
    }

    addToDo(todo: Todo){
        this.toDoList.unshift(todo);
        this.calculateStats();
        if(this.authService.isAuthenticated()) {
            this.dataStorageService.sotreToDos(this.toDoList);
        }
        return this.toDoListChanged.next(this.toDoList.slice());
    }

    onChangeShowStatus(){
        this.show = !this.show;
    }
    deleteItem(index:number){
        let deletedTodo = this.toDoList.splice(index,1);
        this.calculateStats();
        if(this.authService.isAuthenticated()) {
            this.dataStorageService.sotreToDos(this.toDoList);
        }
        return this.toDoListChanged.next(this.toDoList.slice());
    }

    finishToDoItem(index: number){
        if(this.toDoList[index].finish) return;
        this.toDoList[index].finish = Date.now().toString();
        let finishToDo = this.toDoList.splice(index,1);
        this.toDoList.push(finishToDo[0]);
        this.calculateStats();
        if(this.authService.isAuthenticated()) {
            this.dataStorageService.sotreToDos(this.toDoList);
        }
        return this.toDoListChanged.next(this.toDoList.slice());
    }

    orderToDos(){
        for(let todo of this.toDoList){
            if(todo.finish){
                let index = this.toDoList.indexOf(todo);
                let finishItem = this.toDoList.splice(index,1);
                this.toDoList.push(finishItem[0]);
            }
        }
    }    
}