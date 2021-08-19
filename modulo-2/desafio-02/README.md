# 💻 Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no ReactJS

Essa será uma aplicação já funcional onde o seu principal objetivo é realizar dois processos de migração: de Javascript para Typescript e de Class Components para Function Components.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

## Se preparando para o desafio

Para esse desafio, além dos conceitos vistos em aula utilizaremos o JSON server para criar uma Fake API com os dados das comidas.

### Fake API com JSON Server

Assim como utilizamos o MirageJS no módulo 2 para simular uma API com os dados das transações da aplicação dt.money, vamos utilizar o JSON Server para simular uma API que possui as informações das comidas. 

Navegue até a pasta criada, abra no Visual Studio Code e execute os seguintes comandos no terminal:

```bash
yarn
yarn server
```


Dessa forma, basta consumir essas rotas da API normalmente com o Axios. 

## O que devo editar na aplicação?

Com o template já clonado, as depêndencias instaladas e a [fake API rodando](https://www.notion.so/Desafio-02-Refactoring-de-classes-e-typescript-4571541e7f8c4799bd191b6cfb53802c), você deve editar os seguintes arquivos:

- src/components/Food/index.jsx;
- src/components/Food/styles.js;
- src/components/Header/index.jsx;
- src/components/Header/styles.js;
- src/components/Input/index.jsx;
- src/components/Input/styles.js;
- src/components/Modal/index.jsx;
- src/components/ModalAddFood/index.jsx;
- src/components/ModalAddFood/styles.js;
- src/components/ModalEditFood/index.jsx;
- src/components/ModalEditFood/styles.js;
- src/pages/Dashboard/index.jsx;
- src/pages/Dashboard/styles.js;
- src/routes/index.jsx;
- src/services/api.js;
- src/styles/global.js;
- src/App.js;
- src/index.js.

Todos esses arquivos devem ser migrados de Javascript para Typescript. Além disso, os arquivos que possuírem componentes em classe devem ser migrados para componentes funcionais.

## Preparando ambiente Typescript

Como esse é um projeto CRA sem TypeScript, você primeiro precisar instalar as dependências/tipagens e configurar o TS. Nossa sugestão é criar um novo projeto CRA com Typescript e comparar a estrutura atual com a que você precisa ter. Realizando essa comparação, facilmente você consegue ver que:

- É preciso instalar o `typescript`
- É preciso criar um arquivo de configuração `tsconfig.json`. Inclusive, você pode utilizar a configuração gerada automaticamente no CRA template Typescript para criar o seu arquivo.
- É preciso criar um arquivo `react-app-env.d.ts` com o conteúdo:

```tsx
/// <reference types="react-scripts" />
```

- É preciso instalar as tipagens das bibliotecas.

Configurando esse setup, você deve ser capaz de trabalhar normalmente com o Typescript no seu projeto.


