import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-mynt-professional',
  templateUrl: './mynt-professional.component.html',
  styleUrls: ['./mynt-professional.component.css']
})
export class MyntProfessionalComponent implements OnInit {
  list: any;
  request: { userType: string; status: string[]; };
  requestFlag: boolean = false;
  count: any;
  backUpList: any;
  //DataTable config
  displayedColumns  : string[] = ['image','name', 'phone','email','location','professionalLevel', 'createdAt','status',
  'actions'];
  dataSource        : any;
  page              : number  = 1;
  defualtLength     : number  = 50;
  limit             : number  = 0;
  filter            : string = '';
  status            : any = ["ACTIVE", "INACTIVE", 'PENDING', "DELETED", "BLOCK", 'REJECTED'];
  startDate         : any =  '';
  endDate           : any =  '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //form
  updatestatusform  : any;
  filterForm        : FormGroup;
  constructor(
    private _router: Router,
    private service: UserService,
    private fb     : FormBuilder
  ){}

  ngOnInit() {
    this.getCount()
    this.getProfessionalList();
    this.updatestatusform = this.fb.group({
      id : ['',[Validators.required]],
      status : ['',[Validators.required]]
    })
    this.filterForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
      status:new FormControl(),
      text: new FormControl()
    });
  }
  getCount() {
    this.service.setNav('Professional');
    let request = {
      userType: "PRO"
    }
    this.service.getUserCount(request).subscribe(res => {
      this.count = res.data;
    })
  }
  getProfessionalList() {
    let param: any  = {};
    param.userType  = 'PRO';
    param.status    = this.status;
    param.searchText= this.filter;
    param.limit     = this.defualtLength;
    param.page      = this.page;
    param.startDate = this.startDate;
    param.endDate   = this.endDate;
    this.service.getProfessionalList(param).subscribe( res => {
      if(res.status === 200){
        this.list   =  res.data[0];
        this.limit  =  res.data[1];
        this.dataSource = new MatTableDataSource(this.list);
      }
    })
  }
  public changePage(event: any){
    this.page           =   event.pageIndex + 1;
    this.defualtLength  =   event.pageSize;
    this.dataSource     = new MatTableDataSource([]);
    this.getProfessionalList();
  }
  public applyFilter(value: any){
    this.startDate = this.filterForm.value.start?moment(this.filterForm.value.start).format('DD-MM-YYYY'):'';
    this.endDate = this.filterForm.value.end?moment(this.filterForm.value.end).format('DD-MM-YYYY'):'';
    this.status = this.filterForm.value.status?.length > 0 ?this.filterForm.value.status:this.status;
    this.getProfessionalList();
  }
  public applySearchFilter(string: any){
    if(!string) return;
    this.filter = string.trim();
    this.getProfessionalList();
  }
  public resetFilter(){
    this.filterForm.reset();
    this.status =  ["ACTIVE", "INACTIVE", 'PENDING', "DELETED", "BLOCK", 'REJECTED'];
    this.filter = '';
    this.startDate = '';
    this.endDate = '';
    this.getProfessionalList();
  }
  public pendingFilter(){
    this.status =  ['PENDING'];
    this.filterForm.controls['status'].setValue(['PENDING'])
    this.getProfessionalList();
  }
  requestProfessional() {
    // let request = {
    //   userType: 'PRO',
    //   status: ['PENDING'],
    // }
    // this.requestFlag = !this.requestFlag;
    // if (this.requestFlag) {
    //   this.getList(request)
    // } else {
    //   this.getList(this.request)
    // }
    // this.requestFlag = !this.requestFlag;
  }
  deleteCateogry(item) {
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
          // this.getList(this.request)
        })
      } else {
      }
    }).catch(el => {
    })
  }
  levelUpdate(item: any) {
    this.service.showInput().then(el => {
      if (el.value) {
        let request = {
          _id: item._id,
          professionalLevel: el.value
        }
        this.service.updateUserlevel(request).subscribe(res => {
          this.getProfessionalList();
        })
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
  updateRequestStatus(item, status) {
    let request = {
      _id: item._id,
      status: status,
      requestFlag: this.requestFlag
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
            // if (this.requestFlag) {
            //   this.getList(request)
            // } else {
            //   this.getList(this.request)
            // }
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
  deleteUser(item) {
    this.service.confirmPopup().then(el => {
      if (el.value == true) {
        let request = {
          _id: item._id,
          status: 'BLOCK'
        }
        this.service.updateUserStatus(request).subscribe(res => {
          this.ngOnInit()
        })
      } else {
      }
    }).catch(el => {
    })
  }
  navigateDetails(item) {
    this._router.navigate(['/professional/requestDetail'], { queryParams: { detail: JSON.stringify(item) } });

    // if (!this.requestFlag) {
    //   this._router.navigate(['/professional/details'], { queryParams: { detail: JSON.stringify(item) } });

    // }
    // else {
    //   this._router.navigate(['/professional/requestDetail'], { queryParams: { detail: JSON.stringify(item) } });

    // }
  }
  show_update_popup(ele: any){
    console.log(ele)
    $("#status-edit-popup").modal("show")
    $("#status-edit-popup").addClass('show')
    this.updatestatusform.reset()
    this.updatestatusform.patchValue({
      id : ele._id,
      status : ele.status
    })
  }
  updatestatusformsubmit(){
    if(this.updatestatusform.invalid) return;
    let parm: any = {};
    parm._id =  this.updatestatusform.value.id;
    parm.status =  this.updatestatusform.value.status;
    this.service.updateUserStatus(parm).subscribe( res =>{
      if(res.status ===200){
      this.service.success(res.message);   //show succees message
        $("#status-edit-popup").removeClass('show')
        $("#status-edit-popup").modal("hide")
        this.getProfessionalList();
      }else{
        this.service.error(res.message);    //show Error message
      }
    });
  }
  onCloseModal(){
    $("#status-edit-popup").removeClass('show')
  }

}
