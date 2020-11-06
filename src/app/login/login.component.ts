import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,public dataService: DataService,private router:Router) { }
  loginForm=this.fb.group({
    email:['',[Validators.email,Validators.required]],
    psw:['',[Validators.required]]
  })
  loginError(e){
return (this.loginForm.get(e).touched||this.loginForm.get(e).dirty)&& this.loginForm.get(e).errors
  }

  ngOnInit(): void {
  }
login(){
  if(this.loginForm.valid){
    this.dataService.login(this.loginForm.value.email,this.loginForm.value.psw)
    
  }
}

}
