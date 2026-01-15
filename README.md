#Room Booking REST API
Uma API REST desenvolvida com Node.js e TypeScript para gerenciar reservas de salas. O projeto foi criado como exercício prático de arquitetura de software e fundamentos de TypeScript.
A API simula um sistema de reserva de salas usado em empresas, universidades e espaços de coworking, onde é possível criar salas e fazer reservas respeitando restrições de horário e regras de negócio.
Por que fiz esse projeto
Queria praticar e entender melhor:

Tipagem estática do TypeScript
Interfaces e contratos
Generics em casos reais
Programação assíncrona com async/await
Organização limpa e escalável de projetos
Separação de responsabilidades (rotas, controllers, services, repositories)
Princípios de design de APIs REST

O que o sistema faz
Sala (Room)
Representa uma sala física que pode ser reservada.

id, name, capacity, resources, active

Reserva (Booking)
Representa uma reserva de sala em um período específico.

id, roomId, startTime, endTime, createdAt

Stack

Node.js – runtime JavaScript
TypeScript – tipagem estática
Express – framework HTTP minimalista
UUID – geração de IDs únicos
Day.js – manipulação de datas
Armazenamento em memória – para focar na lógica sem configurar banco de dados

Estrutura do projeto
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
Como as camadas funcionam

Routes: definem apenas os endpoints HTTP
Controllers: lidam com request/response
Services: contêm as regras de negócio
Repositories: abstraem o acesso aos dados
Interfaces: definem contratos entre camadas
DTOs: validam e controlam dados de entrada
Utils: lógica reutilizável e genérica

Essa separação facilita manutenção, testes e crescimento futuro do código.
Funcionalidades

Criar, listar, atualizar e desativar salas
Criar reservas com validação de horário
Impedir reservas sobrepostas para a mesma sala
Validar intervalos de tempo das reservas
Respostas padronizadas da API usando generics
Separação clara entre erros técnicos e violações de regras de negócio

Programação assíncrona
Todas as operações de services e repositories são assíncronas, simulando comportamento de banco de dados real e reforçando o uso correto de:

Promises
async/await
Tratamento de erros com try/catch
Propagação de erros entre camadas

O que poderia adicionar

Persistência com banco de dados real
Autenticação e autorização
Paginação e filtros
Testes unitários e de integração
Suporte Docker
Documentação da API com Swagger

O que aprendi
Completar esse projeto me deu experiência prática com:

Padrões reais de TypeScript
Arquitetura backend limpa
Tipagem forte em todas as camadas da aplicação
Design de APIs com regras de negócio
Preparar um código para crescer em produção