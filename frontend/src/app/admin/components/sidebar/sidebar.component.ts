import { WebKeyStorage } from 'src/app/shared/globlas/web-key-storage';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WebStorageSerivce } from 'src/app/shared/services/webstorage.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: any;
    pushRightClass: string;
    public userInfo: any;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        public router: Router,
        private webStorageSerivce: WebStorageSerivce,
        private authSerivce: AuthService,
        ) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = ['home', 'home1', ''];
        this.pushRightClass = 'push-right';
        this.userInfo = this.webStorageSerivce.getLocalStorage(WebKeyStorage.user_info);
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any, index: number) {
        if (element === this.showMenu[index]) {
            this.showMenu[index] = '0';
        } else {
            this.showMenu[index] = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }
}
