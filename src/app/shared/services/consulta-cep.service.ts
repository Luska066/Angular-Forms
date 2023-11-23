import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

constructor(private http:HttpClient) { }

consultaCEP(cep:string) {
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      return this.http.get(`//viacep.com.br/ws/${cep}/json`);
    }
    return of({})
  }
}
