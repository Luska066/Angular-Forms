import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBR(){
    return this.http.get('assets/dados/estadosbr.json')
  }
  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev PL'},
      {nome: 'Dev', nivel: 'Sênior', desc: 'Dev Sr'}
    ]
  }
  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'Javascript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'},
    ]
  }
  getNewsletter(){
    return [
      { valor:'s', desc: 'Sim' },
      { valor:'n', desc: 'Nao' }
    ]
  }
}
