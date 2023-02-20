import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { app_strings } from 'app/_constants/app_strings';
import { UserService } from 'app/_services/user.service';
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  image: any = '../../assets/img/upload-img.png'
  myform: FormGroup;
  file: any;
  editFlag: any = false;
  imageSrc = [];
  imagesObj: any = {};
  details: any;
  deleteId = [];
  constructor(private activate: ActivatedRoute, private route: Router,
    private userService: UserService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.userService.setFilter(false)
    this.activate.queryParams
      .subscribe(params => {
        this.details = JSON.parse(params.list)
        console.log(this.details);
        if (this.details._id) {
          this.editFlag = true;
        }
        console.log(this.editFlag);
      });
    this.userService.setNav(this.editFlag ? 'Edit Category' : 'Create Category');

    this.createForm();
  }
  showImage(imageUrl) {
    if (!imageUrl) { return; }
    this.userService.showImage(imageUrl);
  }
  deleteImages(index: number) {
    (<FormArray>this.myform.get('images')).removeAt(index);
    delete this.imagesObj[index];
    this.imageSrc.splice(index, 1);
  }
  changeImage(val) {
    console.log('valvalvalvalvalvalvalvalvalvalvalvalval', val.value.image);
    if (!val.value.image.includes('assets/img')) {
      this.deleteId.push(val.value.image);
    }
    console.log(this.deleteId);

  }
  readURL(e: { target: { files: Blob[]; }; }, i: string | number) {
    if (e.target.files && e.target.files[0]) {
      this.imagesObj[i] = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc[i] = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  createForm() {
    this.myform = this.fb.group({
      images: this.fb.array([]),
      categoryName: ['', Validators.compose([Validators.required])],
      categoryDescription: ['', Validators.compose([Validators.required])],
      categoryName2: ['', Validators.compose([Validators.required])],
      categoryDescription2: ['', Validators.compose([Validators.required])]
    });
    if (!this.editFlag) {
      this.addMoreImages();
    } else {
      this.myform.patchValue(this.details)
      if (this.details.categoryImage.length) {
        this.details.categoryImage.forEach(el => {
          this.imageSrc.push(el);
          this.addMoreImages({ url: el });
        });
      }
      // if (this.myform.get('categoryName').value=='Wedding') {
      //   this.myform.get('categoryName').disable()
      // }
    }
  }
  addMoreImages(ob = { url: this.image }) {
    // console.log(ob);
    const images = this.myform.get('images') as FormArray;
    images.push(this.createItem(ob.url));
    // console.log(this.myform.value);
  }
  createItem(url): FormGroup {
    return this.fb.group({
      image: url
    });
  }
  fileUpload(e) {
    const file = e.target.files[0];
    this.file = file
    this.userService.imagePreview(file)
      .then(preview => {
        this.image = preview
      });
  }
  get f() { return this.myform.controls; }
  submit(ob) {

    console.log(ob)
    if (this.myform.invalid) {
      for (const key in this.f) {
        if (this.f.hasOwnProperty(key)) {
          const element = this.f[key];
          element.markAsTouched();
        }
      }
      // this.userService.error(app_strings.INVALID_FORM)
      return;
    }
    const fd = new FormData();
    for (const key in ob) {
      if (ob.hasOwnProperty(key)) {
        const element = ob[key];
        fd.append(key, element);
      }
    }
    if (JSON.stringify(this.imagesObj) === '{}' && !this.editFlag) {
      this.userService.error(app_strings.IMAGE_VALIDATION);
      return;
    } else {
      if (this.myform.get('images').value.length == 0) {
        return this.userService.error(app_strings.IMAGE_VALIDATION);

      }
    }
    for (const key in this.imagesObj) {
      if (this.imagesObj.hasOwnProperty(key)) {
        const element = this.imagesObj[key];
        // ob['product[]'] = element;
        fd.append('files', element);
      }
    }
    if (this.deleteId.length) {
      fd.append('deleteImage', this.deleteId.toString())
    }
    if (this.editFlag) {
      console.log(fd);
      // fd.append('categoryId', this.details._id)
      this.userService.editCategory(fd, this.details._id).subscribe(res => {
        this.route.navigate(['/master'])
      })
    } else {
      this.userService.addCategory(fd).subscribe(res => {
        this.route.navigate(['/master'])
      })
    }
  }
}
