import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
declare var $:any;
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { rejects } from 'assert';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';

@Component({
  selector: 'app-chat-card',
  templateUrl: './mynt-chat.component.html',
  styleUrls: ['./mynt-chat.component.css']
})
export class MyntChatComponent implements OnInit, AfterViewInit  {
  sendForm        : FormGroup;
  public userList :  any;
  public chatData : any = [];
  public senderId : string;
  public receiverId : string;
  public isSenderInitEmited: Boolean =  false;
  public currentActiveUser: string;
  constructor(
    private userService : UserService,
    private fb: FormBuilder,
    private socket: Socket
  ){}
  ngOnInit(){
      this.sendForm = this.fb.group({
        text: ['', [Validators.required]]
      })
      const adminData = JSON.parse(localStorage.getItem('admin'));
      // this.senderId   = adminData._id;
      this.senderId   = 'admin';
      console.log(this.senderId);
      this.userService.setNav('Mynt Support Chat');
      this.getChatUserList();
  }

  public getChatUserList() {
    this.userService.getChatUserList({userType:'USER'}).subscribe(res => {
      this.userList = res.data;
    })
  }
  public loadChatBox(user: any){
    this.chatData = []; //reset  chat box message
    this.receiverId = user._id;  // set receiver Id
    this.currentActiveUser =  user._id // set currentActive user
    // this.socket.emit('initChat', {userId: this.receiverId}); // init to set receiver socket id
    //init Admin id (senderId)
    if(!this.isSenderInitEmited){
      this.socket.emit('initChat', {userId: this.senderId}); // init to set Admin socket id
      this.isSenderInitEmited = true;
    }
    console.log('load chat box called')
    this.getChatHistory();
    this.chatSeenUpdate();
  }
  public chatSeenUpdate(){
    let targetIndex = this.userList.findIndex( u => u._id == this.receiverId);
    if(targetIndex > -1){
      this.userList[targetIndex].count = 0;
    }
    this.userService.chatSeenUpdate({ senderId: this.receiverId}).subscribe();
  }
  public getChatHistory(){
    this.userService.getChatHistory({ senderId: this.receiverId, receiverId: this.receiverId}).subscribe(res => {
      if(res.status ===200){
        this.chatData = res.data.docs;
      }
    })
  }
  ngAfterViewInit(){
    this.socket.on("receivemessageToSupport",(data) => {
      if(data.data.senderId === this.currentActiveUser || data.data.receiverId === this.currentActiveUser){
        this.chatData.push(data.data)
      }
      if(data.data.senderId === this.currentActiveUser){
        let targetIndex = this.userList.findIndex( u => u._id == this.currentActiveUser);
        if(targetIndex > -1){
          this.userList[targetIndex].count += 1;
          this.userList = this.userList.sort((a, b) => b.count - a.count);
        }
      }
      console.log(data)
    })
  }
  sendMessage(){
    if(!this.sendForm.valid) return;
    let param : any  = {};
    param.senderId  = this.senderId;
    param.receiverId  = this.receiverId;
    param.message = this.sendForm.value.text;
    param.messageType = 'TEXT';
    this.socket.emit('sendmessageToSupport', param);
    this.sendForm.reset();
    console.log('sendmessageToSupport called')
  }
}
