import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Injectable()
export class HeaderHandlerInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(!this.auth.token){
      return next.handle(req);
    }else{
      const modifiedReq = req.clone({
        setHeaders: {
          'Authorization' : 'plqs ' + this.auth.token,
        }
      });
      return next.handle(modifiedReq);
    }
  }

}
