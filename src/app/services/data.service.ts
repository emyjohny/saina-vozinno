import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData;
  token;
  constructor(private http:HttpClient,public afAuth: AngularFireAuth,
    public router: Router) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
        
        } else {
          localStorage.setItem('user', null);
         
        }
      })
     
       
     
   }
   getToken(){
    this.token= JSON.parse(localStorage.getItem('token'));
   }
  getOptions(){
    console.log("token in options "+this.token)
    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer '+this.token);
    return {
      headers
    }
  }
  
  getBanner() {  
   this.getToken()
  return this.http.get('https://api-dev.sainaplay.info/banners',this.getOptions()); 
  }
  getHomeVideos()
{
  this.getToken()
  return this.http.get("https://api-dev.sainaplay.info/homevideos",this.getOptions())
}

getDetails(id){
  this.getToken()
  return this.http.get("https://api-dev.sainaplay.info/videos?videoId="+id,this.getOptions())
}
  
    signUp(email, password) {
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userSignup => {
         console.log(userSignup);
         this.router.navigateByUrl('login');
      })
    }
  
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user != null) ? true : false;
    }
    login (email, password) {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userLogin => {
        //  console.log(userLogin);
        // const out=userLogin.user.getIdTokenResult()
        const out = userLogin.user.getIdToken(true).then(tokenValue => {
          localStorage.setItem('token', JSON.stringify(tokenValue));
         
        // alert("token in login "+ this.token)
        }).catch(err => {
          window.alert(err)
        })
        this.router.navigateByUrl("home")
       }).catch(err => {
         window.alert(err);
       })
      
    }
    signOut() {
      return this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('');
      })
    }
}
