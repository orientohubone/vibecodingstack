# 🚀 Instruções de Deploy - Netlify

## ⚡ Configuração Correta para Deploy Estático

### 📋 **Configurações do Netlify:**

1. **Build Command:** `npm run build`
2. **Publish Directory:** `out`
3. **Node Version:** `18` (configure em Environment Variables)

### 🔧 **Build Settings no Netlify:**

```
Build command: npm run build
Publish directory: out
```

### 🌐 **Environment Variables:**

```
NODE_VERSION = 18
```

### ✅ **Verificações Pré-Deploy:**

1. **Local Build Test:**
   ```bash
   npm run build
   # Verifique se a pasta 'out' foi criada
   ls -la out/
   ```

2. **Arquivos Principais Gerados:**
   - `out/index.html` - Página principal
   - `out/_next/static/` - Assets estáticos
   - `out/404.html` - Página de erro

### 🚨 **Problemas Comuns e Soluções:**

#### **Problema:** "Deploy directory 'out' does not exist"
**Solução:** 
- Certifique-se que `output: 'export'` está no `next.config.js`
- Verifique se o build roda localmente: `npm run build`

#### **Problema:** Imagens não carregam
**Solução:** 
- `images: { unoptimized: true }` no `next.config.js` (já configurado)

#### **Problema:** Rotas não funcionam
**Solução:** 
- Configurar redirects no `netlify.toml` (já configurado)

### 📁 **Estrutura Esperada Após Build:**

```
out/
├── index.html
├── 404.html
├── _next/
│   └── static/
│       ├── chunks/
│       └── css/
└── favicon.ico
```

### 🎯 **Deploy Manual (Alternativa):**

Se o deploy automático falhar:

```bash
# 1. Build local
npm run build

# 2. Upload manual no Netlify
# Vá em Netlify > Sites > Deploy manually
# Arraste a pasta 'out' para o Netlify
```

---

## ✨ Status: **CONFIGURADO PARA DEPLOY ESTÁTICO**

O projeto agora está configurado como site estático e deve fazer deploy corretamente no Netlify!