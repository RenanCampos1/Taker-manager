Projeto Talker-Manager
Contexto

Esta API fornece uma solução moderna e avançada para o gerenciamento de informações de pessoas, desenvolvida com o framework Express e a linguagem de programação Node.js. Ela oferece uma variedade de recursos para realizar as operações CRUD (Criar, Ler, Atualizar e Deletar) de forma eficiente e segura.

Com esta API, é possível facilmente realizar operações de pesquisar, cadastrar, editar e excluir pessoas cadastradas, garantindo assim a organização e segurança dos dados. O armazenamento dos dados é feito através do uso do módulo fs, que escreve em um arquivo Json, proporcionando uma implementação simples e rápida para a necessidade. Além disso, é possível acessar a documentação construída no swagger disponível na rota "/doc" para uma melhor compreensão e utilização da API.
Tecnologias usadas

Back-end:

    Node.js

    Express

    Docker

Executando aplicação
Instalação com docker

    Rode o serviço node com o comando:

    docker-compose up -d

Esse serviço irá inicializar um container chamado talker_manager

    Use o comando:

    docker exec -it talker_manager bash

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano

    Instale as dependências com (comando utilizado dentro do container docker) :

    npm install

    Execute a aplicação com (comando utilizado dentro do container docker) :

    npm start ou npm run dev

Instalação local

    Instale as dependências com (comando utilizado dentro do container docker) :

    npm install

    Execute a aplicação com (comando utilizado dentro do container docker) :

    npm start ou npm run dev

Para rodar o projeto desta forma, obrigatoriamente você deve ter o node instalado em seu computador
