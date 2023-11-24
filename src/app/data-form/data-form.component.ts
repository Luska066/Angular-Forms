import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadosBr } from '../shared/models/estados-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit{

  formulario!: FormGroup;
  cidades: any;
  // estadosBR!: EstadosBr[];
  estadosBR!: EstadosBr[]
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];
  frameworks!: ['Angular', 'React', 'Vue', 'Sencha']




  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService) {

  }
  ngOnInit(){
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();
    // this.estadosBR = this.dropdownService.getEstadosBR()
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
    }),
    cargo: [null],
    tecnologias: [null],
    newsletter: ['s'],
    termos: [null, Validators.pattern('true')],
    frameworks: [null]
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

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      ?.subscribe(dados => { this.populaDadosForm(dados)})
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

  setarCargo(){
    const cargo =  {nome: 'Dev', nivel: 'Pleno', desc: 'Dev PL'}
    this.formulario.get('cargo')?.setValue(cargo)
  }
  setarTecnologia(){
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php'])
  }
  compararCargos(obj1:any, obj2:any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
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
