import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mynt-sub-admin',
  templateUrl: './mynt-sub-admin.component.html',
  styleUrls: ['./mynt-sub-admin.component.css']
})
export class MyntSubAdminComponent implements OnInit, OnDestroy {
  public subAdminList : any;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private userService : UserService,
    private route : Router
  ){}

  ngOnInit(): void {
    this.userService.setNav('Sub Admin');
    this.getsubAdminList();
  }
  public getsubAdminList(){
    this.subscriptions.push(
      this.userService.getsubAdminList().subscribe((data)=>{
        if(data && data.status == 200){
            this.subAdminList = data.data;
        }
      })
    )
  }
  onUpdateStatus(id:string, status:string){
    this.userService.confirmPopup({confirmButtonText:'Yes', text :'', title:'Are You Sure?'}).then(el => {
      if(el.value == true) {
        let param = {
          status: status=='ACTIVE'?'INACTIVE':'ACTIVE'
        };
        this.userService.updateSubAdmin(id, param).subscribe((data)=>{
          if(data && data.status ==200){
            this.getsubAdminList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onEdit(data: any){
    this.route.navigate(['/add-sub-admin'], {queryParams :{ editForm: true , data: JSON.stringify(data)}})
  }
  onDelete( id: string ){
    this.userService.confirmPopup().then(el => {
      if(el.value == true) {
        this.userService.deleteSubAdmin(id).subscribe((data)=>{
          if(data && data.status ==200){
            this.getsubAdminList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onAddButton(){
    this.route.navigate(['/add-sub-admin'],{queryParams :{ editForm: false}})
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
