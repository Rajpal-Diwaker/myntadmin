import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  details: any;
  list: any;
  password = ''
  constructor(private activate: ActivatedRoute, private route: Router, private userService: UserService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.userService.setNav('Professional Details');
    this.activate.queryParams
      .subscribe(params => {
        console.log(JSON.parse(params.detail));
        this.details = JSON.parse(params.detail)
      });
    this.password = this.details.email.split('@')[0] + '@' + new Date().getTime().toString().slice(9)
  }
  updateRequestStatus(item, status) {
    let request = {
      _id: item._id,
      status: status,
      requestFlag: true,
      password: this.password
    }
    if (this.password == '' && status == 'ACTIVE') {
      return this.userService.bug("Please enter password");

    }
    let textBody = {
      confirmButtonText: `Yes,${request.status}  it!`,
      text: 'You won\'t be able to revert this!',
      title: 'Are you sure?'
    }
    if (!item.professionalLevel && status == 'ACTIVE') {
      this.userService.bug("Please assign level")
      this.levelUpdate(item)
      return
    }
    if (item.status) {
      this.userService.confirmPopup(textBody).then(el => {
        console.log(el);
        if (el.value) {
          this.userService.updateUserStatus(request).subscribe(el => {
            
            this.route.navigate(['/professional'])
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
    else {
      this.userService.bug("Please assign level")
      this.levelUpdate(item)
    }
  }
  levelUpdate(item) {
    this.userService.showInput().then(el => {
      if (el.value) {
        let request = {
          _id: item._id,
          professionalLevel: el.value
        }
        this.userService.updateUserlevel(request).subscribe(res => {
          item.professionalLevel=el.value
        })
      } else {
        Swal.fire({
          icon: 'error'
        });
      }
    }).catch(el => {
    })
  }
}
