import { Injectable, OnInit, Component } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Contato } from './contato';

@Injectable()
export class ContatoService {
  [x: string]: any;
  allContatoUrl = 'http://localhost:8080/user/all-contato';
  contatoUrl = 'http://localhost:8080/user/contato';
  constructor(private http: Http) { }

  // tslint:disable-next-line: no-unused-expression
  getAllContato(): Observable[] > {
    return: this.http.get(this.allContatoUrl)
      .map(this.extractData)
      .catch(this.handleError);

  }
createContato(contato: Contato): Observable < number > {
  let cpHeaders = new Headers({ 'Content-type': 'application/json' });
  let option = new RequestOption({ headers: cpHeaders });
  return this.http.post(this.contatoUrl, contato, options)
    .map(sucess => sucess.status)
    .catch(this.handlError);
}
//GET: contato
getContatoById(contatoId: string): Observable < Contato > {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', contatoId);
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.get(this.contatoUrl, options)
    .map(this.extractData)
    // tslint:disable-next-line: indent
    .catch(this.handleError);
}
// PUT: contato
updateContato(contato: Contato): Observable < number > {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: cpHeaders });
  return this.http.put(this.contatoUrl, contato, options)
    .map(success => success.status)
    .catch(this.handleError);
}
//DELETE: contato
deleteContato(contatoId: string): Observable < number > {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', contatoId);
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.delete(this.contatoUrl, options)
    .map(success => success.status)
    .catch(this.handleError);
}

	private extractData(res: Response) {
  let body = res.json();
  return body;
}
  private handleError(error: Response | any) {
  console.error(error.message || error);
  return Observable.throw(error.status);
}
}
