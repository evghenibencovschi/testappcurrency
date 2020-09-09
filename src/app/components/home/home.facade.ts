import {DataService} from '../../services/data.service';
import {Component, OnInit} from '@angular/core';
import {Currency, Source} from '../../services/types';

@Component({
  selector: 'app-home-facade',
  template: '<app-home [value]="value"></app-home>'
})
export class HomeFacade implements OnInit {
  value: any;

  sources = [
    {
      url: 'https://www.cbr-xml-daily.ru/daily_utf8.xml',
      priority: 1,
    },
    {
      url: 'https://www.cbr-xml-daily.ru/daily_json.js',
      priority: 2,
    }
  ];


  constructor(private _dataService: DataService) {
  }

  ngOnInit(): void {
    const currency = new Currency();
    this.sources.map(x => {
      currency.addSource(new Source(x.url, x.priority, 'accessible'));
    });
    this._dataService.getData(currency).then(x => {
      this.value = x;
    });
    setInterval(() => {
      currency.setDefaultStatus();
      this._dataService.getData(currency).then(x => {
        this.value = x;
      });
    }, 10000);


  }

}
