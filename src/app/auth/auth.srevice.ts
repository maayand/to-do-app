import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService{
    token: string;

    constructor( private router: Router){}

    signupUser(email:string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(
            response =>{
                this.router.navigate(['list']);
                firebase.auth().currentUser.getIdToken()
                 .then(
                     (token: string)=> this.token = token
                 )
            } 
         )
        .catch(
            error => console.log(error)
        )
    }

    signInUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(
               response =>{
                   this.router.navigate(['list']);
                   firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string)=> this.token = token
                    )
               } 
            )
            .catch(
                error=> console.log(error)
            );
    }
    getUserId(){
        let uid = firebase.auth().currentUser.uid;
        return uid;
    }
    getToken(){
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string)=> this.token = token
            );
        return this.token;
    }
    logout(){
        firebase.auth().signOut();
        this.token = null;
    }
    
    isAuthenticated(){
        return this.token != null;
    }
}