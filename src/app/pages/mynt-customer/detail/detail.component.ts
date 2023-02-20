import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  details: any;
  list: any;
  constructor(
    private activate: ActivatedRoute,
    private route: Router,
    private userService: UserService,
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.userService.setNav('Customer Details');
    this.activate.queryParams
      .subscribe(params => {
        this.details = JSON.parse(params.detail)
      });
      this.getBookingList()
  }
  getBookingList() {
    let request ={
      status: ['CANCELLED', 'PENDING', 'COMPLETED'],
      userId: this.details._id
    };
    this.userService.getBookingServies(request).subscribe(res => {
      this.list = res.data;
      this.list =  this.list.filter(ele =>{
        ele.serviceId = ele.serviceId.map(ele2 => ele2.subCategoryName).join(', ');
        return true;
      })
    })
  }
}
