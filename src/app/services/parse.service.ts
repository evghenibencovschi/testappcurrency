import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';
@Injectable()
export class ParseService {

  constructor() { }


  parse(type: string, data): Promise<any> {
    switch (type) {
      case 'application/javascript; charset=utf-8': {
        return new Promise<any>((resolve => {
          resolve(ParseJson.getValue('978', data));
        }));
      }
      case 'text/xml': {
        return new Promise<any>((resolve => {
          const parser = new xml2js.Parser({ strict: false, trim: true, explicitArray: false});
          parser.parseString(data, (err, result) => {
            resolve(ParseXML.getValue('978', result));
          });
        }));
      }
      default: {
        return null;
      }
    }
  }

}

export class ParseJson {
  static getValue(code: string, data: any) {
    const mas = Object.values(JSON.parse(data).Valute) as Array<ValuteJson>;
    return mas.find((v: ValuteJson) => v.NumCode === code).Value;
  }
}

export class ParseXML {
  static getValue(code: string, data: any) {
    return (data.VALCURS.VALUTE.find(v => v.NUMCODE === '978')?.VALUE);
  }
}

export class ValuteJson {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

export class ValuteXml {
  ID: string;
  CHARCODE: string;
  NAME: string;
  NOMINAL: string;
  NUMCODE: string;
  VALUE: string;
}

