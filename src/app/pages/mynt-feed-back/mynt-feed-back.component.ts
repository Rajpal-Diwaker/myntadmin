import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { Subscription } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-mynt-feed-back',
  templateUrl: './mynt-feed-back.component.html',
  styleUrls: ['./mynt-feed-back.component.css']
})
export class MyntFeedBackComponent implements OnInit {
  public feedbackList: any;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private service:UserService
  ){}
  ngOnInit() {


    $(document).ready(function() {
      // Add minus icon for collapse element which is open by default
      $(".collapse.in").each(function() {
        $(this)
          .siblings(".panel-heading")
          .find(".glyphicon")
          .addClass("rotate");
      });

      // Toggle plus minus icon on show hide of collapse element
      $(".collapse")
        .on("show.bs.collapse", function() {
          $(this)
            .parent()
            .find(".glyphicon")
            .addClass("rotate");
        })
        .on("hide.bs.collapse", function() {
          $(this)
            .parent()
            .find(".glyphicon")
            .removeClass("rotate");
        });
    });




    this.service.setNav('Feedback');
    this.getFeedbackList('M');
  }
  public getFeedbackList(date:string){
    this.subscriptions.push(
      this.service.getFeedbackList({date: date}).subscribe((data)=>{
        if(data && data.status == 200){
          data.data = data.data.map(ele =>{
            ele.rating = isNaN(ele.rating)?ele.rating: Number(ele.rating).toFixed(1)
            ele.review = ele.review.map(ele2 =>{
              ele2.bookingId.serviceId = ele2.bookingId.serviceId.map(ele3 =>ele3.subCategoryName).join(', ');
              return ele2;
            })
            return ele;
          })
            this.feedbackList = data.data;
        }
      })
    )
  }
  onFilter(date: string){
    this.getFeedbackList(date);
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
