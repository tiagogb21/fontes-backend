
obs.: é necessário ter um redis-server executando na máquina.

Para isso:

```bash
  sudo apt-get install redis-server
```

Crie um arquivo .env dados sugeridos:
```bash
PORT=8080
NODE_ENV=development

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin123456
POSTGRES_DB=typeorm_postgres
```

# Project Manager - Backend

## Tecnologias:

<ol>
  <li>TypeORM</li>
  <li>PostgreSQL</li>
  <li>TypeScript</li>
  <li>bcrypt</li>
  <li>jsonwebtoken</li>
</ol>
  
## Objetivo:

CRUD de projetos

## 

## Testes:

Utilizou-se a biblioteca jest

### Gerar migrations:
```bash
  npm run migration:generate
```

### Rodar migrations:
```bash
  npm run migration:run
```


### Rodar o projeto:

```bash
  npm start
```
### Rodar os testes:

```bash
  npm test
```
