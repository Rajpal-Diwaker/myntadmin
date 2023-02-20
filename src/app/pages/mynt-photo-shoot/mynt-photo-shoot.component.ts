import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mynt-photo-shoot',
  templateUrl: './mynt-photo-shoot.component.html',
  styleUrls: ['./mynt-photo-shoot.component.css']
})
export class MyntPhotoShootComponent implements OnInit, OnDestroy  {
  public photoShootList : any;
  public photoShootSearchList : any;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private userService : UserService,
    private route : Router
  ){}
  ngOnInit(){
     this.userService.setNav('Photoshoot');
     this.getPhotoShootList();
  }

  public getPhotoShootList(){
    this.subscriptions.push(
      this.userService.getPhotoShootList().subscribe((data)=>{
        if(data && data.status == 200){
            this.photoShootList = data.data;
            this.photoShootSearchList = data.data;
        }
      })
    )
  }
  public search(key:any) {
    key = key.toLowerCase().trim()
    this.photoShootList = this.photoShootSearchList
      .filter(el => {
        if (
          (el.userId.fullName).toLowerCase().includes(key) ||
          (el.userId.phone).toLowerCase().includes(key)    ||
          (el.email).toLowerCase().includes(key)){
            return true
        }
    })
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
