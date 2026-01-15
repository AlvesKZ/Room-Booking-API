 Room Booking REST API

Uma API REST desenvolvida com Node.js e TypeScript para gerenciar reservas de salas, criada como projeto de estudo prático com foco em arquitetura de software e fundamentos avançados de TypeScript.

O sistema simula um cenário real utilizado em empresas, universidades e espaços de coworking, onde é possível cadastrar salas e realizar reservas respeitando regras de negócio e restrições de horário.

 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de aprofundar o entendimento e a aplicação prática de:

Tipagem estática com TypeScript

Interfaces e contratos entre camadas

Uso de Generics em cenários reais

Programação assíncrona com async/await

Organização limpa e escalável de projetos backend

Separação de responsabilidades (Routes, Controllers, Services e Repositories)

Princípios de design de APIs REST

 Domínio da Aplicação
 Room (Sala)

Representa uma sala física que pode ser reservada.

Atributos principais:

id

name

capacity

resources

active

 Booking (Reserva)

Representa uma reserva de uma sala em um intervalo de tempo específico.

Atributos principais:

id

roomId

startTime

endTime

createdAt

 Stack Utilizada

Node.js — Runtime JavaScript

TypeScript — Tipagem estática e segurança em tempo de desenvolvimento

Express — Framework HTTP minimalista

UUID — Geração de identificadores únicos

Day.js — Manipulação e validação de datas

Armazenamento em memória — Foco total na lógica e arquitetura, sem dependência de banco de dados

 Estrutura do Projeto
src/
 ├── server.ts
 ├── app.ts
 ├── routes/
 │    ├── room.routes.ts
 │    └── booking.routes.ts
 ├── controllers/
 │    ├── room.controller.ts
 │    └── booking.controller.ts
 ├── services/
 │    ├── room.service.ts
 │    └── booking.service.ts
 ├── repositories/
 │    ├── room.repository.ts
 │    └── booking.repository.ts
 ├── interfaces/
 │    ├── room.interface.ts
 │    ├── booking.interface.ts
 │    └── repository.interface.ts
 ├── dtos/
 │    ├── create-room.dto.ts
 │    ├── update-room.dto.ts
 │    └── create-booking.dto.ts
 └── utils/
      ├── api-response.ts
      └── date-validator.ts

 Organização das Camadas

Routes
Definem apenas os endpoints HTTP e seus métodos.

Controllers
Lidam com request e response, validam entradas e delegam a lógica.

Services
Contêm as regras de negócio e orquestram o fluxo da aplicação.

Repositories
Abstraem o acesso aos dados, permitindo fácil troca da fonte de persistência.

Interfaces
Definem contratos claros entre as camadas, garantindo baixo acoplamento.

DTOs
Controlam e validam os dados de entrada da API.

Utils
Contêm funções reutilizáveis e genéricas.

Essa separação melhora manutenção, testabilidade e evolução futura do sistema.

 Funcionalidades

Criar, listar, atualizar e desativar salas

Criar reservas com validação de horário

Impedir reservas sobrepostas para a mesma sala

Validar intervalos de tempo (datas passadas, períodos inválidos)

Respostas padronizadas utilizando Generics

Separação clara entre erros técnicos e violações de regras de negócio

 Programação Assíncrona

Todas as operações nas camadas de services e repositories são assíncronas, simulando o comportamento de um banco de dados real e reforçando o uso correto de:

Promises

async/await

Tratamento de erros com try/catch

Propagação controlada de erros entre camadas

 Aprendizados

O desenvolvimento deste projeto proporcionou experiência prática com:

Padrões reais de TypeScript

Arquitetura backend limpa e escalável

Tipagem forte em todas as camadas

Design de APIs orientadas a regras de negócio

Preparação de código para crescimento em ambiente de produção