import { WebStorageSerivce } from './../../shared/services/webstorage.service';
import { Component, OnInit } from '@angular/core';
import { WebKeyStorage } from 'src/app/shared/globlas/web-key-storage';
import { TaikhoanthanhtoanService } from 'src/app/shared/services/taikhoanthanhtoan.service';

@Component({
  selector: 'app-lichsugiaodich',
  templateUrl: './lichsugiaodich.component.html',
  styleUrls: ['./lichsugiaodich.component.scss']
})
export class LichsugiaodichComponent implements OnInit {
  public userInfo: any;
  public listChuyenTien: any = [];
  public listNhanTien: any = [];
  constructor(
    private webStorageSerivce: WebStorageSerivce,
    private taikhoanService: TaikhoanthanhtoanService
  ) { }

  ngOnInit() {
    this.userInfo = this.webStorageSerivce.getLocalStorage(WebKeyStorage.user_info);
    this.getLichSuChuyenTien(this.userInfo.user.soTaiKhoan);
    this.getLichSuNhanTien(this.userInfo.user.soTaiKhoan);
  }

  getLichSuChuyenTien(sotaikhoan) {
    this.taikhoanService.getLichSuChuyenTien(sotaikhoan).subscribe(res => {
      if (res) {
        this.listChuyenTien = res;
      }
    });
  }

  getLichSuNhanTien(sotaikhoan) {
    this.taikhoanService.getLichSuNhanTien(sotaikhoan).subscribe(res => {
      if (res) {
        this.listNhanTien = res;
      }
    });
  }

}
