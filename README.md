# \ud83c\udf73 Receitas App - Gest\u00e3o Inteligente da Cozinha

[![ToolCenter Integrated](https://img.shields.io/badge/IAM-ToolCenter-blue?style=for-the-badge)](https://github.com/fabianofern/toolcenter)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Uma solu\u00e7\u00e3o fullstack moderna para gest\u00e3o de receitas, planejamento alimentar e controle de estoque, agora totalmente integrada ao ecossistema **ToolCenter IAM**.

## \ud83d\ude80 Sobre o Projeto

O **Receitas App** nasceu da necessidade de centralizar o planejamento dom\u00e9stico. Ele permite n\u00e3o apenas guardar suas receitas favoritas, mas planejar sua semana, gerar listas de compras inteligentes baseadas no que voc\u00ea j\u00e1 tem no arm\u00e1rio e at\u00e9 calcular o custo real de cada prato.

### Principais Funcionalidades

-   \ud83d\udd10 **Autentica\u00e7\u00e3o SSO:** Integra\u00e7\u00e3o nativa com o **ToolCenter IAM** para login seguro e centralizado.
-   \ud83d\udccb **Planejamento Semanal:** Calend\u00e1rio din\u00e2mico para organizar suas refei\u00e7\u00f5es.
-   \ud83d\udce6 **Controle de Estoque:** Gerencie o que voc\u00ea tem em casa e receba alertas de validade.
-   \ud83d\uded2 **Lista de Compras Autom\u00e1tica:** Gere listas baseadas no seu planejamento e estoque real.
-   \ud83d\udcb0 **C\u00e1lculo de Custos:** Saiba exatamente quanto custa cada receita com base nos pre\u00e7os de mercado.
-   \ud83d\udc68\u200d\ud83c\udf73 **Modo Cozinha:** Interface otimizada para uso em tablets/celulares enquanto cozinha (com timer e Wake Lock).
-   \ud83d\udcf1 **PWA:** Instal\u00e1vel no seu celular para acesso r\u00e1pido e modo offline.

## \ud83d\udee0\ufe0f Stack Tecnol\u00f3gico

### Backend
- **Node.js** & **Express**
- **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **ToolCenter SDK** (Autentica\u00e7\u00e3o JWT/JWKS)
- **Zod** (Valida\u00e7\u00e3o de schemas)

### Frontend
- **React 18** & **Vite**
- **Tailwind CSS** & **shadcn/ui**
- **Zustand** (Gest\u00e3o de estado)
- **React Router DOM v6**

## \u2699\ufe0f Instala\u00e7\u00e3o e Configura\u00e7\u00e3o

### Pr\u00e9-requisitos
- Node.js 18+
- Docker & Docker Compose
- Inst\u00e2ncia do **ToolCenter IAM** rodando

### Passo a Passo

1.  **Clonar o reposit\u00f3rio:**
    ```bash
    git clone https://github.com/fabianofern/receitas-app.git
    cd receitas-app
    ```

2.  **Instalar depend\u00eancias:**
    ```bash
    npm install
    ```

3.  **Configurar Banco de Dados:**
    ```bash
    # Sobe o container PostgreSQL
    npm run db:up
    ```

4.  **Vari\u00e1veis de Ambiente:**
    Crie arquivos `.env` na raiz e nas pastas `apps/api` e `apps/web` seguindo os modelos `.env.example`.
    > \u26a0\ufe0f Certifique-se de configurar a `TOOLCENTER_JWKS_URL` corretamente para a integra\u00e7\u00e3o de autentica\u00e7\u00e3o.

5.  **Migra\u00e7\u00f5es e Dados Iniciais:**
    ```bash
    npm run db:migrate
    npm run db:seed
    ```

6.  **Iniciar Desenvolvimento:**
    ```bash
    npm run dev
    ```

Acesse o frontend em `http://localhost:3000` e a API em `http://localhost:3001`.

## \ud83d\udcc2 Estrutura do Monorepo

```text
receitas-app/
├── apps/
│   ├── api/          # Backend Express + Prisma
│   └── web/          # Frontend React + Vite
├── packages/         # (Futuro) Componentes compartilhados e tipos
└── docker-compose.yml # Infraestrutura local
```

## \ud83d\udcc4 Licen\u00e7a

Este projeto \u00e9 de uso privado. Todos os direitos reservados.

---
Desenvolvido por [Fabiano](https://github.com/fabianofern)
