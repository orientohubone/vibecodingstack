# Landing Page Vibe Stack

Landing page moderna e interativa para apresentar um stack completo de "vibe coding" com foco em integração de ferramentas e bancos de dados modernos.

## 🚀 Tecnologias

- **React** + **Next.js** - Framework React para produção
- **TailwindCSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Lucide Icons** - Ícones modernos
- **TypeScript** - Tipagem estática

## 🧩 Componentes

### 1. **Hero.tsx**
Cabeçalho principal com animações, título dinâmico e botões interativos.

### 2. **MainStack.tsx**
Cards com logotipos e descrições das ferramentas principais:
- Lovable
- Bolt
- Replit
- Cursor AI
- Firebase Studio

### 3. **CloudDatabases.tsx**
Apresenta bancos de dados em nuvem:
- Neon PostgreSQL
- Supabase
- Firebase Realtime/Firestore

### 4. **GitHubFlow.tsx**
Demonstra o fluxo de desenvolvimento com GitHub:
- Criar conta
- Conectar com Cursor AI
- Versionar código
- Automatizar deploy

### 5. **DeployOptions.tsx**
Opções de deploy com CI/CD:
- Netlify
- Vercel

### 6. **IntegrationFlow.tsx**
Fluxo de integração REST API usando o componente `DatabaseWithRestApi`.

## 🎨 Design System

- **Cores**: Gradientes suaves (púrpura, azul, ciano, rosa)
- **Tipografia**: Inter font com variações de peso
- **Componentes**: Cards com cantos arredondados, sombras sutis
- **Animações**: Hover effects e animações de entrada
- **Layout**: Grid responsivo e mobile-first

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build
npm start
```

## 🔧 Desenvolvimento

O projeto está estruturado de forma modular:

```
├── components/
│   ├── Hero.tsx
│   ├── MainStack.tsx
│   ├── CloudDatabases.tsx
│   ├── GitHubFlow.tsx
│   ├── DeployOptions.tsx
│   ├── IntegrationFlow.tsx
│   └── DatabaseWithRestApi.tsx
├── pages/
│   ├── _app.tsx
│   └── index.tsx
├── styles/
│   └── globals.css
└── ...
```

## 🌐 Deploy

O projeto está configurado para deploy em:
- **Netlify**: Deploy automático via GitHub
- **Vercel**: Deploy otimizado para Next.js

## 🎯 Características

- ✅ Responsivo (mobile-first)
- ✅ Animações suaves com Framer Motion
- ✅ Acessibilidade
- ✅ Performance otimizada
- ✅ SEO friendly
- ✅ TypeScript
- ✅ Componentes modulares

## 📄 Licença

Este projeto é de código aberto e está disponível sob a [Licença MIT](LICENSE).