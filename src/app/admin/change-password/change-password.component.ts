import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { UserService } from 'app/_services/user.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: FormGroup;
  public submitted = false;
  newPSW: FormControl;
  confirmPSW: FormControl;
  resetCode : any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private activate: ActivatedRoute
  ) { }

  ngOnInit() {
    this.resetCode =  this.activate.snapshot.paramMap.get('id');
    this.initChangePswForm();
    if (this.userService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  initChangePswForm() {
    this.changePassword = this.fb.group(
      {
        newPSW: ['', Validators.required],
        confirmPSW: ['', Validators.required]
      },
      { validator: this.matchingPasswords('newPSW', 'confirmPSW') }
    );
  }

  /**
   * Handles form 'matchingPasswords' event. for conformation password.
   * @param passwordKey for password value
   * @param passwordConfirmationKey for Repassword value
   */
   matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({ mismatchedPasswords: true });
      }
    };
  }


  get f() { return this.changePassword.controls; }


  /**
 * Handles form 'submit' event. Calls userService forget password function if form is valid.
 *
 * @param event form event
 * @param form entire form value
 */
   onSubmit(form: any) {
    this.submitted = true;
    if (this.changePassword.invalid) {
      return;
    }
    const para: any = {};
    para.oldpsw = this.changePassword.value.oldPSW;
    para.newpsw = this.changePassword.value.newPSW;
    para.resetPasswordCode = this.resetCode;
    this.userService.changePassword(para).subscribe( data=> {
      if(data && data.status ==200){
        this.userService.success(data.message);   //show succees message
        this.router.navigateByUrl('/login');
      }else{
        this.userService.error(data.message);    //show Error message
      }
    },
    err => {
      console.log(err);
      this.userService.error(err.message);
    });
  }
}
