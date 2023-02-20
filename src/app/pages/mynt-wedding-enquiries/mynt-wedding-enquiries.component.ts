import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
@Component({
  selector: 'app-mynt-wedding-enquiries',
  templateUrl: './mynt-wedding-enquiries.component.html',
  styleUrls: ['./mynt-wedding-enquiries.component.css']
})
export class MyntWeddingEnquiriesComponent implements OnInit {
  list: any;

  requestFlag: boolean = false;
  request: { status: string[]; };

  constructor(private router: Router, private service: UserService) {

  }

  ngOnInit() {
    this.service.setNav('Wedding Request');
    this.request = {
      status: ["ACTIVE", "INACTIVE", "DELETED", "BLOCK"],
    }
    this.getList(this.request)
  }
  getList(val) {
    this.service.getWeddingList(val).subscribe(res => {
      this.list = res.data;
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
        this.service.updateWeddingstatus(request).subscribe(el => {
          item.status = request.status
        })
      }

    }).catch(err => {
      console.log(err);

    })
  }
  navigate(item, type) {

    this.router.navigate(['/weedingEnquiries/details'], { queryParams: { list: JSON.stringify(item) } });
  }

}