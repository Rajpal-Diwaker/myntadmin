import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddCreditComponent implements OnInit {
  public addForm: FormGroup;
  public point: FormControl;
  public percentage: FormControl;
  public status: FormControl;
  public ifSubmitted = false;
  public editData:any;
  public editForm:boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private activate: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activate.queryParams
      .subscribe(params => {
        this.editData = JSON.parse(params.data)
        this.editForm = params.editForm;
      });
    this.userService.setNav(this.editForm ? 'Edit Credit Manage' : 'Add Credit Manage');
    this.initForm();
    if(this.editForm){
      this.setFormData();
    }

  }
  initForm(){
    this.addForm = this.fb.group({
      point: ['',[Validators.required]],
      percentage: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.addForm.controls['status'].setValue('ACTIVE');
  }
  setFormData(){
    this.addForm.controls['status'].setValue(this.editData.status);
    this.addForm.controls['point'].setValue(this.editData.point);
    this.addForm.controls['percentage'].setValue(this.editData.percentage);
  }
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
  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
   onSubmit(form: any) {
    this.ifSubmitted = true;
    if (!this.addForm.valid) {
      this.validateAllFormFields(this.addForm);
      return;
    }
    const param: any = {};
    param.status = this.addForm.value.status;
    param.point = this.addForm.value.point;
    param.percentage = this.addForm.value.percentage;
    if(!this.editForm){
      this.userService.addCreditManage(param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          this.router.navigate(['/manageClient'])
        }else{
          this.userService.error(data.message);    //show Error message
        }
      })
    }else{
      this.userService.updateCreditMange(this.editData._id, param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          this.router.navigate(['/manageClient'])
        }else{
          this.userService.error(data.message);    //show Error message
        }
      })
    }

  }
}
