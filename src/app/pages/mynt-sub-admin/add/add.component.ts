import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddSubAdminComponent implements OnInit {
  public addForm: FormGroup;
  public ifSubmitted = false;
  public editData:any;
  public editForm = false;
  public emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  public permissionList =
    [
      'dashboard',
      'customer',
      'wedding enquiries',
      'service request',
      'feedback',
      'gift card',
      'professional',
      'credit manage',
      'sub admin',
      'notification',
      'setting'
    ];
  preferredCountries: CountryISO[] = [CountryISO.Greece, CountryISO.India];
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private activate: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activate.queryParams
      .subscribe(params => {
        this.editData = params.data?JSON.parse(params.data):{};
        this.editForm = params.editForm =='false'? false:true;
      });
    this.userService.setNav(this.editForm ? 'Edit Sub Admin' : 'Add Sub Admin');
    this.initForm();
    if(this.editForm){
      this.setFormData();
    }

  }
  initForm(){
    const nameRegex = '[a-zA-Z ]*';
    this.addForm = this.fb.group({
      fullName: ['',[Validators.required,Validators.pattern(nameRegex)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', Validators.required],
      permission:  this.fb.array(this.permissionList.map(x => !1)),
      status: ['', Validators.required]
    });
    this.addForm.controls['status'].setValue('ACTIVE');
  }

  setFormData(){
    this.addForm.controls['status'].setValue(this.editData.status);
    this.addForm.controls['email'].setValue(this.editData.email);
    this.addForm.controls['fullName'].setValue(this.editData.fullName);
    this.addForm.controls['phone'].setValue(this.editData.phone);
    this.addForm.controls['permission'].setValue(this.permissionList.map(
      (x, i) => this.editData.permission.indexOf(x)> -1)
    );
  }
  convertToValue(data:any) {
    let newArraySet =[];
    for(let i =0; i < data.length; i++){
      if(data[i] ==true){
        newArraySet.push(this.permissionList[i])
      }
    }
    return newArraySet
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
   * Handles form 'submit' event.
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
    param.fullName = this.addForm.value.fullName;
    param.email = this.addForm.value.email;
    param.phone = this.addForm.value.phone.number;
    param.countryCode = this.addForm.value.phone.dialCode;
    param.permission = this.convertToValue(this.addForm.value.permission);
    if(!this.editForm){
      this.userService.addSubAdmin(param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          this.router.navigate(['/sub-admin'])
        }
      })
    }else{
      this.userService.updateSubAdmin(this.editData._id, param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          this.router.navigate(['/sub-admin'])
        }
      })
    }

  }
}

