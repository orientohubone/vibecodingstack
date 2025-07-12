# 🚀 Quick Start - Landing Page Vibe Stack

## ⚡ Início Rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar em desenvolvimento
```bash
npm run dev
```

### 3. Abrir no navegador
```
http://localhost:3000
```

---

## 📱 Pré-visualização dos Componentes

### 🎯 Hero Section
- Gradiente roxo/azul/ciano
- Título "Vibe Coding" com gradiente
- 2 botões: "Começar a Codar" e "Explorar Stack"
- Grid 2x2 com ícones (Frontend, Backend, Deploy, CI/CD)

### 🛠️ Main Stack
- 5 cards em grid responsivo
- Ferramentas: Lovable ❤️, Bolt ⚡, Replit 🔧, Cursor AI 🎯, Firebase Studio 🔥
- Hover effects com escala e movimento vertical

### 🗄️ Cloud Databases
- 3 cards: Neon PostgreSQL 🐘, Supabase ⚡, Firebase 🔥
- Badges SQL/NoSQL diferenciadas
- Lista de recursos para cada banco

### 🐙 GitHub Flow
- 4 etapas numeradas
- Fluxo: Criar conta → Conectar Cursor AI → Versionar → Automatizar
- Linha de conexão horizontal (desktop)

### 🚀 Deploy Options
- 2 cards: Netlify 🌐 e Vercel ▲
- Fluxo CI/CD visualizado: git push → build → deploy → live
- Features principais listadas

### 🔗 Integration Flow
- Componente DatabaseWithRestApi centralizado
- HTTP methods: GET, POST, PUT, DELETE
- Conexões visuais animadas
- 3 etapas explicativas

---

## 🎨 Customização Rápida

### Cores
Edite `tailwind.config.js` para personalizar:
- `from-purple-500 to-pink-500`
- `from-blue-500 to-cyan-500`
- `from-green-500 to-emerald-500`

### Textos
Edite os arrays de dados nos componentes:
- `stackTools` em `MainStack.tsx`
- `databases` em `CloudDatabases.tsx`
- `flowSteps` em `GitHubFlow.tsx`

### Animações
Ajuste os delays em `transition={{ duration: 0.6, delay: 0.2 }}` nos componentes.

---

## 🌐 Deploy

### Netlify
1. Conecte seu repositório GitHub
2. Build command: `npm run build`
3. Publish directory: `out`

### Vercel
1. Conecte seu repositório GitHub
2. Framework: Next.js
3. Deploy automático

---

## 📋 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Executar build
npm start

# Linter
npm run lint

# Setup completo
./setup.sh
```

---

## 🎉 Pronto para usar!

Seu projeto está configurado com:
- ✅ Next.js + React + TypeScript
- ✅ Tailwind CSS + Framer Motion
- ✅ Componentes modulares
- ✅ Animações suaves
- ✅ Design responsivo
- ✅ Deploy ready