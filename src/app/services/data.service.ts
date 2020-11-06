import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData;
  out;
token="eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxOTI5ZmY0NWM2MDllYzRjNDhlYmVmMGZiMTM5MmMzOTEzMmQ5YTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FpbmEtcGxheS0zODRmMiIsImF1ZCI6InNhaW5hLXBsYXktMzg0ZjIiLCJhdXRoX3RpbWUiOjE2MDQ1ODA2OTIsInVzZXJfaWQiOiJCUnJuT2tUYUhLUHZFaFdBakJSMWNhclNBRHIxIiwic3ViIjoiQlJybk9rVGFIS1B2RWhXQWpCUjFjYXJTQURyMSIsImlhdCI6MTYwNDU4MDY5MiwiZXhwIjoxNjA0NTg0MjkyLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.ZUbr6IY5GcrykUOT7wbIKRxJ0JzoUDwe-wNG9pjiKtPFbtpPZryWBPjRxnDdu3XzrCpqhcLvknlFz7lz71deXUJX90Yw1d25DncefpwC7YY2FbpofMQwFAfMZz329x6J2n9x3FZe4iN_ecOAP9BRq_Q5LowzJa5SajVPgl_86BTnaeqD6WgqhG8ITeHB_a-Sw656FzAw-tGTxM1vG9_FXgjTyTS__ItuR2eKmRFeZ-vh6U61oSCeQ2dOBZCElDNSXUPRRvs6T3LNO9S31sexKcM4QhH8-d5TNJJuzyaVVvAOgQ-3dNi4RMcCko5fwkuXFzzM8mvr7vAnyOykIVme7Q"
  constructor(private http:HttpClient,public afAuth: AngularFireAuth,
    public router: Router) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
   }
  getOptions(){
    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer '+this.token);
    return {
      headers
    }
  }
  getBanner() {  
       return this.http.get('https://api-dev.sainaplay.info/banners',this.getOptions()); 
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
         console.log(userLogin);
        // const out=userLogin.user.getIdTokenResult()
        const out=userLogin.user.getIdToken()
  
        console.log(out)
        this.router.navigateByUrl('');
      }).catch(err => {
        window.alert(err);
      })
    }
    signOut() {
      return this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('login');
      })
    }
}
