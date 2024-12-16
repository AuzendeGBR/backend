# API de Gerenciamento de Usuários e Serviços

Esta é uma API desenvolvida em Node.js utilizando TypeORM, MySQL e typescript para gerenciamento de usuários e serviços. Ela inclui funcionalidades como autenticação, autorização, criação e busca de dados no banco de dados.

## Requisitos

- Node.js v16.13.0 ou superior
- Banco de Dados MySQL
- npm ou yarn ou outro gerenciador de pacotes da sua preferência

## Configuração do Ambiente

1. Clone o repositório:

```bash
git clone 
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

3. Configure o arquivo `.env` com as variáveis de ambiente necessárias:

```env
DB_HOST=<host_do_banco>
DB_PORT=<porta_do_banco>
DB_USER=<usuario_do_banco>
DB_PASSWORD=<senha_do_banco>
DB_NAME=<nome_do_banco>
SECRET_KEY=<chave_secreta_para_token>
PORT=<porta_para_api>
```

4. Execute as migrações para criar as tabelas no banco de dados:

```bash
npm run typeorm migration:run
# ou
yarn typeorm migration:run
```

## Endpoints

### Autenticação

#### Login do Usuário

**POST** `/login`

**Corpo da requisição:**

```json
{
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

**Resposta:**

```json
{
  "user": {
    "id": 1,
    "nome_completo": "Usuário Exemplo",
    "email": "usuario@example.com",
    "tipo": "ADMIN"
  },
  "token": "<token_jwt>"
}
```

### Usuários

#### Criar Usuário

**POST** `/users`

**Corpo da requisição:**

```json
{
  "nome_completo": "João da Silva",
  "sexo": "MASCULINO",
  "cpf": "123.456.789-00",
  "celular": "(81) 98765-4321",
  "data_nascimento": "1990-05-15",
  "email": "joao.silva@example.com",
  "senha": "senhaSegura123",
  "tipo": "CLIENTE"
}
```

**Resposta:**

```json
{
  "message": "Usuário criado com sucesso.",
  "user": {
    "id": 1,
    "nome_completo": "João da Silva",
    "email": "joao.silva@example.com",
    "tipo": "CLIENTE",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Serviços

#### Criar Serviço

**POST** `/services`

**Corpo da requisição:**

```json
{
  "titulo": "Troca de óleo",
  "descricao": "Troca de óleo completo para veículos de passeio.",
  "preco": 250.50
}
```

**Resposta:**

```json
{
  "message": "Serviço criado com sucesso.",
  "service": {
    "id": 1,
    "titulo": "Troca de óleo",
    "descricao": "Troca de óleo completo para veículos de passeio.",
    "preco": 250.50,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Listar Todos os Serviços

**GET** `/services`

**Resposta:**

```json
[
  {
    "id": 1,
    "titulo": "Troca de óleo",
    "descricao": "Troca de óleo completo para veículos de passeio.",
    "preco": 250.50,
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "titulo": "Alinhamento e balanceamento",
    "descricao": "Serviço completo de alinhamento e balanceamento.",
    "preco": 180.00,
    "created_at": "2024-01-02T00:00:00.000Z"
  }
]
```

#### Buscar Serviço por ID

**GET** `/services/:id`

**Resposta:**

```json
{
  "id": 1,
  "titulo": "Troca de óleo",
  "descricao": "Troca de óleo completo para veículos de passeio.",
  "preco": 250.50,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

## Testando a API

Recomenda-se o uso de ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar os endpoints. Certifique-se de enviar o token JWT no cabeçalho das requisições protegidas:

**Authorization:** Bearer `<token_jwt>`

## Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor em modo de desenvolvimento com hot-reload
- **`npm run typeorm migration:create <nome>`**: Cria uma nova migração
- **`npm run typeorm migration:run`**: Executa as migrações no banco de dados

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests no repositório.

