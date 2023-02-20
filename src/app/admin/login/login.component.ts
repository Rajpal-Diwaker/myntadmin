import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loader: boolean = false;
  loginFrmGrp: FormGroup;
  submitted: boolean = false;
  adminId = localStorage.getItem('x-id');

  constructor(private router: Router, private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.loginFrm();

    if (this.userService.isAuthenticated()) {
      this.goto('/dashboard');

    }
  }

  loginFrm() {
    this.loginFrmGrp = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  get f() { return this.loginFrmGrp.controls; }

  login() {
    if (this.loginFrmGrp.invalid) {
      // this.loginFrmGrp.markAsUntouched()
      this.submitted = true;
      // this.userService.error(app_strings.INVALID_FORM)
      return;
    }
    this.loader = true;
    const ob = {
      email: this.f.email.value,
      password: this.f.password.value
    };
    this.userService.login(ob)
      .pipe(take(1))
      .subscribe(res => {
        if (res.status === 200 && res.data.token) {
          this.userService.setToken(res.data.token);
          localStorage.setItem('x-id', JSON.stringify(res.data));
          this.loader = false;
          this.goto('/dashboard');
        } else {
          this.loader = false;
          this.userService.error(res.message);
        }
      }, err => {
        debugger
        console.log(err);
        this.loader = false;
        this.userService.error(err.message);
      });
  }
  goto(uri) {
    if (!uri) { return; }
    this.router.navigateByUrl(uri);
  }

}
