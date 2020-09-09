import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Currency} from './types';
import {ParseService} from './parse.service';
import {log} from "util";


@Injectable()
export class DataService {

  constructor(private http: HttpClient,
              private parseService: ParseService) {
  }

  // getData(currency: Currency): any {
  //   const current = currency.currentSource;
  //   if (!current) {
  //     alert('Активных источников нет');
  //     return;
  //   }
  //   this.http.get(current.url, { responseType: 'text', observe: 'response'}).subscribe( x => {
  //     this.parseService.parse(x.headers.get('content-type'), x.body).then(y => {
  //        const result = y;
  //        if (!result) {
  //          currency.currentSource.changeStatus('inaccessible');
  //          this.getData(currency);
  //        }
  //        return result;
  //     });
  //   }, error => {
  //     this.getData(currency);
  //   });
  // }


  getData(currency: Currency): Promise<any> {
    const self = this;
    return new Promise<any>(((resolve, reject) => {
      const currentSource = currency.currentSource;
      if (!currentSource) {
        alert('Активных источников нет');
        return;
      }
      this.http.get(currentSource.url, {responseType: 'text', observe: 'response'}).subscribe(x => {
        this.parseService.parse(x.headers.get('content-type'), x.body).then(y => {
          const result = y;
          if (!result) {
            currency.currentSource.changeStatus('inaccessible');
            self.getData(currency).then();
          }
          resolve(result);
        });
      }, error => {
        reject(null);
      });
    }));

  }


}

