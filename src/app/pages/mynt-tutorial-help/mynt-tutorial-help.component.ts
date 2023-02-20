import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mynt-tutorial-help',
  templateUrl: './mynt-tutorial-help.component.html',
  styleUrls: ['./mynt-tutorial-help.component.css']
})
export class MyntTutorialHelpComponent implements OnInit, OnDestroy  {
  public tutorialHelpList : any;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private userService : UserService,
    private route : Router
  ){}
  ngOnInit(){
     this.userService.setNav('Tutorial Help Video');
     this.getTutorialHelpList();
  }

  public getTutorialHelpList(){
    this.subscriptions.push(
      this.userService.getTutorialHelpList().subscribe((data)=>{
        if(data && data.status == 200){
            this.tutorialHelpList = data.data;
        }
      })
    )
  }
  //Update Status
  onUpdateStatus(id:string, status:string){
    this.userService.confirmPopup({confirmButtonText:'Yes', text :'', title:'Are You Sure?'}).then(el => {
      if(el.value == true) {
        let datatosubmit = new FormData()
        datatosubmit.append('status',status=='ACTIVE'?'INACTIVE':'ACTIVE')
        this.userService.updateTutorialHelp(id, datatosubmit).subscribe((data)=>{
          if(data && data.status ==200){
            this.getTutorialHelpList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onEdit(data: any){
    this.route.navigate(['/updateTutorialHelp'], {queryParams :{ editForm: true , data: JSON.stringify(data)}})
  }
  onDelete( id: string ){
    this.userService.confirmPopup().then(el => {
      if(el.value == true) {
        this.userService.deleteTutorialHelp(id).subscribe((data)=>{
          if(data && data.status ==200){
            this.getTutorialHelpList(); //update list
            this.userService.success(data.message);    //show succees message
          }else{
            this.userService.error(data.message);    //show Error message
          }
        })
      }
    })
  }
  onAddButton(){
    this.route.navigate(['/updateTutorialHelp'],{queryParams :{ editForm: false}})
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
