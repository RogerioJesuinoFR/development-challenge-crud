# CRUD Web - Estágio Desenvolvimento

Projeto de CRUD (Create / Read / Update / Delete) desenvolvido para o desafio de estágio em desenvolvimento na empresa Medcloud.

## Visão Geral

O projeto consiste em uma aplicação web para realizar operações em determinados dados de pacientes.
Incluindo as funcionalidades de:
- Cadastro: Cadastro de novos pacientes.
- Visualização: Visualização em lista dos pacientes cadastrados.
- Edição: Atualização de dados de pacientes já cadastrados.
- Exclusão: Exclusão de pacientes cadastrados.

## Estrutura do Projeto

- Back-end: Node.js com Express
- Front-end: React.js com Material-UI
- Banco de Dados: MySQL
- Docker: Para containerização do projeto

## Pré-requisitos

Antes de utilizar o projeto, precisará ter instalado em sua máquina:
- Git
- Docker
- Docker Compose
- Node.js e npm

## Instruções de Instalação

1. Clone o repositório
2. Navegue até a pasta raiz do back-end do projeto: 'medcloud-desafio'
3. Instale as dependências com o comando 'npm install'
4. Altere o arquivo '.env' com as informações do banco de dados configuradas por você
5. Navegue até a pasta raiz do front-end do projeto: 'medcloud-desafio-interface'
6. Instale as dependências com o comando 'npm install'
7. Altere o arquivo 'docker-compose.yml' com as informações referentes ao banco de dados

## Execução da aplicação

- Construa e inicie os containers
comandos úteis:
docker-compose up --build
docker-compose up -d
- Inicie o back-end da aplicação utilizando o comando 'node app.js'
- Inicie o front-end da aplicação utilizando o comando 'npm start'

## Funcionalidades

- Adição de pacientes: Há um formulário para ser preenchido com os dados do paciente (Nome, E-mail, Data de nascimento e Endereço), após o preenchimento clique em 'Salvar'.
- Visualização de pacientes: Há um lista com as informações dos pacientes cadastrados.
- Edição de pacientes: Há um ícone ao lado das informações do paciente. Ao clicar, os campos do formulário são preenchidos com as informações do paciente, permitindo realizar a edição.
- Exclusão de pacientes: Há um ícone ao lado das informações do paciente, onde é possível remover o cadastro do paciente.

## Dúvidas ou sugestões

Para qualquer dúvida ou sugestão, entre em contato pelo email: 'rogerio.ferrazyyz@gmail.com'.
