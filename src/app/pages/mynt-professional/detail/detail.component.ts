import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  details: any;
  list: any;
  proId:  any;
  proData :  any;
  //DataTable config
  displayedColumns  : string[] = ['serviceId','name','location','date', 'price','status'];
  dataSource        : any;
  page              : number  = 1;
  defualtLength     : number  = 50;
  limit             : number  = 0;
  filter            : string = '';
  status            : any = ["ACTIVE", "INACTIVE",'CONFIRM', 'CANCELLED','ACCEPTED','PENDING', 'REJECTED', 'COMPLETED'];
  statusDisplay     : any = ["ACTIVE", "INACTIVE",'CONFIRM', 'CANCELLED','ACCEPTED','PENDING', 'REJECTED', 'COMPLETED'];
  startDate         : any =  '';
  endDate           : any =  '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //form
  filterForm        : FormGroup;


  constructor(
    private activate: ActivatedRoute,
    private route: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.userService.setNav('Professional Details');
    this.proId = this.activate.snapshot.paramMap.get('id');
    this.getProfessionalData();
    this.getProfessionalBooking();
    this.filterForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
      status:new FormControl(),
      text: new FormControl()
    });
  }
  getProfessionalData(){
    this.userService.getProfessionalById({id : this.proId}).subscribe( data =>{
      this.proData = data.data;
    })
  }
  getProfessionalBooking(){
    let param: any  = {};
    param.status    = this.status;
    param.searchText= this.filter;
    param.limit     = this.defualtLength;
    param.page      = this.page;
    param.startDate = this.startDate;
    param.endDate   = this.endDate;
    param.proId     = this.proId;
    this.userService.getProfessionalBooking(param).subscribe( res =>{
      if(res.status === 200){
        this.list   =  res.data[0];
        this.limit  =  res.data[1];
        this.dataSource = new MatTableDataSource(this.list);
      }
    })
  }
  getProfessionalListDetails() {
    // let request = {
    //   professionalId: this.details._id
    // }
    // this.userService.getProfessionalListDetails(request).subscribe(res => {
    //   this.list = res.data;
    // })
  }
  public changePage(event: any){
    this.page           =   event.pageIndex + 1;
    this.defualtLength  =   event.pageSize;
    this.dataSource     = new MatTableDataSource([]);
    this.getProfessionalBooking();
  }
  public applyFilter(value: any){
    this.startDate = this.filterForm.value.start?moment(this.filterForm.value.start).format('DD-MM-YYYY'):'';
    this.endDate = this.filterForm.value.end?moment(this.filterForm.value.end).format('DD-MM-YYYY'):'';
    this.status = this.filterForm.value.status?.length > 0 ?this.filterForm.value.status:this.status;
    this.getProfessionalBooking();
  }
  public applySearchFilter(string: any){
    if(!string) return;
    this.filter = string.trim();
    this.getProfessionalBooking();
  }
  public resetFilter(){
    this.filterForm.reset();
    this.status =  ["ACTIVE", "INACTIVE",'CONFIRM', 'CANCELLED','ACCEPTED','PENDING', 'REJECTED', 'COMPLETED'];
    this.filter = '';
    this.startDate = '';
    this.endDate = '';
    this.getProfessionalBooking();
  }
}
