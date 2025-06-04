# 🚀 GUIA DE INSTALAÇÃO RÁPIDA

## Pré-requisitos
- Hugo Extended instalado
- Git instalado
- Editor de código (VS Code recomendado)

## Instalação em 3 Passos

### 1. Extrair e Navegar
```bash
# Extrair o ZIP
unzip tratamentes-v2-funcional.zip
cd tratamentes-v2-funcional
```

### 2. Testar Localmente
```bash
# Iniciar servidor de desenvolvimento
hugo server

# Abrir no browser: http://localhost:1313
```

### 3. Deploy (Vercel/Netlify)
```bash
# Inicializar Git
git init
git add .
git commit -m "Initial commit"

# Fazer push para GitHub
git remote add origin https://github.com/tratamentes/tratamentes.v2.git
git push -u origin main

# Conectar no Vercel/Netlify para deploy automático
```

## ✅ Verificações

- [ ] Site carrega sem erros
- [ ] Navegação funciona
- [ ] Design responsivo (testar mobile)
- [ ] Formulário de contacto visível
- [ ] Todas as páginas acessíveis

## 🔧 Personalização

### Alterar Informações
Editar `hugo.toml`:
- Telefone
- Email
- Moradas

### Alterar Conteúdo
Editar ficheiros em `content/pt/`:
- `_index.md` - Homepage
- `sobre/_index.md` - Página sobre
- `servicos/_index.md` - Serviços
- `contacto/_index.md` - Contacto

### Alterar Design
Editar `themes/tratamentes/static/css/style.css`

## 📞 Suporte
Em caso de dúvidas, contactar o desenvolvedor.

---
**Site pronto para usar!** 🎉

