import { ApiService } from './../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http : HttpClient , private api : ApiService) { }

  ngOnInit(): void {
  }
  hide = true;
  
  form = new FormGroup({
    username : new FormControl('', [
      Validators.required ,
      Validators.minLength(3),
      
    ]),
    phoneNumber : new FormControl('', [
      Validators.required ,
      Validators.minLength(3),
      
    ]),
    email : new FormControl('', [
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
  get phoneNumber(){
    return this.form.get('phoneNumber');
  }
  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }
  
  signUp(){
    this.api.postUser(this.form.value).subscribe
    (res =>{
      alert("Singup successfull");
      this.form.reset();
    },
    err =>{
      alert("Something went wrong");
    })
  }

}
