# Desafio 01 - Deploy do Ignews

## 💻 Sobre o desafio

Nesse desafio, você deverá fazer o deploy de uma das aplicações mais legais que vimos em toda a trilha do Ignite, o Ignews. Esse desafio tem o objetivo que você pratique o tópico de publicação de aplicações Web com uma aplicação real.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

# Pontos importantes do desafio

Para completar esse desafio, você vai ter que lembrar de detalhes bem específicos sobre o Ignews, como as configurações do next-auth, stripe, github e até mesmo o faunaDB.

## Configurando variáveis ambiente

As variáveis ambiente são as variáveis que quando desenvolvemos o ig.news, armazenamos no arquivo `.env.local`, elas são bem importantes pois são elas que "dizem" para o nosso código as chaves privadas de conexão com os serviços que citei acima.

Além disso, você tem que ficar atento à bibliotecas que precisem de alguma mudança quando são levadas para produção, uma delas é o próprio next-auth que pede que você configure uma variável a mais, a `NEXTAUTH_URL` , e essa variável deve conter como valor a URL da sua aplicação quando for feita o deploy, você pode ver sobre isso [por aqui.](https://next-auth.js.org/configuration/options)

## Configurar o GitHub

Uma coisa que você não pode esquecer é de configurar o oAuth do github para apontar para a nova URL da sua aplicação, depois do deploy.

Para isso você apenas precisa entrar na [página de configurações de desenvolvedor do github](https://github.com/settings/developers) e configurar a sua aplicação.

Nessa página basta você clicar no nome da sua aplicação ou criar uma nova para a sua aplicação em produção, e configurar as variáveis **Homepage URL** e **Authorization callback URL** para terem o valor atualizado com a URL da aplicação após o deploy. Um exemplo e como ficaria:

## Configurar o Stripe

Por fim, você apenas precisa lembrar de configurar os webhooks do stripe para apontar para a sua aplicação hospedada.

Em produção, não utilizamos a stripe-cli, e sim a própria dashboard do stripe para isso. Para isso basta ir na dashboard do stripe e ir até a aba Desenvolvedores e depois Webhooks e vai ter uma página para configurar seus endpoints.

# 🚀 Realizando o deploy

Agora é com você! Escolha a forma que você deseja treinar o seu deploy de acordo com o que foi visto em aula ou não, e coloque a publicação no ar! 
