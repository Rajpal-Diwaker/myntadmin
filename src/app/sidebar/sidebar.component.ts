import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
declare var $:any;


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },

    /* start mynt project route */
    { path: '/master', title: 'Master', icon: 'nc-tile-56', class: '' },
    { path: '/professional', title: 'Professional', icon: 'nc-tile-56', class: '' },
    { path: '/serviceRequest', title: 'Service Request', icon: 'nc-tile-56', class: '' },
    { path: '/customer', title: 'Customers', icon: 'nc-tile-56', class: '' },
    { path: '/feedback', title: 'Feedbacks', icon: 'nc-tile-56', class: '' },
    { path: '/manageClient', title: 'Manage Credits', icon: 'nc-tile-56', class: '' },
    { path: '/sub-admin', title: 'Sub Admin', icon: 'nc-tile-56', class: '' },
    { path: '/weedingEnquiries', title: 'Wedding Enquiries', icon: 'nc-tile-56', class: '' },
    { path: '/photoShoot', title: 'Photoshoot', icon: 'nc-tile-56', class: '' },
    { path: '/contact', title: 'Contact List', icon: 'nc-tile-56', class: '' },
    { path: '/faq', title: 'FAQ', icon: 'nc-tile-56', class: '' },
    { path: '/tutorialHelp', title: 'Tutorial Help', icon: 'nc-tile-56', class: '' },
    { path: '/giftCard', title: 'Gift Card', icon: 'nc-tile-56', class: '' },
    { path: '/setting', title: 'Settings', icon: 'nc-tile-56', class: '' },
    { path: '/login', title: 'Logout', icon: 'nc-tile-56', class: '' },

    /* end mynt project route */
    /*   { path: '/icons', title: 'Icons', icon: 'nc-diamond', class: '' },
      { path: '/maps', title: 'Maps', icon: 'nc-pin-3', class: '' },
      { path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: '' },
      { path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '' },
      { path: '/table', title: 'Table List', icon: 'nc-tile-56', class: '' },
      { path: '/typography', title: 'Typography', icon: 'nc-caps-small', class: '' }, */
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(private route: Router, private service: UserService) {

    }
    ngOnInit() {

        $(function () {
            $('.sidebar-wrapper li').click(function() {
                $(this).addClass('active').siblings().removeClass('active');
            });
        })


        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    routing(item) {
        if (item.title == 'Logout') {

            let textBody = {
                confirmButtonText: `Logout!`,
                text: '',
                title: 'Are you sure want to logout?'
            }
            this.service.confirmPopup(textBody).then(el => {
                if (el.value == true) {

                    localStorage.clear();
                    this.route.navigate([item.path])
                } else {

                }
            }).catch(el => {
            })

            // this.router.navi
        } else {
            this.route.navigate([item.path])
        }
    }
}
