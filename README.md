# Projeto: Desenvolvimento Orientado a Testes (TDD)

## 📌 Sobre o Desafio
Este projeto faz parte do módulo de TDD do curso Full Cycle 4.0 e tem como objetivo implementar testes seguindo a metodologia de Desenvolvimento Orientado a Testes (TDD).

O sistema é um gerenciador de reservas de propriedades e deve conter testes unitários e testes end-to-end para validar corretamente as funcionalidades.

## 🚀 Como Rodar o Projeto

### 1️⃣ Pré-requisitos
Antes de iniciar, certifique-se de ter instalado:
- **Node.js** versão **20+**
- **Gerenciador de pacotes npm** (instalado automaticamente com o Node.js)

### 2️⃣ Clonando o repositório
Utilize o repositório como base para o projeto na branch `main`:
```sh
git clone https://github.com/LPicinin/fc4-tdd.git
cd fc4-tdd
```

### 3️⃣ Instalando dependências
Após clonar o repositório, instale as dependências do projeto:
```sh
npm install
```

### 4️⃣ Executando os testes
Para rodar todos os testes do projeto, utilize o comando:
```sh
npm run test
```


## 🧪 Testes Implementados
### ✅ 1. Testes Unitários nos Mappers

#### **Arquivos de teste a criar:**

- src/infrastructure/persistence/mappers/property_mapper.test.ts
- src/infrastructure/persistence/mappers/booking_mapper.test.ts

#### **Tarefas:**

- Criar testes para validar as funções toDomain e toPersistence dos mappers de Property e Booking
- Validar se os mappers convertem os objetos corretamente
- Adicionar cenários onde os campos obrigatórios estão ausentes e validar se a exceção correta é lançada


### ✅ 2. Testes E2E de Criação de Usuário (Guest)

#### **Arquivo de teste a criar:**

- src/infrastructure/web/user_controller_e2e.test.ts

#### **Tarefas:**

- Criar testes end-to-end para o endpoint POST /users
- Implementar o método createUser em src/application/services/user_service.ts
- Validar que o endpoint cria o usuário corretamente e retorna as mensagens de erro apropriadas com o código HTTP correto


### ✅ 3. Testes E2E de Criação de Propriedade

#### **Arquivo de teste a criar:**

- src/infrastructure/web/property_controller_e2e.test.ts

#### **Tarefas:**

- Criar testes end-to-end para o endpoint POST /properties
- Implementar o método createProperty em src/application/services/property_service.ts
- Implementar a validação do atributo basePricePerNight, que obrigatoriamente deve ter um valor maior que 0 (src/domain/entities/property.ts)
- Validar que o endpoint cria a propriedade corretamente e retorna as mensagens de erro apropriadas com o código HTTP correto

### ✅ 4. Testes de Políticas de Reembolso (RefundRuleFactory)

#### **Arquivo de teste a criar:**

- src/domain/cancelation/refund_rule_factory.test.ts

#### **Tarefas:**

- Criar testes unitários para validar o comportamento da fábrica RefundRuleFactory
- Validar os diferentes cenários de decisão baseados no número de dias até o check-in

### ✅ 5. Testes de Cancelamento de Reserva

#### **Arquivo de teste existente:**

- src/application/services/booking_service.test.ts

#### **Tarefas:**

- Adicionar um teste para garantir que o sistema retorne um erro ao tentar cancelar uma reserva inexistente