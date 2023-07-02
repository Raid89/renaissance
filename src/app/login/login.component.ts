import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { loginRequestDemo, loginRequest } from '../interfaces/login';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  error: string | null = null;
  loginForm: FormGroup;
  response: string = "";
  loginSuccess!: Boolean;
  messagesError: Message[] = [];
  messagesSuccess: Message[] = [];
  success: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }


  ngOnInit() {

  }

  showError(message: string) {
    if (this.error) {
      this.error = message;
      this.messagesError = [
        { severity: 'error', summary: 'Error', detail: this.error !== null ? this.error : undefined }
      ];
      setTimeout(() => {
        const errorElement = document.querySelector('.error-message');
        if (errorElement) {
          errorElement.classList.add('fade-out');
          setTimeout(() => {
            this.messagesError = []
          }, 3000);
        }
      }, 10);
    } else {

      this.messagesSuccess = [
        { severity: 'success', summary: 'Success', detail: 'Login Successful' }
      ];

      setTimeout(() => {
        const successElement = document.querySelector('.success-message');
        if (successElement) {
          successElement.classList.add('fade-out');
          setTimeout(() => {
            this.messagesSuccess = [];
          }, 2000);
        }
      }, 10);

    }

  }



  loginUser() {
    localStorage.setItem("userName", this.loginForm.value.userName)
    //Data for demo
    const data: loginRequestDemo = {
      type: 4,
      params: {
        user: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      },

    }
    //Data for real
    /* const data: loginRequest = {
      user: this.loginForm.value.userName,
      password: this.loginForm.value.password,
    } */

    this.loading = true;
    this.error = null;

    this.loginService.loginUser(data).subscribe({
      next: (res) => {

        if (res.statusCode === 200) {
          sessionStorage.setItem('accessToken', res.body.token);
          this.loginSuccess = true;
          this.router.navigate(['/']);
        } else if (res.statusCode === 400) {
          this.error = 'The user name or password is incorrect';
          this.loginSuccess = false;
          this.showError(this.error);
        } else {
          this.error = 'User disabled';
          this.loginSuccess = false;
          this.showError(this.error);
        }
        this.messagesSuccess = [
          { severity: 'success', summary: 'Success', detail: 'Login Successful' }
        ];

      },
      error: (err) => {
        console.log(err.response);
        this.loading = false;
        this.error = err;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }


  get email() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

}
