import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mynt-manage-credit',
  templateUrl: './mynt-manage-credit.component.html',
  styleUrls: ['./mynt-manage-credit.component.css']
})
export class MyntManageCreditComponent implements OnInit, OnDestroy {
  public creditList : any;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private userService : UserService,
    private route : Router
  ){}
  ngOnInit(){
     this.userService.setNav('Credit Manage');
     this.getCreditList();
  }
  //getCreditList
  public getCreditList(){
    this.subscriptions.push(
      this.userService.getCreditList().subscribe((data)=>{
        if(data && data.status == 200){
            this.creditList = data.data;
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
        this.userService.updateCreditMange(id, param).subscribe((data)=>{
          if(data && data.status ==200){
            this.getCreditList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onEdit(data: any){
    this.route.navigate(['/addCredit'], {queryParams :{ editForm: true , data: JSON.stringify(data)}})
  }
  onDelete( id: string ){
    this.userService.confirmPopup().then(el => {
      if(el.value == true) {
        this.userService.deleteCreditMange(id).subscribe((data)=>{
          if(data && data.status ==200){
            this.getCreditList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onAddButton(){
    this.route.navigate(['/addCredit'],{queryParams :{ editForm: false}})
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
