import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrlCnpj = environment.baseUrlCnpj;
  baseUrlCep = environment.baseUrlCep;
  baseUrlUf = environment.baseUrlUf;
  chaveApiCnpj = environment.chaveApiCnpj;



  constructor(
    private http: HttpClient,
    ) { }

  getCEP(cep: number): Observable<any> {
    return this.http.get(`${this.baseUrlCep}${cep}/json/`);
  }

  getUFList(): Observable<any> {
    return this.http.get(`${this.baseUrlUf}`)
  }

  getCnpj(cnpj: number): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': `${this.chaveApiCnpj}`,
    });


    return this.http.get(`${this.baseUrlCnpj}${cnpj}`, {headers: headers});
  }

  getCidadeList(uf: string): Observable<any> {
    return this.http.get(`${this.baseUrlUf}/${uf}/distritos`);
  }

  getEnderecoList(uf: string, localidade: string, logradouro: string ): Observable<any> {
    return this.http.get(`${this.baseUrlCep}${uf}/${localidade}/${logradouro}/json/`);
  }
}
