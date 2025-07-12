#!/bin/bash

echo "🚀 Configurando projeto Landing Page Vibe Stack..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "📦 Instalando dependências..."
npm install

echo "🔧 Configurando Next.js..."
npx next build

echo "✅ Configuração concluída!"
echo ""
echo "📋 Comandos disponíveis:"
echo "  npm run dev    - Executar em desenvolvimento"
echo "  npm run build  - Build para produção"
echo "  npm start      - Executar build de produção"
echo "  npm run lint   - Executar linter"
echo ""
echo "🎯 Para iniciar o desenvolvimento, execute:"
echo "  npm run dev"
echo ""
echo "🌐 O projeto estará disponível em: http://localhost:3000"