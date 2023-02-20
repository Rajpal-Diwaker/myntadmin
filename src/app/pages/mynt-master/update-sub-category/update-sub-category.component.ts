import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/_services/user.service';
@Component({
  selector: 'app-update-sub-category',
  templateUrl: './update-sub-category.component.html',
  styleUrls: ['./update-sub-category.component.css']
})
export class UpdateSubCategoryComponent implements OnInit {
  list: any;
  details: any;
  editFlag: boolean;
  myform: FormGroup;
  categoryList: any;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.userService.setNav('Service');
    this.userService.setFilter(false)
    this.route.queryParams
      .subscribe(params => {
        console.log('asdfasdfasdf', params);

        this.details = params.list
        this.details = JSON.parse(params.list)
        console.log('------->>>-', this.details.list);
        if (params.edit == 'true') {
          this.editFlag = true
        } else {
          this.editFlag = false
        }
        console.log(this.editFlag);
        this.createForm()

      });
    this.getCategoryList()
  }
  get f() { return this.myform.controls; }
  createForm() {
    debugger
    this.myform = this.fb.group({
      _id: [''],
      categoryId: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      subCategoryDescription: ['', Validators.required],
      briefDescription: ['', Validators.required],
      subCategoryName2: ['', Validators.required],
      subCategoryDescription2: ['', Validators.required],
      briefDescription2: ['', Validators.required],
      time: ['', Validators.required],
      level1: ['', Validators.required],
      level2: ['', Validators.required],
      level3: ['', Validators.required],
    });
    if (this.editFlag) {
      this.myform.patchValue(this.details)
      this.myform.patchValue({
        level1: this.details.price.level1,
        level2: this.details.price.level2,
        level3: this.details.price.level3,
        categoryId: this.details.categoryId._id,
      })
    } else {
      debugger
      this.myform.patchValue({
        categoryId: this.details.list
      })
    }
    console.log(this.myform.value);
  }
  submitForm(val) {
    console.log(val);
    if (this.myform.invalid) {
      return true
    }
    val.editFlag = this.editFlag
    this.userService.updateSubcategory(val).subscribe(el => {
      this.router.navigate(['/getSubcategory'], { queryParams: { list: val.categoryId } });

    })
  }
  getCategoryList() {
    this.userService.getCategoryList().subscribe(res => {
      this.categoryList = res.data;
    })
  }
}
