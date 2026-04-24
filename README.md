# 🍳 Receitas App - Gestão Inteligente da Cozinha

[![ToolCenter Integrated](https://img.shields.io/badge/IAM-ToolCenter-blue?style=for-the-badge)](https://github.com/fabianofern/toolcenter)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Uma solução fullstack moderna para gestão de receitas, planejamento alimentar e controle de estoque, agora totalmente integrada ao ecossistema **ToolCenter IAM**.

## 🚀 Sobre o Projeto

O **Receitas App** nasceu da necessidade de centralizar o planejamento doméstico. Ele permite não apenas guardar suas receitas favoritas, mas planejar sua semana, gerar listas de compras inteligentes baseadas no que você já tem no armário e até calcular o custo real de cada prato.

### Principais Funcionalidades

-   🔐 **Autenticação SSO:** Integração nativa com o **ToolCenter IAM** para login seguro e centralizado.
-   📋 **Planejamento Semanal:** Calendário dinâmico para organizar suas refeições.
-   📦 **Controle de Estoque:** Gerencie o que você tem em casa e receba alertas de validade.
-   🛒 **Lista de Compras Automática:** Gere listas baseadas no seu planejamento e estoque real.
-   💰 **Cálculo de Custos:** Saiba exatamente quanto custa cada receita com base nos preços de mercado.
-   👨‍🍳 **Modo Cozinha:** Interface otimizada para uso em tablets/celulares enquanto cozinha (com timer e Wake Lock).
-   📱 **PWA:** Instalável no seu celular para acesso rápido e modo offline.

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** & **Express**
- **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **ToolCenter SDK** (Autenticação JWT/JWKS)
- **Zod** (Validação de schemas)

### Frontend
- **React 18** & **Vite**
- **Tailwind CSS** & **shadcn/ui**
- **Zustand** (Gestão de estado)
- **React Router DOM v6**

## ⚙️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- Docker & Docker Compose
- Instância do **ToolCenter IAM** rodando

### Passo a Passo

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/fabianofern/receitas-app.git
    cd receitas-app
    ```

2.  **Instalar dependências:**
    ```bash
    npm install
    ```

3.  **Configurar Banco de Dados:**
    ```bash
    # Sobe o container PostgreSQL
    npm run db:up
    ```

4.  **Variáveis de Ambiente:**
    Crie arquivos `.env` na raiz e nas pastas `apps/api` e `apps/web` seguindo os modelos `.env.example`.
    > ⚠️ Certifique-se de configurar a `TOOLCENTER_JWKS_URL` corretamente para a integração de autenticação.

5.  **Migrações e Dados Iniciais:**
    ```bash
    npm run db:migrate
    npm run db:seed
    ```

6.  **Iniciar Desenvolvimento:**
    ```bash
    npm run dev
    ```

Acesse o frontend em `http://localhost:3000` e a API em `http://localhost:3001`.

## 📂 Estrutura do Monorepo

```text
receitas-app/
├── apps/
│   ├── api/          # Backend Express + Prisma
│   └── web/          # Frontend React + Vite
├── packages/         # (Futuro) Componentes compartilhados e tipos
└── docker-compose.yml # Infraestrutura local
```

## 📄 Licença

Este projeto é de uso privado. Todos os direitos reservados.

---
Desenvolvido por [Fabiano](https://github.com/fabianofern)
