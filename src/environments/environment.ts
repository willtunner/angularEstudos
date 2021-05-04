// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrlCnpj: 'https://api.cnpja.com.br/companies/',
  baseUrlCep: 'https://viacep.com.br/ws/',
  baseUrlUf: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  chaveApiCnpj: '96743b31-f1d0-4614-8e30-7927601bbdd6-40ca6d52-d7f1-41ad-a19a-6aef8a6139ec'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
