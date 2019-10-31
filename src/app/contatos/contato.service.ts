import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Contato } from './contato.model';
import { Contatos } from './contatos-mock';
import { Observable } from 'rxjs';

@Injectable()
export class ContatoService {

    private apiUrl = 'app/contatos';
    // tslint:disable-next-line: deprecation
    private headers: Headers = new Headers({'Content-type': 'application/json'});
  search: any;

    constructor(
        // tslint:disable-next-line: deprecation
        private http: Http
    ) {}

    getContatos(): Promise<Contato[]> {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
    }

    // tslint:disable-next-line: ban-types
    getContato(id: Number): Promise<Contato> {
        return this.getContatos().
            then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

    create(contato: Contato): Promise<Contato> {
        return this.http.post(this.apiUrl, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        // tslint:disable-next-line: deprecation
        .then((response: Response) => response.json().data as Contato)
        .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato> {
        const urlUpdate = `${this.apiUrl}/${contato.id}`;
        return this.http.put(urlUpdate, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato> {
        const urlDelete = `${this.apiUrl}/${contato.id}`;
        return this.http.delete(urlDelete, {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }
    /*
    search(termo: string): Observable<Contato[]> {
        return this.http
            .get(`${this.apiUrl}/?nome=${termo}`)
            // tslint:disable-next-line: deprecation
           .map((res: Response) => res.json().data as Contato[]);
    }
*/
}
