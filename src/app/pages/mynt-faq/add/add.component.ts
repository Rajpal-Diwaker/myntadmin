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
export class AddFaqComponent implements OnInit {
  public addForm: FormGroup;
  public question: FormControl;
  public answer: FormControl;
  public status: FormControl;
  public userType: FormControl;
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
        this.editData = params?.data?JSON.parse(params.data):{};
        this.editForm = params.editForm =='false'? false:true;
      });
    this.userService.setNav(this.editForm ? 'Edit FAQ' : 'Add FAQ');
    this.initForm();
    if(this.editForm){
      this.setFormData();
    }

  }
  initForm(){
    this.addForm = this.fb.group({
      question: ['',[Validators.required]],
      answer: ['', Validators.required],
      question2: ['',[Validators.required]],
      answer2: ['', Validators.required],
      status: ['', Validators.required],
      userType: ['', Validators.required]
    });
    this.addForm.controls['status'].setValue('ACTIVE');
    this.addForm.controls['userType'].setValue('USER');
  }
  setFormData(){
    this.addForm.controls['status'].setValue(this.editData.status);
    this.addForm.controls['question'].setValue(this.editData.question);
    this.addForm.controls['answer'].setValue(this.editData.answer);
    this.addForm.controls['question2'].setValue(this.editData.question2);
    this.addForm.controls['answer2'].setValue(this.editData.answer2);
    this.addForm.controls['userType'].setValue(this.editData.userType);
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
    param.question = this.addForm.value.question;
    param.answer = this.addForm.value.answer;
    param.question2 = this.addForm.value.question2;
    param.answer2 = this.addForm.value.answer2;
    param.userType = this.addForm.value.userType;
    if(!this.editForm){
      this.userService.addFaq(param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          this.router.navigate(['/faq'])
        }else{
          this.userService.error(data.message);    //show Error message
        }
      })
    }else{
      this.userService.updateFaq(this.editData._id, param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          this.router.navigate(['/faq'])
        }else{
          this.userService.error(data.message);    //show Error message
        }
      })
    }

  }
}
