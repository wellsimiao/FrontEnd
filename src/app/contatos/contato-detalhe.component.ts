import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ContatoService } from './contato.service';
import { Contato } from './contato.model';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line: component-selector
    selector: 'contato-detalhes',
    templateUrl: 'contato-detalhe.component.html'
})
export class ContatoDetalheComponent implements OnInit {

    contato: Contato;
    private isNew = true;

    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.contato = new Contato(0, '', '', '');
        this.route.params.forEach((params: Params) => {
            const id: number = +params.id;

            if (id) {
                this.isNew = false;
                this.contatoService.getContato(id)
                    .then((contato: Contato) => {
                        this.contato = contato;
                    });
            }
        });
    }

    onSubmit(): void {
        let promise;

        if (this.isNew) {
            console.log('CADASTRANDO');
            promise = this.contatoService.create(this.contato);
        } else {
            console.log('ALTERANDO');
            promise = this.contatoService.update(this.contato);
        }

        promise.then((contato: any) => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
