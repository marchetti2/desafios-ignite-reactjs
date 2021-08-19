# Desafio 02 - Adicionando features ao blog

## 💻 Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no ReactJS

Essa será uma aplicação onde o seu principal objetivo é adicionar features a um projeto já existente. Utilizaremos como base a solução desenvolvida por você do desafio obrigatório:

[Desafio 01 - Criando um projeto do zero](https://www.notion.so/Desafio-01-Criando-um-projeto-do-zero-b1a3645d286b4eec93f5f1f5476d0ff7)

Você deve implementar no projeto as seguintes features:

- Comentários com Utteranc;
- Preview do documento Prismic;
- Navegação entre post anterior e próximo;
- Informação de edição do post.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

## Template do Figma

Você vai utilizar o mesmo template do desafio:

[Desafio 01 - Criando um projeto do zero](https://www.notion.so/Desafio-01-Criando-um-projeto-do-zero-b1a3645d286b4eec93f5f1f5476d0ff7)

Porém dessa vez irá se basear na página `Complementar`

## Comentários com Utteranc

Uma funcionalidade essencial para blogs são os comentários. Por isso, utilizaremos o Utteranc para adicionar essa feature ao nosso projeto.

Basicamente, para realizar essa implementação, você precisa:

- Ter um repositório público no github com o Utteranc app instalado. Ele será o responsável por armazernar os comentários;
- Injetar o `script` do Utteranc com as configurações que deseja.

Para isso, sugerimos que vocês se baseem nas informações da documentação oficial para criar/configurar o repositório e script do Utteranc:

[utterances](https://utteranc.es/)

E nessa issue do repositório oficial sobre como implementar o Utteranc no React:

[example for react use · Issue #161 · utterance/utterances](https://github.com/utterance/utterances/issues/161)

## Preview do documento Prismic

Outra funcionalidade essencial é poder visualizar como a aplicação irá ficar sem ter que publicar as informações em produção no CMS. Por isso, iremos implementar o modo Preview no Next.js + Prismic para adicionar essa feature ao projeto.

Como essa funcionalidade vai precisar que façamos vários passos, vamos entendendo um por um em vez de passar direto para o código final.

1. A primeira coisa que você precisa fazer é criar uma `ACCESS_KEY` nas configurações do Prismic como visto em aula e passar esse valor para o seu cliente Prismic no momento da criação, exemplo:

    ```tsx
    import Prismic from '@prismicio/client';
    import { DefaultClient } from '@prismicio/client/types/client';

    export function getPrismicClient(req?: unknown): DefaultClient {
      const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
        req,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      });

      return prismic;
    }
    ```

2. Em seguida, você precisa configurar as `Previews` na sua API do Prismic. Em `Settings->Previews` configure a Preview com as seguintes informações:
    1. Site Name: Esse é o nome que você quer dar para essa Preview. É puramente estético, então coloque o que preferir (ex.: Development);
    2. Domain: Essa é a url que você quer renderizar a Preview. Como vocês estão trabalhando localmente na porta 3000, sugerimos colocar `http://localhost:3000`;
    3. Link Resolver: Essa é a rota da nossa API Next.js que vai receber a requisição e os query params para então retornar a url daquele documento. Como a ideia é criar um arquivo `api/preview.ts` informe o valor `/api/preview`.
3. O próximo passo é criar as rotas para iniciar e finalizar o modo Preview. Crie os arquivos `/api/preview.ts` e `/api/exit-preview.ts`. A ideia de cada arquivo é
    1. preview.ts: Receber a requisição da API do Prismic com as query params `documentID` e `token`, gerar a url, setar as informações do documento de acordo com o Preview e redirecionar o usuário para a url gerada;
    2. exit-preview.ts: Limpar as informações de Preview e redirecionar o usuário para a página principal.

    Para conseguir implementar essas funcionalidades, dê uma olhada nos trechos **[The preview.js file](https://prismic.io/docs/technologies/previews-nextjs)** e **[The exit-preview.js file](https://github.com/prismicio/nextjs-blog/tree/master/pages/api)** da documentação oficial.

    Perceba que no primeiro exemplo ele faz a importação do linkResolver. Você pode utilizar como linkResolver dentro do seu arquivo `preview.ts` a seguinte função:

    `import { Document } from '@prismicio/client/types/documents';
    function linkResolver(doc: Document): string {
      if (doc.type === 'posts') {
        return `/post/${doc.uid}`;
      }
      return '/';
    }`

4. Por fim, é preciso que as páginas da aplicação tratem essas informações do Preview corretamente. Para isso, no seu método `getStaticProps` você vai trabalhar com duas variáveis recebidas como argumento:
    1. preview: Uma variável booleana que você deve retornar dentro das props. Ela será utilizada para, caso esteja no modo Preview, renderizar o botão que irá chamar a rota `api/exit-preview.ts` para finalizar esse modo. É importante configurar o valor padrão dela como `false`;
    2. previewData: Uma variável que possui um cookie. Ela será repassada na propriedade `ref` dentro das opções das suas `queries` no Prismic.

    ```tsx
    export default function Home({
      ...,
      preview,
    }: HomeProps): JSX.Element {
    	...

    	return {
    		...

    		{preview && (
    			<aside>
    				<Link href="/api/exit-preview">
    			    <a>Sair do modo Preview</a>
    				</Link>
          </aside>
    		)}
    	}

    }

    export const getStaticProps: GetStaticProps<HomeProps> = async ({
      preview = false,
      previewData,
    }) => {
    	...
    	const postsResponse = await prismic.query(
    	    ...,
    	    {
    	      ...
    	      ref: previewData?.ref ?? null,
    	    }
    	  );

    	return {
    		props: {
    			...,
    			preview
    		}
    	}
    }
    ```

Com essas configurações, seu modo de Preview deve funcionar de acordo com o esperado. Caso ainda tenha dúvidas de como implementar, dê uma olhada na documentação oficial:

## Navegação entre post anterior e próximo

Você deve renderizar na página `post/[slug].tsx` links com a informação do título do post que, quando clicados, devem realizar a navegação até o post selecionado.

É necessário ter um link para o post diretamente mais antigo que o da página atual e um link para post diretamente mais recente que o da página atual (ou seja, os posts "vizinhos").

Além disso, você não deve exibir os links caso não existam posts mais antigos e/ou mais novos que o atual.

Por fim, você deve renderizar também uma linha divisória entre o final do conteúdo do post e os links.

## Informação se o post foi editado

Você deve renderizar na página `post/[slug].tsx` a informação de edição do post caso exista. Ela deve estar logo abaixo das informações de autor, data de criação e tempo estimado de leitura como mostrado no layout.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e0e3620-e2a1-4503-8cb7-46af7eb100cc/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e0e3620-e2a1-4503-8cb7-46af7eb100cc/Untitled.png)

Dica: Utilize o campo `last_publication_date` retornado pelo Prismic.

Aviso: Para formatação da data `last_publication_date`, recomendamos utilizar o date-fns já instalado no template. O uso do Intl pode não formatar corretamente e gerar problemas na correção automatizada pela plataforma.

