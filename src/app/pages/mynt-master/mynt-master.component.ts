import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-mynt-master',
  templateUrl: './mynt-master.component.html',
  styleUrls: ['./mynt-master.component.css']
})
export class MyntMasterComponent implements OnInit {
  list: any;

  constructor(private userService: UserService, private router: Router) {

  }
  ngOnInit() {
    this.userService.setNav('Master');
    this.userService.setFilter(false)
    this.getCategoryList()
  }
  getCategoryList() {
    this.userService.getCategoryList().subscribe(res => {
      this.list = res.data
    })
  }
  navigate(item, type) {

    if (type == 1) {


      // [hidden]="!item?.subCategory.length"
      if (item.subCategory.length) {
        this.router.navigate(['/getSubcategory'], { queryParams: { list: item._id } });
      } else {

        // [routerLink]="[ '/updateSubCategory' ]"
        this.router.navigate(['/updateSubCategory'], { queryParams: { list: JSON.stringify({ list: item._id }), edit: false } });

      }



    } else {
      this.router.navigate(['/updateCategory'], { queryParams: { list: JSON.stringify(item) } });

    }
  }
  changeStatus(item) {
    console.log(item);
    let request = {
      _id: item._id,
      type: 1,
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
}