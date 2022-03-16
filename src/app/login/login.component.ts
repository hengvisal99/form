import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  hide = true;

  constructor(private api:ApiService){}

  form = new FormGroup({
    username : new FormControl('', [
      Validators.required ,
      Validators.minLength(3),
      
    ]),
    password: new FormControl('',
    [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
  }
  
  login(){
    this.api.getUser().subscribe({
      next:(res) => {

        const user = res.find((a:any) =>{
          return a.username === this.form.value.username && a.password === this.form.value.password
        });
        console.log(res);
        if(user){
          alert("login Sucess");
          this.form.reset();
        
        }
        else {
          alert ("User not found")
        }
      },
     
    })
  } 
  }


