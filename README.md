
obs.: é necessário ter um redis-server executando na máquina.

Para isso:

```bash
  sudo apt-get install redis-server
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
