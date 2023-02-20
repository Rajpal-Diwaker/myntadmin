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
  selector: 'app-update-tutorial-help',
  templateUrl: './update.component.html'
})
export class UpdateTutorialHelpComponent implements OnInit {
  public addForm: FormGroup;
  public status: FormControl;
  public userType: FormControl;
  public ifSubmitted = false;
  public isFileSelected = false;
  public editData:any;
  public videoLink:any;
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
    this.userService.setNav(this.editForm ? 'Update Tutorial Help' : 'Add Tutorial Help');
    this.initForm();
    if(this.editForm){
      this.setFormData();
    }

  }
  initForm(){
    this.addForm = this.fb.group({
      status: ['', Validators.required],
      userType: ['', Validators.required]
    });
    this.addForm.controls['status'].setValue('ACTIVE');
    this.addForm.controls['userType'].setValue('USER');
  }
  setFormData(){
    this.addForm.controls['status'].setValue(this.editData.status);
    this.addForm.controls['userType'].setValue(this.editData.userType);
  }

  changeFile(event:any){
    this.videoLink = event.target.files[0];
    this.isFileSelected = false;
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
    if(!this.editForm){
      if(!this.videoLink){
        this.isFileSelected = true;
        return false;
      }
    }
    if (!this.addForm.valid) {
      this.validateAllFormFields(this.addForm);
      return;
    }
    let datatosubmit = new FormData()
    datatosubmit.append('status',this.addForm.value.status)
    datatosubmit.append('userType',this.addForm.value.userType)
    if(this.videoLink){
      datatosubmit.append('file',this.videoLink)
    }
    if(!this.editForm){
      this.userService.addTutorialHelp(datatosubmit).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          this.router.navigate(['/tutorialHelp'])
        }else{
          this.userService.error(data.message);    //show Error message
        }
      })
    }else{
      this.userService.updateTutorialHelp(this.editData._id, datatosubmit).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          this.router.navigate(['/tutorialHelp'])
        }else{
          this.userService.error(data.message);    //show Error message
        }
      })
    }
  }
}
