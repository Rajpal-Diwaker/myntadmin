import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
@Component({
  selector: 'app-get-sub-category',
  templateUrl: './get-sub-category.component.html',
  styleUrls: ['./get-sub-category.component.css']
})
export class GetSubCategoryComponent implements OnInit {
  list: any;
  details: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.userService.setNav('Service');
    this.userService.setFilter(false)
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.details = params
        this.getServices()
      });
  }
  getServices() {
    let query = {
      categoryId: this.details.list
    }
    this.userService.getServices(query).subscribe(res => {
      this.list=res.data;
    })
  }
  changeStatus(item) {
    console.log(item);
    let request = {
      _id: item._id,
      type: 2,
      status: item.status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    }
    let textBody = {
      confirmButtonText: `Yes,${request.status}  it!`,
      text: '',
      title: 'Are you sure?'
    }
    this.userService.confirmPopup(textBody).then(el => {
      if (el.value == true) {
        this.userService.updateMasterStatus(request).subscribe(res => {
          item.status = request.status
        })
      } else {
      }
    }).catch(el => {
    })
  }
  navigate(item) {
    if (item) {
      this.router.navigate(['/updateSubCategory'], { queryParams: { list: JSON.stringify(item), edit: true } });
    } else {
      this.router.navigate(['/updateSubCategory'], { queryParams: { list: JSON.stringify(this.details), edit: false } });
    }
  }
}