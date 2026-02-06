# Florest Plus — Frontend (Next.js)

Frontend do projeto **Florest Plus**, uma plataforma para venda de árvores com foco em impacto ambiental, rastreabilidade e transparência.

Este repositório contém **apenas o frontend** (Next.js).  
A API será criada em um projeto separado posteriormente.

---

## 🧱 Stack do Projeto

### Framework
- **Next.js 14+**
- App Router (`/app`)
- Server Components por padrão

### Linguagem
- **TypeScript**

### Estilização
- **Tailwind CSS**
- **shadcn/ui**
- **lucide-react** (ícones)

### Gerenciamento de Pacotes
- **pnpm**

### Gerenciamento de Estado / Dados
- **@tanstack/react-query**

### Formulários e Validação
- **react-hook-form**
- **zod**

### Utilitários
- **date-fns** (datas)
- **clsx** + **tailwind-merge** (composição de classes)

---

## ⚙️ Requisitos de Ambiente

Antes de rodar o projeto, você precisa ter instalado:

- **Node.js**: `>= 18.17` (recomendado **Node 20 LTS**)
- **pnpm**: `>= 9`

Verificar versões:
```bash
node -v
pnpm -v
📦 Instalação
Clone o repositório e instale as dependências:

bash
Copiar código
pnpm install
▶️ Rodando o projeto em desenvolvimento
bash
Copiar código
pnpm dev
A aplicação estará disponível em:

arduino
Copiar código
http://localhost:3000
📁 Estrutura de Pastas (resumo)
txt
Copiar código
src/
  app/            # App Router (layouts, páginas e route groups)
  components/     # Componentes reutilizáveis
    ui/           # Componentes do shadcn/ui
  lib/            # Utilitários (utils, providers, etc.)
  modules/        # Módulos de domínio (futuro)
🧭 Convenções do Projeto
O projeto usa pnpm (não usar npm ou yarn)

Imports absolutos usando @/*

Estilos via Tailwind + shadcn

Organização por módulos de domínio (evita pastas genéricas)

🚧 Status do Projeto
🟡 Em fase inicial (setup)

 Criação do projeto Next.js

 Configuração de Tailwind e shadcn/ui

 Instalação das libs base

 Layout base

 Autenticação

 Integração com API

 Fluxos de compra e TreeTags

👥 Time
Desenvolvimento inicial por 2 devs

Projeto preparado para escalar (frontend + API separados)

📄 Licença
Projeto privado — uso interno.

yaml
Copiar código

---

## Próximo passo (Git)

Depois de criar o `README.md`, o fluxo correto é:

```bash
git init
git add .
git commit -m "chore: initial next.js setup with base stack"
git branch -M main
git remote add origin <URL_DO_REPO>
git push -u origin main