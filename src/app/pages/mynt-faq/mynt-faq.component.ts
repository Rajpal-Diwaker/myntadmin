import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mynt-faq',
  templateUrl: './mynt-faq.component.html',
  styleUrls: ['./mynt-faq.component.css']
})
export class MyntFaqComponent implements OnInit, OnDestroy  {
  public faqList : any;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private userService : UserService,
    private route : Router
  ){}
  ngOnInit(){
     this.userService.setNav('FAQ');
     this.getFaqList();
  }

  public getFaqList(){
    this.subscriptions.push(
      this.userService.getFaqList().subscribe((data)=>{
        if(data && data.status == 200){
            this.faqList = data.data;
        }
      })
    )
  }
  //Update Status
  onUpdateStatus(id:string, status:string){
    this.userService.confirmPopup({confirmButtonText:'Yes', text :'', title:'Are You Sure?'}).then(el => {
      if(el.value == true) {
        let param = {
          status: status=='ACTIVE'?'INACTIVE':'ACTIVE'
        };
        this.userService.updateFaq(id, param).subscribe((data)=>{
          if(data && data.status ==200){
            this.getFaqList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onEdit(data: any){
    this.route.navigate(['/addFaq'], {queryParams :{ editForm: true , data: JSON.stringify(data)}})
  }
  onDelete( id: string ){
    this.userService.confirmPopup().then(el => {
      if(el.value == true) {
        this.userService.deleteFaq(id).subscribe((data)=>{
          if(data && data.status ==200){
            this.getFaqList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onAddButton(){
    this.route.navigate(['/addFaq'],{queryParams :{ editForm: false}})
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
