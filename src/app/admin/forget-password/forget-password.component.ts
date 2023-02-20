import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public email: FormControl;
  public emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public ifSubmitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initForm();
    if (this.userService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  get f() { return this.forgotPasswordForm.controls; }


  /**
 * Handles form 'submit' event. Calls userService forget password function if form is valid.
 *
 * @param event form event
 * @param form entire form value
 */
  onSubmits(event: Event, form: any) {
    this.ifSubmitted = true;
    if (!this.forgotPasswordForm.valid) {
      this.validateAllFormFields(this.forgotPasswordForm);
      return;
    }
    const param: any = {};
    param.email = this.forgotPasswordForm.value.email;
    console.log(param)
    this.userService.forgetPassword(param).subscribe( data=> {
      if(data && data.status ==200){
        this.userService.success(data.message);   //show succees message
      }else{
        this.userService.error(data.message);    //show Error message
      }
    },
    err => {
      console.log(err);
      this.userService.error(err.message);
    });
  }
  // validation for forget password
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
