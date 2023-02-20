import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { MyntMasterComponent } from 'app/pages/mynt-master/mynt-master.component';
import { MyntProfessionalComponent } from 'app/pages/mynt-professional/mynt-professional.component';
import { MyntServiceRequestComponent } from 'app/pages/mynt-service-request/mynt-service-request.component';
import { MyntCustomerComponent } from 'app/pages/mynt-customer/mynt-customer.component';
import { MyntFeedBackComponent } from 'app/pages/mynt-feed-back/mynt-feed-back.component';
import { MyntManageCreditComponent } from 'app/pages/mynt-manage-credit/mynt-manage-credit.component';
import { MyntWeddingEnquiriesComponent } from 'app/pages/mynt-wedding-enquiries/mynt-wedding-enquiries.component';
import { UpdateCategoryComponent } from 'app/pages/mynt-master/update-category/update-category.component';
import { UpdateSubCategoryComponent } from 'app/pages/mynt-master/update-sub-category/update-sub-category.component';
import { GetSubCategoryComponent } from 'app/pages/mynt-master/get-sub-category/get-sub-category.component';
import { AuthGuard } from 'app/_guards/auth.guard';
import { DetailComponent } from 'app/pages/mynt-professional/detail/detail.component';
import { WeddingDetailComponent } from 'app/pages/mynt-wedding-enquiries/wedding-detail/wedding-detail.component';
import { RequestDetailComponent } from 'app/pages/mynt-professional/request-detail/request-detail.component';
import { AddCreditComponent } from '../../pages/mynt-manage-credit/add/add.component';
import { MyntSubAdminComponent } from '../../pages/mynt-sub-admin/mynt-sub-admin.component';
import { AddSubAdminComponent } from '../../pages/mynt-sub-admin/add/add.component';
import { MyntFaqComponent } from '../../pages/mynt-faq/mynt-faq.component';
import { AddFaqComponent } from '../../pages/mynt-faq/add/add.component';
import { MyntTutorialHelpComponent } from '../../pages/mynt-tutorial-help/mynt-tutorial-help.component';
import { UpdateTutorialHelpComponent } from '../../pages/mynt-tutorial-help/update/update.component';
import { MyntSettingComponent } from '../../pages/mynt-setting/mynt-setting.component';
import { MyntGiftCardComponent } from '../../pages/mynt-gift-card/mynt-gift-card.component';
import { MyntPhotoShootComponent } from '../../pages/mynt-photo-shoot/mynt-photo-shoot.component';
import { MyntContactComponent } from '../../pages/mynt-contact/mynt-contact.component';
import { CustomerDetailComponent } from 'app/pages/mynt-customer/detail/detail.component';
import { MyntChatComponent } from '../../pages/mynt-chat/mynt-chat.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        component: UserComponent
    },
    {
        path: 'table',
        canActivate: [AuthGuard],
        component: TableComponent
    },
    {
        path: 'typography',
        canActivate: [AuthGuard],
        component: TypographyComponent
    },
    {
        path: 'icons',
        canActivate: [AuthGuard],
        component: IconsComponent
    },
    {
        path: 'maps',
        canActivate: [AuthGuard],
        component: MapsComponent
    },
    {
        path: 'notifications',
        canActivate: [AuthGuard],
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        canActivate: [AuthGuard],
        component: UpgradeComponent
    },
    /* mynt route start here */
    {
        path: 'master',
        canActivate: [AuthGuard],
        component: MyntMasterComponent
    },
    /* inner pages of master */
    {
        path: 'updateCategory',
        canActivate: [AuthGuard],
        component: UpdateCategoryComponent
    },
    {
        path: 'updateSubCategory',
        canActivate: [AuthGuard],
        component: UpdateSubCategoryComponent
    },
    {
        path: 'getSubcategory',
        canActivate: [AuthGuard],
        component: GetSubCategoryComponent
    },
    /* inner pages of master */


    {
        path: 'professional',
        canActivate: [AuthGuard],
        component: MyntProfessionalComponent
    },
    {
        path: 'professional/details/:id',
        canActivate: [AuthGuard],
        component: DetailComponent
    },
    {
           path: 'professional/requestDetail',
           canActivate: [AuthGuard],
           component: RequestDetailComponent
       },

    {
        path: 'serviceRequest',
        canActivate: [AuthGuard],
        component: MyntServiceRequestComponent
    },
    {
        path: 'customer',
        canActivate: [AuthGuard],
        component: MyntCustomerComponent
    },
    {
      path: 'customer/details',
      canActivate: [AuthGuard],
      component: CustomerDetailComponent
    },
    {
        path: 'feedback',
        canActivate: [AuthGuard],
        component: MyntFeedBackComponent
    },
    {
        path: 'manageClient',
        canActivate: [AuthGuard],
        component: MyntManageCreditComponent
    },
    {
      path: 'addCredit',
      canActivate: [AuthGuard],
      component: AddCreditComponent
    },
    {
        path: 'weedingEnquiries',
        canActivate: [AuthGuard],
        component: MyntWeddingEnquiriesComponent
    },
    {
        path: 'weedingEnquiries/details',
        canActivate: [AuthGuard],
        component: WeddingDetailComponent
    },
    {
      path: 'sub-admin',
      canActivate: [AuthGuard],
      component: MyntSubAdminComponent
    },
    {
      path: 'tutorialHelp',
      canActivate: [AuthGuard],
      component: MyntTutorialHelpComponent
    },
    {
      path: 'updateTutorialHelp',
      canActivate: [AuthGuard],
      component: UpdateTutorialHelpComponent
    },
    {
      path: 'faq',
      canActivate: [AuthGuard],
      component: MyntFaqComponent
    },
    {
      path: 'addFaq',
      canActivate: [AuthGuard],
      component: AddFaqComponent
    },
    {
      path: 'add-sub-admin',
      canActivate: [AuthGuard],
      component: AddSubAdminComponent
    },
    {
      path: 'setting',
      canActivate: [AuthGuard],
      component: MyntSettingComponent
    },
    {
      path: 'giftCard',
      canActivate: [AuthGuard],
      component: MyntGiftCardComponent
    },
    {
      path: 'contact',
      canActivate: [AuthGuard],
      component: MyntContactComponent
    },
    {
      path: 'photoShoot',
      canActivate: [AuthGuard],
      component: MyntPhotoShootComponent
    },
    {
      path: 'chat',
      canActivate: [AuthGuard],
      component: MyntChatComponent
    },
    /* mynt route end here */

];
