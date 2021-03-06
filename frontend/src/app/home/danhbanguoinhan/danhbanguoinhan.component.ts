import { Component, OnInit } from '@angular/core';
import { WebStorageSerivce } from 'src/app/shared/services/webstorage.service';
import { DialogService } from 'src/app/shared/services/dialog-service.service';
import { DanhBaService } from 'src/app/shared/services/danh-ba.service';
import { WebKeyStorage } from 'src/app/shared/globlas/web-key-storage';
import { DialogTaodanhbaComponent } from '../components/dialog-taodanhba/dialog-taodanhba.component';

@Component({
  selector: 'app-danhbanguoinhan',
  templateUrl: './danhbanguoinhan.component.html',
  styleUrls: ['./danhbanguoinhan.component.scss']
})
export class DanhbanguoinhanComponent implements OnInit {

  public listDanhBa: any = [];
  public userInfo: any;
  constructor(
    private webStorageSerivce: WebStorageSerivce,
    private dialogService: DialogService,
    private danhBaService: DanhBaService
  ) { }

  ngOnInit() {
    this.userInfo = this.webStorageSerivce.getLocalStorage(WebKeyStorage.user_info);
    this.getDanhBa(this.userInfo.user.maTk);
  }

  xoaDanhBa(id) {
    this.dialogService.showDialogComfirm('Bạn có muốn xóa khỏi danh bạ không!').then(res => {
      if (res) {
        this.danhBaService.deleteDanhBa(id).subscribe(result => {
          if (result) {
            this.getDanhBa(this.userInfo.user.maTk);
          }
        });
      }
    });
  }

  suaDanhBa(item) {
    this.dialogService.showDialog(DialogTaodanhbaComponent, item).then(res => {
      if (res) {
        this.getDanhBa(this.userInfo.user.maTk);
      }
    });
  }

  taoMoiDanhBa() {
    this.dialogService.showDialog(DialogTaodanhbaComponent).then(res => {
      if (res) {
        this.getDanhBa(this.userInfo.user.maTk);
      }
    });
  }

  getDanhBa(matk: string) {
    this.danhBaService.getDSDanhBa(matk).subscribe(res => {
      if (res) {
        this.listDanhBa = res;
      }
    });
  }

}
