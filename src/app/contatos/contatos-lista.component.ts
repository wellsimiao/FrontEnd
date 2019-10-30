import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogSerivce } from '../dialog.service';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line: component-selector
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit {

    contatos: Contato[];

    constructor(private contatoService: ContatoService,
                private dialogService: DialogSerivce
    ) {}

    ngOnInit(): void {
        this.contatoService.getContatos()
        .then((contatos: Contato[]) => {
            this.contatos = contatos;
        }).catch(err => console.log(err));
    }

    onDelete(contato: Contato): void {
        this.dialogService.confirm('Deseja deletar ' + contato.nome + '?')
        .then((canDelete: boolean) => {
            if (canDelete) {
                this.contatoService.delete(contato)
                    .then(() => {
                        // tslint:disable-next-line: triple-equals
                        this.contatos = this.contatos.filter(c => c.id != contato.id);
                    }).catch(err => {
                        console.log(err);
                    });
            }
        });
    }

}
