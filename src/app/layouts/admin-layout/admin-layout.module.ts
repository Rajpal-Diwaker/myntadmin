import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Pipes
import { DateAgoPipe } from '../../_pipes/dateAge.pipe';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyntCustomerComponent } from 'app/pages/mynt-customer/mynt-customer.component';
import { MyntFeedBackComponent } from 'app/pages/mynt-feed-back/mynt-feed-back.component';
import { MyntMasterComponent } from 'app/pages/mynt-master/mynt-master.component';
import { MyntManageCreditComponent } from 'app/pages/mynt-manage-credit/mynt-manage-credit.component';
import { MyntProfessionalComponent } from 'app/pages/mynt-professional/mynt-professional.component';
import { MyntServiceRequestComponent } from 'app/pages/mynt-service-request/mynt-service-request.component';
import { MyntWeddingEnquiriesComponent } from 'app/pages/mynt-wedding-enquiries/mynt-wedding-enquiries.component';
import { GetSubCategoryComponent } from 'app/pages/mynt-master/get-sub-category/get-sub-category.component';
import { UpdateCategoryComponent } from 'app/pages/mynt-master/update-category/update-category.component';
import { UpdateSubCategoryComponent } from 'app/pages/mynt-master/update-sub-category/update-sub-category.component';
import { SharedModule } from 'app/_shared/shared.module';
import { DetailComponent } from 'app/pages/mynt-professional/detail/detail.component';
import { WeddingDetailComponent } from 'app/pages/mynt-wedding-enquiries/wedding-detail/wedding-detail.component';
import { RequestDetailComponent } from 'app/pages/mynt-professional/request-detail/request-detail.component';
import { AddCreditComponent } from '../../pages/mynt-manage-credit/add/add.component';
import { MyntSubAdminComponent } from '../../pages/mynt-sub-admin/mynt-sub-admin.component';
import { AddSubAdminComponent } from '../../pages/mynt-sub-admin/add/add.component';
import { DataTableModule } from 'angular-bootstrap-data-table';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MyntFaqComponent } from '../../pages/mynt-faq/mynt-faq.component';
import { AddFaqComponent } from '../../pages/mynt-faq/add/add.component';
import { MyntTutorialHelpComponent } from '../../pages/mynt-tutorial-help/mynt-tutorial-help.component';
import { UpdateTutorialHelpComponent } from '../../pages/mynt-tutorial-help/update/update.component';
import { MyntSettingComponent } from '../../pages/mynt-setting/mynt-setting.component';
import { MyntGiftCardComponent } from '../../pages/mynt-gift-card/mynt-gift-card.component';
import { MyntPhotoShootComponent } from '../../pages/mynt-photo-shoot/mynt-photo-shoot.component';
import { MyntContactComponent } from '../../pages/mynt-contact/mynt-contact.component';
import { MyntChatComponent } from '../../pages/mynt-chat/mynt-chat.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { CustomerDetailComponent } from 'app/pages/mynt-customer/detail/detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    SharedModule,
    DataTableModule,
    NgxIntlTelInputModule,
    AccordionModule.forRoot(),
    CKEditorModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    ScrollingModule,
    MatBadgeModule
  ],
  declarations: [
    //pipes
    DateAgoPipe,

    //component
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    MyntMasterComponent,
    /* pro */
    MyntProfessionalComponent,
    DetailComponent,
    RequestDetailComponent,
    /* pro */
    MyntServiceRequestComponent,
    MyntCustomerComponent,
    MyntFeedBackComponent,
    MyntManageCreditComponent,
    MyntWeddingEnquiriesComponent,
    WeddingDetailComponent,
    UpdateCategoryComponent,
    UpdateSubCategoryComponent,
    GetSubCategoryComponent,
    AddCreditComponent,
    MyntSubAdminComponent,
    AddSubAdminComponent,
    MyntFaqComponent,
    AddFaqComponent,
    MyntTutorialHelpComponent,
    UpdateTutorialHelpComponent,
    MyntSettingComponent,
    MyntGiftCardComponent,
    MyntPhotoShootComponent,
    MyntContactComponent,
    CustomerDetailComponent,
    MyntChatComponent
  ]
})

export class AdminLayoutModule { }
