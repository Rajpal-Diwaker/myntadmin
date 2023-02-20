import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mynt-customer',
  templateUrl: './mynt-customer.component.html',
  styleUrls: ['./mynt-customer.component.css']
})
export class MyntCustomerComponent implements OnInit {
  list: any;
  request: { userType: string; status: string[]; };
  requestFlag: boolean = false;
  count: any;
  backUpList: any;
  constructor(
    private service: UserService,
    private router : Router
  ){}
  ngOnInit() {
    this.service.setFilter(true);
    this.service.setNav('Customer List');
    this.getCount()
    this.request = {
      userType: 'USER',
      status: ["ACTIVE", "INACTIVE"],
    }
    this.getList(this.request)
    document.getElementById('openfilter').addEventListener("click", displayfilterpopup);
    function displayfilterpopup() {
      document.getElementById('filterpopup').style.display="block";
    }
    document.getElementById('modal-close').addEventListener("click", nonefilterpopup);
    function nonefilterpopup() {
      document.getElementById('filterpopup').style.display="none";
    }
  }


  /* header count */
  getCount() {
    let request = {
      userType: "USER"
    }
    this.service.getUserCount(request).subscribe(res => {
      this.count = res.data;
    })
  }
  getList(val) {
    this.service.getUserList(val).subscribe(res => {
      this.list = res.data;
      this.backUpList = this.list;
    })
  }
  deleteUser(item) {
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
  search(val) {
    console.log(val);
    val = val.toLowerCase().trim()
    this.list = this.backUpList.filter(el => {
      if ((el.fullName).toLowerCase().includes(val) || (el.phone).toLowerCase().includes(val) || (el.email).toLowerCase().includes(val)) {
        return true
      }
    })
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
  navigateDetails(item : any){
      this.router.navigate(['/customer/details'], { queryParams: { detail: JSON.stringify(item) } });
  }
}
