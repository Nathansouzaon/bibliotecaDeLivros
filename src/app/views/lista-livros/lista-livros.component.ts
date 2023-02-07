import { livroVolumeInfo } from './../../models/livroVolumeInfo';
import { Item, LivrosResultado } from './../../models/interfaces';
import {catchError, debounceTime, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { FormControl } from '@angular/forms';

const pausa = 1000;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(private service:LivroService) { }

                                      //observable faz a chamada ao servidor e traz os dados mapeados
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(pausa),
    tap(() => console.log('Fluxo inicial')),
    filter((valorDigitado) => valorDigitado.length >= 3),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map(resultado => this.livrosResultado = resultado),
    map(resultado => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(erro => {
      console.log(erro);
      return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro Recarregue o site!'))
    })
  );

  livrosResultadoParaLivros(items: Item[]): livroVolumeInfo[] {
    //elementos do array
    //convertendo objeto e criar o objeto com as propriedades que eu queria
    return items.map(item =>{
      return new livroVolumeInfo(item);
    })
  }

}


//CALLBACK de inscrição por catch error quando nao queremos fazer nada com o erro
   //catch error captura o erro e voce se inscreve em outro observable com alguma mensagem de erro o throw error retorna um novo observable que emite um erro e termina o ciclo de vida
