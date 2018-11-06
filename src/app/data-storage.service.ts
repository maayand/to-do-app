import { Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { Todo } from './do-list/to-do.model';
import { AuthService } from './auth/auth.srevice';

@Injectable()

export class DataStorageService {
    constructor(private http: Http,
                private authService: AuthService){}

    sotreToDos(toDoList){
       const token = this.authService.getToken();
       const uid = this.authService.getUserId();
       return this.http.put('https://to-do-21db6.firebaseio.com/'+uid+'/dotos.json?auth=' + token, toDoList)
          .subscribe(
                (response: Response)=>{
                }
            )
    }

    getToDos(setTodos: Function){
        const token = this.authService.getToken();
        const uid = this.authService.getUserId();
        return this.http.get('https://to-do-21db6.firebaseio.com/'+uid+'/dotos.json?auth=' + token)
            .subscribe(
                (response: Response)=>{
                    let todos: Todo[] = response.json();
                    if(todos === null) {
                        todos = [];
                    }                    
                    setTodos(todos);
                }
            )
    }
}