Numa busca dinâmica, é interessante que a requisição seja feita apenas quando houver uma pausa na digitação, o que indica que a pessoa usuária terminou de informar o termo que queria no campo de busca. Para isso, podemos utilizar o operador debounceTime.


Exato, assim evitamos requisições intermediárias desnecessárias. Esse operador reemite o último valor após um tempo determinado para diminuir a quantidade de requisições ao servidor, esperando até que a pessoa pare de digitar.



É importante salientar que o operador distincUntilChanged compara o valor atual com o valor imediatamente anterior e não com valores passados já informados.
