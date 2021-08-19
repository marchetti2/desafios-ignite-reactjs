# 💻 Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no ReactJS

Essa será uma aplicação onde o seu principal objetivo é criar um blog do zero. Você vai receber uma aplicação praticamente em branco que deve consumir os dados do Prismic e ter a interface implementada conforme o layout do Figma. Você terá acesso a diversos arquivos para implementar:

- Estilizações global, comun e individuais;
- Importação de fontes Google;
- Paginação de posts;
- Cálculo de tempo estimado de leitura do post;
- Geração de páginas estáticas com os métodos `getStaticProps` e `getStaticPaths`;
- Formatação de datas com `date-fns`;
- Uso de ícones com `react-icons`;
- Requisições HTTP com `fetch`;
- Entre outros.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

## O que devo editar na aplicação?

Com o template já clonado, as depêndencias instaladas e o Prismic já configurado, você deve completar onde não possui código com o código para atingir os objetivos de cada teste. Os documentos que devem ser editados são:

- [src/pages/_document.tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/_document.tsx);
- [src/pages/index.tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/index.tsx);
- [src/pages/home.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/home.module.scss);
- [src/pages/post/[slug].tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/post/%5Bslug%5D.tsx);
- [src/pages/posts/post.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/post/post.module.scss);
- [src/components/Header/index.tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/components/Header/index.tsx);
- [src/components/Header/header.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/components/Header/header.module.scss);
- [src/styles/global.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/styles/globals.scss);
- [src/styles/common.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/styles/common.module.scss).

### pages/_document.tsx

Nesse arquivo você deve configurar a importação da fonte `Inter` do Google Fonts. Os tamanhos utilizados são `Regular`, `Semi Bold` e `Bold`.

### pages/index.tsx

Nesse arquivo você deve renderizar todos os posts da paginação e exibir o botão `Carregar mais posts` caso existam mais posts a ser carregados (ou seja, o valor `next_page` retornado pela Prismic não pode ser `null`). Caso contrário, o botão não deve ser renderizado.

A logo `spacetraveling` deve ser exportada do Figma e salva na pasta `public` na raiz do seu projeto para a correta utilização. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

Ao clicar no post, é preciso navegar para a pagina do post seguindo o formato `/post/slugDoPost` onde `slugDoPost` é referente ao valor `slug` retornado pelo Prismic.

Por fim, a sua página deve ser gerada estaticamente. Isso significa que você deve utilizar o `getStaticProps` para buscar os dados do Prismic e popular a sua prop `postsPagination` exatamente como deixamos na estrutura de interfaces. Nesse método é obrigatório utilizar o [query](https://prismic.io/docs/technologies/query-a-single-type-document-javascript) do Prismic.

### pages/home.module.scss

Nesse arquivo você deve implementar toda a estilização da página principal.

### pages/post/[slug].tsx

Nesse arquivo você deve renderizar toda a informação do post e o component `Header`.

O tempo estimado de leitura deve ser calculado manualmente por você. Mas não se assuste, a ideia é simples. Basicamente você deve calcular todas as palavras dentro do texto do seu post, dividir pela média de palavras que um ser humano lê por minuto e arredondar para cima. Para esse desafio, utilize que o ser humano leia, em média, 200 palavras por minuto. Então se o seu texto possuir 805 palavras, você irá dividir por 200 e arredondar o resultado para cima, chegando assim no valor de 5 minutos estimados para leitura do post.

Agora no aspecto do código, você deve iterar no array da propriedade `content` para buscar a quantidade de palavras de cada seção (`heading` e `body`).

Para calcular o tempo estimado de leitura, sugerimos utilizar o método `reduce` para iterar o array `content`, o método `PrismicDOM.RichText.asText` para obter todo o texto do `body` e utilizar o método `split` com uma `regex` para gerar um array de palavras.

A logo `spacetraveling` deve ser exportada do Figma e salva na pasta `public` na raiz do seu projeto para a correta utilização. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

A sua página deve ser gerada estaticamente. Isso significa que você deve utilizar o `getStaticProps` para buscar os dados do Prismic e popular a sua prop `post` exatamente como deixamos na estrutura de interfaces. Nesse método é obrigatório utilizar o [getByUID](https://prismic.io/docs/technologies/query-helper-functions-javascript#getbyuid) do Prismic.

Além disso, você deve utilizar o `getStaticPaths` para gerar as páginas estáticas de alguns posts e setar o `fallback` como `true` para que o restante seja gerado no momento da requisição. Nesse método é obrigatório utilizar o [query](https://prismic.io/docs/technologies/query-a-single-type-document-javascript) do Prismic.

Por fim, nos casos que cairem no `fallback`, é **obrigatório** que você renderize pelo menos um texto na tela dizendo `Carregando...` para que o teste consiga verificar esses casos corretamente.

Caso tenha dúvidas em relação ao fallback, dê uma olhada aqui:

[Basic Features: Data Fetching | Next.js](https://nextjs.org/docs/basic-features/data-fetching#fallback-pages)

### posts/post.module.scss

Nesse arquivo você deve implementar toda a estilização da página de post.

### components/Header/index.tsx

Nesse arquivo você deve renderizar a logo `spacetraveling`. 

Ela deve ser exportada do Figma e salva na pasta `public` na raiz do seu projeto para a correta utilização. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

Por fim, ao clicar na logo é preciso navegar para a página principal `/`.

### components/Header/header.module.scss

Nesse arquivo você deve implementar toda a estilização do Header da aplicação.

### styles/global.scss

Nesse arquivo você deve implementar toda a estilização global da sua aplicação (ex.: variáveis das cores do seu projeto).

### styles/common.module.scss

Nesse arquivo você deve implementar toda a estilização comum entre os arquivos das suas páginas (ex.: largura máxima).

## Especificação dos testes

Em cada teste, tem uma breve descrição no que sua aplicação deve cumprir para que o teste passe.

Caso você tenha dúvidas quanto ao que são os testes, e como interpretá-los, dê uma olhada em **[nosso FAQ](https://www.notion.so/FAQ-Desafios-ddd8fcdf2339436a816a0d9e45767664)**

Para esse desafio, temos os seguintes testes:

[Teste components/Header/index.tsx](https://www.notion.so/Teste-components-Header-index-tsx-e660ffcf817f43b1863e88e46361a12c)

[Testes pages/Home/index.tsx](https://www.notion.so/Testes-pages-Home-index-tsx-92311ae2694e48eaa8d9addda3afaed9)

[Testes pages/post/[slug].tsx](https://www.notion.so/Testes-pages-post-slug-tsx-4fd06de1728c4abda14d092da382c1df)
