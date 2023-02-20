import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/_services/user.service';
@Component({
  selector: 'app-mynt-service-request',
  templateUrl: './mynt-service-request.component.html',
  styleUrls: ['./mynt-service-request.component.css']
})
export class MyntServiceRequestComponent implements OnInit {
  list: any;
  requestFlag: boolean = false;
  request: { status: string[]; };
  constructor(private service: UserService) {
  }
  ngOnInit() {
    this.service.setNav('Service Request');
    this.request = {
      status: ["ACTIVE", "INACTIVE", 'CANCELLED', 'PENDING', 'REJECTED', 'COMPLETED'],
    }
    this.getList(this.request)
  }
  getList(val) {
    this.service.getBookingServies(val).subscribe(res => {
      this.list = res.data;
    })
  }
  deleteUser(item) {
    let textBody = {
      confirmButtonText: `Yes,Block it!`,
      text: 'You won\'t be able to revert this!',
      title: 'Are you sure?'
    }
    this.service.confirmPopup().then(el => {
      if (el.value == true) {
        let request = {
          _id: item._id,
          status: 'BLOCK'
        }
        this.service.updateUserStatus(request).subscribe(res => {
          this.getList(this.request)
        })
      } else {
      }
    }).catch(el => {
    })
  }
  public getServiceValue(value: any){
    if(!value) return value;
    return value.map(ele => ele.subCategoryName).join(', ')
  }
  updateStatus(item) {
    let request = {
      _id: item._id,
      status: item.status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    }
    let textBody = {
      confirmButtonText: `Yes,${request.status}  it!`,
      text: 'You won\'t be able to revert this!',
      title: 'Are you sure?'
    }
    this.service.confirmPopup(textBody).then(el => {
      console.log(el);
      if (el.value) {
        this.service.updateUserStatus(request).subscribe(el => {
          item.status = request.status
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }
  updateRequestStatus(item, status) {
    let request = {
      _id: item._id,
      status: status
    }
    let textBody = {
      confirmButtonText: `Yes,${request.status}  it!`,
      text: 'You won\'t be able to revert this!',
      title: 'Are you sure?'
    }
    if (item.professionalLevel) {
      this.service.confirmPopup(textBody).then(el => {
        console.log(el);
        if (el.value) {
          this.service.updateUserStatus(request).subscribe(el => {
            let request = {
              userType: 'PRO',
              status: ['PENDING'],
            }
            this.getList(request)
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
    else {
      this.service.bug("Please assign level")
    }
  }
}
