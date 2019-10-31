import { ContatoService } from './contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {
  [x: string]: any;

  allContato: Contato[];
  statusCode: number;
  requestProcessing = false;
  contatoIdToUpdate = null;
  processValidation = false;

  contatoForm = new FormGroup({

  });
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private ContatoService: ContatoService) { }

  ngOnInit(): void {
    this.getAllcontato();
  }
  getAllcontato() {
    this.contatoService.getAllcontato()
      .subscribe(
        data => this.getAllcontato = data,
        errorCode => this.statusCode = errorCode);

  }
  onContatoFormSubmit() {
    this.processValidation = true;
    if (this.contatoForm.invalid) {
      return;
    }
    // Form is valid, now perform create or update
    this.preProcessConfigurations();
    const nome = this.contatoForm.get('nome').value.trim();
    const telefone = this.contatoForm.get('telefone').value.trim();
    const email = this.contatoForm.get('email').value.trim();
    if (this.contatoIdToUpdate === null) {
      // Handle create contato
      const contato = new Contato(null, nome, telefone, email);
      this.contatoService.createContato(contato)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllcontato();
          this.backToCreatecontato();
        },
          errorCode => this.statusCode = errorCode);
    } else {
      // Handle update contato
      const contato = new Contato(this.contatoIdToUpdate, nome, telefone, email);
      this.contatoService.updateContato(contato)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllcontatos();
          this.backToCreatecontato();
        },
          errorCode => this.statusCode = errorCode);
    }
  }
  // Load contato by id to edit
  loadContatoToEdit(id: string) {
    this.preProcessConfigurations();
    this.contatoService.getContatoById(id)
      .subscribe(contato => {
        this.contatoIdToUpdate = contato.contatoId;
        this.contatoForm.setValue({ nome: contato.nome, telefone: contato.telefone, email: contato.email });
        this.processValidation = true;
        this.requestProcessing = false;
      },
        errorCode => this.statusCode = errorCode);
  }
  // Delete contato
  deleteContato(id: string) {
    this.preProcessConfigurations();
    this.contatoService.deleteContato(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllcontatos();
        this.backToCreatecontato();
      },
        errorCode => this.statusCode = errorCode);
  }
  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  // Go back from update to create
  backToCreatecontato() {
    this.contatoIdToUpdate = null;
    this.contatoForm.reset();
    this.processValidation = false;
  }
}
