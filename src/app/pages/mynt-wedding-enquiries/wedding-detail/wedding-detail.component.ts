import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-wedding-detail',
  templateUrl: './wedding-detail.component.html',
  styleUrls: ['./wedding-detail.component.css']
})
export class WeddingDetailComponent implements OnInit {

  details: any;
  constructor(private activate: ActivatedRoute, private route: Router, private userService: UserService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.userService.setNav('Wedding Request Details');
    this.activate.queryParams
      .subscribe(params => {
        this.details = JSON.parse(params.list)
      });
  }
}
