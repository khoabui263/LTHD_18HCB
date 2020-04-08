import { catchError } from 'rxjs/operators';
import { WebKeyStorage } from './../globlas/web-key-storage';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpClient, HttpRequest, HttpHandler } from '@angular/common/http';
import 'rxjs/add/operator/mergeMap';
import { WebStorageSerivce } from './webstorage.service';
import { throwError } from 'rxjs';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    public http: HttpClient,
    public webStorageSerivce: WebStorageSerivce
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const tokenInfo = this.webStorageSerivce.getSessionStorage(WebKeyStorage.token_info);
    if (tokenInfo) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenInfo.token
        }
      });
    }
    return next.handle(req).pipe(catchError((error: any) => {
      if (error.status === 401) {
        const params = {
          token: tokenInfo.token,
          refreshToken: tokenInfo.refreshToken
        };
        console.log('401');
        // return this.http.put('localhost:8080/auth/refresh', params).mergeMap((data: any) => {
        //     if (data.status === 200) {
        //       this.webStorageSerivce.setSessionStorage(WebKeyStorage.token_info, { token: data.token, refreshToke: data.refreshToke });
        //       req = req.clone({
        //         setHeaders: {
        //           'Content-Type': 'application/json',
        //           'Authorization': 'Bearer ' + data.token
        //         }
        //       });
        //       return next.handle(req);
        //     }
        // });
      }
      return throwError(error);
    }));
  }
}
