import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveSearchService {
  onSearchEvent = new EventEmitter();
  DataIDEvent = new EventEmitter();
  categoryEvent = new EventEmitter();
  pageEvent = new EventEmitter();
  constructor() { }
}
