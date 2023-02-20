import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-mynt-contact',
  templateUrl: './mynt-contact.component.html',
  styleUrls: ['./mynt-contact.component.css']
})
export class MyntContactComponent implements OnInit, OnDestroy  {
  public contactUserList : any;
  public contactUserSearchList : any;
  public contactProList : any;
  public contactProSearchList : any;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private userService : UserService,
  ){}
  ngOnInit(){
     this.userService.setNav('Contact List');
     this.getContactUserList()
     this.getContactProList();
  }

  public getContactUserList(){
    this.subscriptions.push(
      this.userService.getContactList({userType:'USER'}).subscribe((data)=>{
        if(data && data.status == 200){
            this.contactUserList = data.data;
            this.contactUserSearchList = data.data;
        }
      })
    )
  }
  public getContactProList(){
    this.subscriptions.push(
      this.userService.getContactList({userType:'PRO'}).subscribe((data)=>{
        if(data && data.status == 200){
            this.contactProList = data.data;
            this.contactProSearchList = data.data;
        }
      })
    )
  }
  public searchUser(key:any) {
    key = key.toLowerCase().trim()
    this.contactUserList = this.contactUserSearchList
      .filter(el => {
        if (
          (el.userId.fullName).toLowerCase().includes(key) ||
          (el.email).toLowerCase().includes(key)    ||
          (el.message).toLowerCase().includes(key)){
            return true
        }
    })
  }
  public searchPro(key:any) {
    key = key.toLowerCase().trim()
    this.contactProList = this.contactProSearchList
      .filter(el => {
        if (
          (el.userId.firstName).toLowerCase().includes(key) ||
          (el.userId.lastName).toLowerCase().includes(key) ||
          (el.email).toLowerCase().includes(key)    ||
          (el.message).toLowerCase().includes(key)){
            return true
        }
    })
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
