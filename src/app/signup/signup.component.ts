import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder,public dataService: DataService,private router:Router) { }
  signupForm=this.fb.group({
    email:['',[Validators.email,Validators.required]],
    psw:['',[Validators.required]]
  })
  signupError(e){
return (this.signupForm.get(e).touched||this.signupForm.get(e).dirty)&& this.signupForm.get(e).errors
  }

  ngOnInit(): void {
  }
  signup(){
  if(this.signupForm.valid){
    this.dataService.signUp(this.signupForm.value.email,this.signupForm.value.psw)
      }
}

}
