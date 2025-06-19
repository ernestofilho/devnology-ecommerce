# Devnology E-commerce

Este repositório contém a solução completa para o teste técnico de desenvolvedor fullstack da empresa Devnology. O projeto implementa uma aplicação de e-commerce que integra produtos de dois fornecedores via API, permitindo pesquisar, filtrar, adicionar ao carrinho e finalizar compras.

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js para construção de APIs escaláveis
- **TypeScript** - Linguagem de programação tipada
- **SQLite** - Banco de dados para persistência
- **TypeORM** - ORM para manipulação do banco de dados
- **Axios** - Cliente HTTP para consumo das APIs externas

### Frontend Web
- **React** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Linguagem de programação tipada
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/UI** - Componentes de interface modernos
- **Vite** - Build tool e servidor de desenvolvimento

### Mobile
- **Flutter** - Framework para desenvolvimento mobile multiplataforma
- **Dart** - Linguagem de programação do Flutter
- **Provider** - Gerenciamento de estado
- **HTTP** - Cliente para requisições à API

## 📁 Estrutura do Projeto

```
devnology-ecommerce/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── services/        # Lógica de negócio
│   │   ├── entities/        # Entidades do banco de dados
│   │   ├── dto/            # Data Transfer Objects
│   │   └── interfaces/     # Interfaces TypeScript
│   ├── package.json
│   └── ...
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   └── ...
│   ├── package.json
│   └── ...
├── mobile_app/            # Aplicação Flutter
│   ├── lib/
│   │   ├── models/        # Modelos de dados
│   │   ├── services/      # Serviços de API
│   │   ├── providers/     # Gerenciamento de estado
│   │   ├── screens/       # Telas da aplicação
│   │   └── widgets/       # Widgets reutilizáveis
│   ├── pubspec.yaml
│   └── ...
└── README.md
```

## 🔧 Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Flutter SDK (para o mobile)

### Backend (NestJS)

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor:
```bash
npm start
```

O backend estará disponível em `http://localhost:3001`

### Frontend (React)

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps # para ignorar conflitos de peerDependencies
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### Mobile (Flutter)

1. Navegue até a pasta do mobile:
```bash
cd mobile_app
```

2. Instale as dependências:
```bash
flutter pub get
```

3. Execute o aplicativo (com emulador/dispositivo conectado):
```bash
flutter run
```

**Nota:** Para testar o mobile com o backend local, certifique-se de que o backend esteja rodando e ajuste o IP no arquivo `lib/services/api_service.dart` se necessário.

## 📋 Funcionalidades Implementadas

### ✅ Obrigatórias
- [x] Interface web com React
- [x] Listagem de produtos vindos de dois fornecedores
- [x] Busca e filtro de produtos
- [x] Carrinho de compras (adicionar/remover)
- [x] Finalização da compra com formulário do cliente
- [x] Registro das compras
- [x] Aplicativo mobile Flutter

### ✅ Opcionais
- [x] Backend em NestJS
- [x] Endpoint unificado de produtos
- [x] Registro de compras no banco via API

## 🏗️ Arquitetura e Decisões Técnicas

### Backend
- **NestJS**: Escolhido por sua arquitetura modular, suporte nativo ao TypeScript e facilidade para criar APIs RESTful escaláveis
- **SQLite**: Banco de dados leve e fácil de configurar para desenvolvimento e testes
- **TypeORM**: ORM robusto que facilita a manipulação do banco de dados com TypeScript
- **Arquitetura em camadas**: Separação clara entre controllers, services e entities

### Frontend
- **React com TypeScript**: Combinação robusta para desenvolvimento de interfaces modernas e tipadas
- **Tailwind CSS + Shadcn/UI**: Permite desenvolvimento rápido com componentes consistentes e design system
- **Vite**: Build tool moderna que oferece desenvolvimento mais rápido que Create React App

### Mobile
- **Flutter**: Framework que permite desenvolvimento multiplataforma com uma única base de código
- **Provider**: Solução simples e eficaz para gerenciamento de estado
- **Arquitetura MVC**: Separação clara entre models, views e controllers

### Integração
- **API RESTful**: Comunicação padronizada entre frontend/mobile e backend
- **CORS habilitado**: Permite requisições do frontend para o backend
- **Tratamento de erros**: Implementado em todas as camadas da aplicação

## 🔗 APIs dos Fornecedores

O sistema consome dados de duas APIs externas:

- **Fornecedor Brasileiro**: `http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider`
- **Fornecedor Europeu**: `http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider`

## 📊 Endpoints da API

### Produtos
- `GET /products` - Lista todos os produtos
- `GET /products?search=termo` - Busca produtos por termo
- `GET /products?provider=brazilian|european` - Filtra por fornecedor
- `POST /products/refresh` - Atualiza cache de produtos

### Pedidos
- `POST /orders` - Cria um novo pedido
- `GET /orders` - Lista todos os pedidos
- `GET /orders/:id` - Busca pedido por ID

## 🧪 Testes

O projeto foi testado manualmente em todas as funcionalidades:
- Listagem de produtos de ambos os fornecedores
- Busca por produtos funcionando corretamente
- Filtros por fornecedor operacionais
- Carrinho de compras com adição/remoção de itens
- Finalização de compra com validação de formulário
- Persistência de pedidos no banco de dados

## 📝 Considerações Finais

Este projeto demonstra uma implementação completa de um e-commerce moderno, utilizando as melhores práticas de desenvolvimento e tecnologias atuais. A arquitetura permite fácil manutenção e escalabilidade, enquanto a separação clara de responsabilidades facilita futuras expansões.

---

**Desenvolvido por:** Ernesto Reis  
**Data:** Junho 2025  
**Teste Técnico:** Devnology

