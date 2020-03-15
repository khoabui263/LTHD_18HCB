import { AuthService } from './../../../shared/services/auth.service';
import { WebKeyStorage } from './../../../shared/globlas/web-key-storage';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/app/shared/services/dialog-service.service';
import { DialogDoimatkhauComponent } from '../dialog-doimatkhau/dialog-doimatkhau.component';
import { WebStorageSerivce } from 'src/app/shared/services/webstorage.service';
import { ThongBaoService } from 'src/app/shared/services/thong-bao.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    public userInfo: any;
    public listThongBao: any = [];

    constructor(
        private dialogServiceService: DialogService,
        public router: Router,
        private webStorageSerivce: WebStorageSerivce,
        private authSerivce: AuthService,
        private thongBaoService: ThongBaoService
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
        this.pushRightClass = 'push-right';
        this.userInfo = this.webStorageSerivce.getLocalStorage(WebKeyStorage.user_info);
        this.getDSThongBao(this.userInfo.user.maTk);
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

    onLoggedout() {
        this.webStorageSerivce.clearLocalStorage();
        this.authSerivce.isLogin = false;
        this.router.navigateByUrl('/login');
    }

    showDialogChangePassword() {
        this.dialogServiceService.showDialog(DialogDoimatkhauComponent);
    }

    getDSThongBao(matk: string) {
        this.thongBaoService.getThongBaoUser(matk).subscribe(res => {
            if (res) {
                this.listThongBao = res;
            }
        });
    }
}
