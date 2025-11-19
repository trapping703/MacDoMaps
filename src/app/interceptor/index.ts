import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LanguageInterceptor} from './language.interceptor';

export const httpInterceptorProvider = [
  {provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true},
];
