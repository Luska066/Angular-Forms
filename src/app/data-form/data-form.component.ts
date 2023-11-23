import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadosBr } from '../shared/models/estados-br';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit{

  formulario!: FormGroup;
  cidades: any;
  estadosBR!: EstadosBr[];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService) {

  }
  ngOnInit(){

    this.dropdownService.getEstadosBR().subscribe((dados:any) => {
      this.estadosBR = dados
      console.log(dados);

    })

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [, Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento:[null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
    })
  });
}
verificaEmailInvalido() {
  if (this.formulario.controls['email'].errors) {
    return this.formulario.controls['email'].errors['email']
  }
}
verificaValidTouched(campo: string) {
  return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty) ? true : false;
}

  aplicaCssErro(campo:string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }


  populaDadosForm(dados:any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
    this.formulario.get('nome')?.setValue('Loiane')
  }



  consultaCEP() {
    let cep = this.formulario.get('endereco.cep')?.value
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      this.resetaDadosForm();
      this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe(
        (dados:any) => this.populaDadosForm(dados))
      ,((error:any) => alert('erro: '+ error));
    /* this.cepService.consultaCEP(cep)
      .subscribe((dados:any) => this.populaDadosForm(dados));*/
    }
  }






  onSubmit(){
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value)).subscribe(res => {
        console.log(res)
      },((error:any) => alert('erro: '+ error)));
  }else{
    console.log('vish...Formulario Inválido');
    this.verificaValidacoesForm(this.formulario)
  }
}

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle)
    }
    })
  }

  cancelar(){
    this.formulario.reset();
  }
}



   /* this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      endereco: new FormGroup({

      })
    });*/
