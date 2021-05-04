import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from 'src/app/shared/services.service';
import { Endereco } from 'src/app/_models/endereco';
import { Uf } from 'src/app/_models/uf';
import { Cidade } from 'src/app/_models/cidade';
import { Empresa } from 'src/app/_models/empresa';

@Component({
  selector: 'app-find-cep',
  templateUrl: './find-cep.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./find-cep.component.scss'],
})
export class FindCepComponent implements OnInit {
  title = 'Consulta CEP';

  public cep!: number;
  public cnpj!: number;
  public cidade!: string;
  public uf!: string;
  public rua!: string;
  endereco!: Endereco;
  empresa!: Empresa;
  public cepDiv!: boolean;
  public cidadeDiv!: boolean;
  public cnpjDiv!: boolean;

  public ruaInvalid!: boolean;

  ufs!: Uf[];
  cidades!: Cidade[];
  enderecos!: Endereco[];
  empresas!: Empresa[];
  msg_erro: any;

  error_consult_cep = 'Não foi encontrado endereço para o CEP: %';
  error_consult_city = 'Não foi encontrado endereço para a rua: %';

  constructor(private services: ServicesService) {}

  ngOnInit(): void {
    this.cepDiv = true;
    this.endereco = new Endereco();
    this.empresa = new Empresa();

    this.services.getUFList().subscribe(
      (data: Uf[]) => {
        this.ufs = data;
        this.ufs.sort((a, b) => a.sigla.localeCompare(b.sigla));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    if (this.cidadeDiv === true) {
      this.enderecos = [];
      this.ruaInvalid = false;
      /*console.log(
        'Consulta: Cidade: ' +
          this.cidade +
          ' UF: ' +
          this.uf +
          ' Rua: ' +
          this.rua
      );*/

      this.services
        .getEnderecoList(this.uf, this.cidade.replace(' ', '%20'), this.rua)
        .subscribe(
          (data: Endereco[]) => {
            // console.log(data);
            if (data.length === 0) {
              this.msg_erro = this.error_consult_city.replace(
                '%',
                '' + this.rua
              );
              this.ruaInvalid = true;
            }
            this.enderecos = data;
            this.enderecos.sort((a, b) =>
              a.logradouro.localeCompare(b.logradouro)
            );
          },
          (err) => {
            console.log(err);
          }
        );
    }



    if(this.cnpjDiv === true){
      this.services.getCnpj(this.cnpj).subscribe( (data) => {
        this.empresa = data;
        this.empresa.city = data.address.city
        this.empresa.state = data.address.state
        this.empresa.details = data.address.details
        this.empresa.zip = data.address.zip
        console.log(data);
      })
    } else {
      this.endereco = new Endereco();
      this.buscarCEP();
    }
  }

  changeTipo(tipo: number) {
    this.endereco = new Endereco();
    this.enderecos = [];
    this.ruaInvalid = false;

    if (tipo === 1) {
      this.cepDiv = true;
      this.cidadeDiv = false;
      this.cnpjDiv = false;
    }
    if (tipo === 2) {
      this.cidadeDiv = true;
      this.cepDiv = false;
      this.cnpjDiv = false;
    }
    if (tipo === 3){
      this.cidadeDiv = false;
      this.cepDiv = false;
      this.cnpjDiv = true;
    }
  }

  setCidade(uf: string) {
    // console.log(uf)

    this.services.getCidadeList(uf).subscribe(
      (data: Cidade[]) => {
        this.cidades = data;
        this.cidades.sort((a, b) => a.nome.localeCompare(b.nome));
      },
      (error) => console.log(error)
    );
  }

  buscarCEP() {
    // console.log("CEP consultado: " + this.cep);

    this.services.getCEP(this.cep).subscribe(
      (data) => {
        // console.log(data)
        this.endereco = data;
        if (this.endereco.erro === true) {
          this.msg_erro = this.error_consult_cep.replace('%', '' + this.cep);
        }
      },
      (error) => console.log(error)
    );
  }
}
