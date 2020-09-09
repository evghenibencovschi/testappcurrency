type SourceStatusType = 'accessible' | 'inaccessible';

export interface ISource {
  url: string;
  priority: number;
  readonly status: SourceStatusType;
  changeStatus: (SourceStatusType) => void;
}

export class Source implements ISource {
  url: string;
  priority: number;
  private _status: SourceStatusType;

  constructor(url: string, priority: number, status: SourceStatusType = 'accessible') {
    this.url = url;
    this.priority = priority;
    this._status = status;
  }

  get status() {
    return this._status;
  }


  changeStatus(status: SourceStatusType): void {
    this._status = status;
  }
}

export class Currency {
  name: string;
  private _sources: Array<ISource> = new Array<ISource>();

  addSource(source: Source) {
    this._sources.push(source);
    this._sources = this._sources.sort((x) => x.priority);
  }

  get currentSource(): ISource {
    const source = this._sources.find((x) => x.status === 'accessible');
    return source;
  }

  setDefaultStatus() {
    this._sources.map(source => source.changeStatus('accessible'));
  }

}
