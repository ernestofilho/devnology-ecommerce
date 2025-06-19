# Devnology E-commerce Backend

API backend desenvolvida em NestJS para o sistema de e-commerce da Devnology.

## Instalação

```bash
npm install
```

## Execução

```bash
# Desenvolvimento
npm start

# Watch mode
npm run start:dev

# Produção
npm run start:prod
```

## Build

```bash
npm run build
```

## Endpoints

### Produtos
- `GET /products` - Lista produtos
- `GET /products?search=termo` - Busca produtos
- `GET /products?provider=brazilian|european` - Filtra por fornecedor

### Pedidos
- `POST /orders` - Cria pedido
- `GET /orders` - Lista pedidos
- `GET /orders/:id` - Busca pedido por ID

