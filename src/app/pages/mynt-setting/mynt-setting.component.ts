import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
declare var $:any;
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
@Component({
  selector: 'app-mynt-setting',
  templateUrl: './mynt-setting.component.html',
  styleUrls: ['./mynt-setting.component.css']
})
export class MyntSettingComponent implements OnInit, OnDestroy  {
  public settingList : any;
  public cmsPageList : any;
  private subscriptions: Array<Subscription> = [];
  public editSettingForm: FormGroup;
  public editSettingFormSubmitted = false;
  public pageFormSubmitted = false;
  public pageForm: FormGroup;
  public editPageTitle:string ='Add Page';
  public editPageForm:boolean =false;
  public text: FormControl;
  public editorConfig : any = {};
  constructor(
    private userService : UserService,
    private route : Router,
    private fb: FormBuilder,
  ){}
  ngOnInit(){
      this.userService.setNav('Settings');
      this.getSettingList();
      this.getCmsPageList();
      this.editSettingForm =this.fb.group({
        input: ['',[Validators.required]],
        id: ['',[Validators.required]],
        field: ['',[Validators.required]],
      });
      this.text = new FormControl('', [Validators.required]);
      this.pageForm =this.fb.group({
        title: ['',[Validators.required]],
        title2: ['',[Validators.required]],
        id: ['',[Validators.required]],
        text: this.text,
        text2: new FormControl('', [Validators.required]),
        userType: ['',[Validators.required]]
      });
      this.editorConfig.contentsCss = [
        'http://fonts.googleapis.com/css?family=Roboto+Condensed:800,700'
      ];
  }
  openEditModel(ele:any, feild: any){
    $("#setting-edit-popup").modal("show")
    $("#setting-edit-popup").addClass('show')
    this.editSettingFormSubmitted =  false;
    let input:any;
    if(feild =='sender') input =ele.referAndEarn.sender;
    if(feild =='receiver') input =ele.referAndEarn.receiver;
    if(feild =='booking') input =ele.bookingAmount;
    this.editSettingForm.patchValue({
      id : ele._id,
      input : input,
      field:feild
    })
  }
  onCloseModal(){
    $("#setting-edit-popup").removeClass('show')
  }
  onClosePageModal(){
    $("#cms-edit-popup").removeClass('show')
  }
  public getCmsPageList(){
    this.subscriptions.push(
      this.userService.getCmsPageList().subscribe((data)=>{
        if(data && data.status == 200){
            this.cmsPageList = data.data;
        }
      })
    )
  }
  public getSettingList(){
    this.subscriptions.push(
      this.userService.getSettingList().subscribe((data)=>{
        if(data && data.status == 200){
            this.settingList = data.data;
        }
      })
    )
  }
  editSettingFormSubmit(value:any){
    this.editSettingFormSubmitted =  true;
    if(this.editSettingForm.invalid) return;
    const param: any = {};
    if(value.field =='sender') param.sender = value.input;
    if(value.field =='receiver')  param.receiver = value.input;
    if(value.field =='booking')  param.bookingAmount = value.input;
    this.userService.updateSetting(value.id, param).subscribe((data)=>{
      if(data && data.status ==200){
        this.userService.success(data.message);    //show succees message
        $("#setting-edit-popup").removeClass('show')
        $("#setting-edit-popup").modal("hide")
        this.getSettingList();
      }else{
        this.userService.error(data.message);    //show Error message
      }
    })
  }
  onEdit(ele: any){
    this.editPageTitle = 'Edit Page';
    this.editPageForm = true;
    $("#cms-edit-popup").modal("show")
    $("#cms-edit-popup").addClass('show')
    this.pageFormSubmitted =  false;
    this.pageForm.patchValue({
      id : ele._id,
      text: ele.text,
      title: ele.title,
      text2: ele.text2,
      title2: ele.title2,
      userType: ele.userType
    })
  }
  onUpdateStatus(id:string, status:string){
    this.userService.confirmPopup({confirmButtonText:'Yes', text :'', title:'Are You Sure?'}).then(el => {
      if(el.value == true) {
        let param = {
          status: status=='ACTIVE'?'INACTIVE':'ACTIVE'
        };
        this.userService.updateCmsPage(id, param).subscribe((data)=>{
          if(data && data.status ==200){
            this.getCmsPageList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onAddButton(){
    this.editPageTitle = 'Add Page';
    this.editPageForm = false;
    $("#cms-edit-popup").modal("show")
    $("#cms-edit-popup").addClass('show')
    this.pageFormSubmitted =  false;
    this.pageForm.patchValue({
      id : 'some value'
    })
  }
  /**
 * Handles form 'submit' event.
 *
 * @param event form event
 * @param form entire form value
 */
  onSubmit(form: any) {
    this.pageFormSubmitted = true;
    if (!this.pageForm.valid) return;
    const param: any = {};
    param.title = form.title;
    param.text = form.text;
    param.title2 = form.title2;
    param.text2 = form.text2;
    param.userType = form.userType;
    if(!this.editPageForm){
      this.userService.addCmsPage(param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);   //show succees message
          $("#cms-edit-popup").removeClass('show')
          $("#cms-edit-popup").modal("hide")
          this.getCmsPageList();
        }else{
          this.userService.error(data.message);    //show Error message
        }
      })
    }else{
      this.userService.updateCmsPage(form.id, param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          $("#cms-edit-popup").removeClass('show')
          $("#cms-edit-popup").modal("hide")
          this.getCmsPageList();
        }else{
          this.userService.error(data.message);    //show Error message
        }
      })
    }

  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
