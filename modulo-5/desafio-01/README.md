# 💻 Sobre o desafio

Nesse desafio você deverá performar uma aplicação React utilizando das ferramentas e dicas aprendidas durante o módulo **Performando apps com ReactJS**.

Se você fez o desafio opcional [Componentizando a aplicação](https://www.notion.so/Desafio-02-Componentizando-a-aplica-o-b9f0f025c95b437699d0c3115f55b0f1) deve lembrar que se trata de uma aplicação que exibe uma listagem de filmes por categoria com base na categoria selecionada e que esses dados vem de uma API (fake API com JSON Server).

Com essa aplicação componentizada, você deve aplicar os conceitos de performance no React para melhorar esse app.

---

*Mas eu não fiz o desafio opcional. Preciso fazer ele antes para conseguir fazer esse?*

Se você não fez o desafio opcional, não precisa voltar atrás para concluir ele antes de fazer esse (apesar de que prática nunca é demais 😉). Para isso, estará disponibilizado aqui um template com o código componentizado, de onde você pode partir para realizar esse desafio.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

## Se preparando para o desafio

Para esse desafio, além dos conceitos vistos em aula utilizaremos algumas coisa para deixar a nossa aplicação ainda melhor. Por isso, antes de ir diretamente para o código do desafio, explicaremos um pouquinho sobre Fake API com JSON Server (se você já entende o que é e como funciona o JSON Server, pode pular [para a próxima seção](https://www.notion.so/Desafio-01-Otimizando-a-aplica-o-2942004b422d455891756300d88d0b9a)).

### Fake API com JSON Server

Nesse desafio vamos utilizar o JSON Server para simular uma API que possui as informações de gêneros e filmes. 

Navegue até a pasta criada, abra no Visual Studio Code e execute os seguintes comandos no terminal:

```bash
yarn # instala as dependências
yarn server # inicia o servidor com o JSON Server na porta 3333
```

Perceba que ele iniciou uma fake API com os recursos `/genres` e `/movies` em `localhost` na porta `3333` a partir das informações do arquivo [server.json](https://github.com/danilo-vieira/ignite-template-otimizando-a-aplicacao/blob/main/server.json) localizado na raiz do seu projeto. 

Acessando essas rotas no seu navegador, você consegue ver o retorno das informações já em JSON (dando um clique duplo, a imagem se expandirá):

Dessa forma, basta consumir essas rotas da API normalmente com o Axios. 

Caso queira estudar mais sobre o **JSON Server**, dê uma olhada aqui:

[typicode/json-server](https://github.com/typicode/json-server)

## O que devo editar na aplicação?

Com o template já clonado, as dependências instaladas e a fake API rodando, você deve começar implementar as estratégias de otimização para a aplicação.

Aqui estão os dois principais arquivos que devem ser editados:

- **[src/App.tsx](https://github.com/danilo-vieira/ignite-template-otimizando-a-aplicacao/blob/main/src/App.tsx)**
Esse é o componente principal da aplicação e contém toda a lógica da aplicação como chamadas à API e controle de estados dos componentes Content e SideBar.
- **[src/components/Content.tsx](https://github.com/danilo-vieira/ignite-template-otimizando-a-aplicacao/blob/main/src/components/Content.tsx)**
Esse componente, possui toda a lógica e corpo responsável pelo header e conteúdo da aplicação

- **[src/components/SideBar.tsx](https://github.com/danilo-vieira/ignite-template-otimizando-a-aplicacao/blob/main/src/components/SideBar.tsx)**
Esse componente possui toda a lógica e corpo responsável pela seção que contém o título do site e a parte de navegação à esquerda da página

Se você preferir, pode também componentizar algumas outras partes da aplicação como, por exemplo, o header, mas esse não está como requisito deste desafio 🚀

## Dicas

Lembre-se de usar corretamente as funcionalidades do React para prover mais performance para a aplicação:

memo;

useMemo;

useCallback;

Virtualização.

Mesmo que a aplicação não precise de alguns pontos de otimização, sinta-se livre para usar as ferramentas a sua disposição como forma de aprendizado mas continue tomando cuidado com otimizações desnecessárias ao trabalhar com algum projeto real 💜.


