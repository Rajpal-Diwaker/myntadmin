import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
declare var $:any;
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
@Component({
  selector: 'app-mynt-gift-card',
  templateUrl: './mynt-gift-card.component.html',
  styleUrls: ['./mynt-gift-card.component.css']
})
export class MyntGiftCardComponent implements OnInit, OnDestroy  {
  public giftCardList : any;
  private subscriptions: Array<Subscription> = [];
  public pageFormSubmitted = false;
  public pageForm: FormGroup;
  public editPageTitle:string ='Add Gift Card';
  public editPageForm:boolean =false;
  constructor(
    private userService : UserService,
    private fb: FormBuilder,
  ){}
  ngOnInit(){
      this.userService.setNav('Gift Card');
      this.getGiftCardList();
      this.pageForm =this.fb.group({
        price: ['',[Validators.required]],
        id: ['',[Validators.required]],
        name: ['',[Validators.required]],
        name2: ['',[Validators.required]],
      });
  }
  onClosePageModal(){
    $("#gift-edit-popup").removeClass('show')
  }
  public getGiftCardList(){
    this.subscriptions.push(
      this.userService.getGiftCardList().subscribe((data)=>{
        if(data && data.status == 200){
            this.giftCardList = data.data;
        }
      })
    )
  }
  onEdit(ele: any){
    this.editPageTitle = 'Edit Gift Card';
    this.editPageForm = true;
    this.pageForm.reset()
    $("#gift-edit-popup").modal("show")
    $("#gift-edit-popup").addClass('show')
    this.pageFormSubmitted =  false;
    this.pageForm.patchValue({
      id : ele._id,
      price: ele.price,
      name: ele.name,
      name2 : ele.name2
    })
  }
  onUpdateStatus(id:string, status:string){
    this.userService.confirmPopup({confirmButtonText:'Yes', text :'', title:'Are You Sure?'}).then(el => {
      if(el.value == true) {
        let param = {
          status: status=='ACTIVE'?'INACTIVE':'ACTIVE'
        };
        this.userService.updateGiftCard(id, param).subscribe((data)=>{
          if(data && data.status ==200){
            this.getGiftCardList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onAddButton(){
    this.pageForm.reset()
    this.editPageTitle = 'Add Gift Card';
    this.editPageForm = false;
    $("#gift-edit-popup").modal("show")
    $("#gift-edit-popup").addClass('show')
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
    param.name = form.name;
    param.name2 = form.name2;
    param.price = form.price;
    if(!this.editPageForm){
      this.userService.addGiftCard(param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);   //show succees message
          $("#gift-edit-popup").removeClass('show')
          $("#gift-edit-popup").modal("hide")
          this.getGiftCardList();
        }else{
          this.userService.error(data.message);    //show Error message
        }
      })
    }else{
      this.userService.updateGiftCard(form.id, param).subscribe((data)=>{
        if(data && data.status ==200){
          this.userService.success(data.message);    //show succees message
          $("#gift-edit-popup").removeClass('show')
          $("#gift-edit-popup").modal("hide")
          this.getGiftCardList();
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
