import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

export class ApiPrefixInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const prefix = environment.apiBaseUrl.endsWith('/') ? environment.apiBaseUrl.slice(0, -1) : environment.apiBaseUrl;
        
        if (!/^(http|https):/i.test(req.url)) {
            req = req.clone({ url: prefix + req.url });
        }

        return next.handle(req);
    }
}
