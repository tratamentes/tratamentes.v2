# 📸 SISTEMA DE IMAGENS OTIMIZADAS - GUIA DE USO

## 🚀 **COMO USAR O SHORTCODE:**

### **Sintaxe Básica:**
```hugo
{{< image src="nome-da-imagem" alt="Descrição da imagem" >}}
```

### **Sintaxe Completa:**
```hugo
{{< image 
    src="hero/massage-therapy" 
    alt="Massagem terapêutica profissional" 
    width="1200" 
    height="600" 
    class="large landscape critical" 
    loading="eager"
    placeholder="true"
    caption="Tratamento personalizado em ambiente relaxante" >}}
```

## 📁 **ESTRUTURA DE PASTAS RECOMENDADA:**

```
/static/images/
├── webp/              (versões WebP otimizadas)
│   ├── hero/
│   ├── services/
│   ├── team/
│   └── gallery/
├── hero/              (imagens do hero - JPEG/PNG)
├── services/          (imagens dos serviços)
├── team/              (fotos da equipa)
├── gallery/           (galeria de fotos)
└── icons/             (ícones e logos)
```

## 🎯 **PARÂMETROS DISPONÍVEIS:**

| Parâmetro | Obrigatório | Padrão | Descrição |
|-----------|-------------|--------|-----------|
| `src` | ✅ | - | Nome do ficheiro (sem extensão) |
| `alt` | ✅ | "Imagem TrataMentes" | Texto alternativo |
| `width` | ❌ | "800" | Largura em pixels |
| `height` | ❌ | "600" | Altura em pixels |
| `class` | ❌ | "" | Classes CSS adicionais |
| `loading` | ❌ | "lazy" | Tipo de carregamento |
| `placeholder` | ❌ | "true" | Mostrar placeholder |
| `caption` | ❌ | - | Legenda da imagem |

## 🎨 **CLASSES DISPONÍVEIS:**

### **Tamanhos:**
- `small` - Máximo 300px
- `medium` - Máximo 600px  
- `large` - Máximo 1200px
- `full-width` - Largura total

### **Formatos:**
- `square` - Proporção 1:1
- `portrait` - Proporção 3:4
- `landscape` - Proporção 16:9
- `wide` - Proporção 21:9

### **Especiais:**
- `critical` - Preload da imagem
- `gallery` - Ativa lightbox
- `hero` - Otimizada para hero

## 📝 **EXEMPLOS PRÁTICOS:**

### **Imagem Hero:**
```hugo
{{< image 
    src="hero/tratamentes-hero" 
    alt="TrataMentes - Massagem Terapêutica em Lisboa e Cascais" 
    width="1920" 
    height="1080" 
    class="full-width landscape critical"
    loading="eager" >}}
```

### **Galeria de Serviços:**
```hugo
<div class="image-gallery">
{{< image src="services/massagem-relaxante" alt="Massagem Relaxante" class="square gallery" >}}
{{< image src="services/massagem-terapeutica" alt="Massagem Terapêutica" class="square gallery" >}}
{{< image src="services/massagem-desportiva" alt="Massagem Desportiva" class="square gallery" >}}
</div>
```

### **Foto da Equipa:**
```hugo
{{< image 
    src="team/joao-goulart" 
    alt="João Goulart - Massoterapeuta Profissional" 
    width="400" 
    height="500" 
    class="medium portrait"
    caption="João Goulart - 20 anos de experiência" >}}
```

### **Ícones e Logos:**
```hugo
{{< image 
    src="icons/certificacao-profissional" 
    alt="Certificação Profissional" 
    width="100" 
    height="100" 
    class="small square"
    placeholder="false" >}}
```

## 🔧 **OTIMIZAÇÃO DE IMAGENS:**

### **Tamanhos Recomendados:**
- **Hero:** 1920x1080 (WebP ~200KB, JPEG ~400KB)
- **Serviços:** 800x600 (WebP ~100KB, JPEG ~200KB)
- **Galeria:** 600x600 (WebP ~80KB, JPEG ~150KB)
- **Equipa:** 400x500 (WebP ~60KB, JPEG ~120KB)
- **Ícones:** 100x100 (WebP ~10KB, PNG ~20KB)

### **Ferramentas de Conversão:**

#### **Para WebP:**
```bash
# Converter JPEG para WebP
cwebp input.jpg -q 80 -o output.webp

# Converter PNG para WebP
cwebp input.png -q 80 -o output.webp

# Conversão em lote
for file in *.jpg; do cwebp "$file" -q 80 -o "${file%.jpg}.webp"; done
```

#### **Otimização Online:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- ImageOptim: https://imageoptim.com/

## 🎯 **CONFORMIDADE WCAG 2.2:**

### **Alt Text Obrigatório:**
```hugo
{{< image src="exemplo" alt="Descrição clara e concisa da imagem" >}}
```

### **Imagens Decorativas:**
```hugo
{{< image src="decoracao" alt="" >}}
```

### **Imagens Complexas:**
```hugo
{{< image 
    src="grafico-resultados" 
    alt="Gráfico mostrando 95% de satisfação dos pacientes"
    caption="Dados recolhidos entre Janeiro e Dezembro 2024" >}}
```

## 📱 **RESPONSIVIDADE:**

O sistema é automaticamente responsivo, mas pode personalizar:

```css
/* Personalização adicional */
.image-container.custom {
    max-width: 500px;
}

@media (max-width: 768px) {
    .image-container.custom {
        max-width: 100%;
    }
}
```

## 🚀 **PERFORMANCE:**

### **Lazy Loading:**
- Ativado por padrão
- Use `loading="eager"` apenas para imagens above-the-fold

### **Preload Crítico:**
- Use classe `critical` para imagens importantes
- Máximo 2-3 imagens críticas por página

### **WebP Fallback:**
- Automático para todos os browsers
- Redução média de 30-50% no tamanho

## 🔍 **DEBUGGING:**

### **Verificar se Imagem Existe:**
1. Confirme que o ficheiro existe em `/static/images/`
2. Verifique se a versão WebP existe em `/static/images/webp/`
3. Teste o URL diretamente: `https://seusite.com/images/nome-da-imagem.jpg`

### **Problemas Comuns:**
- **Imagem não aparece:** Verifique o caminho e nome do ficheiro
- **WebP não carrega:** Confirme que a versão WebP existe
- **Placeholder não desaparece:** Verifique se há erros JavaScript

---

## 📞 **SUPORTE:**

Para dúvidas sobre o sistema de imagens:
1. Verifique este guia primeiro
2. Teste em ambiente local
3. Confirme estrutura de pastas
4. Valide sintaxe Hugo

**Lembre-se:** Sempre teste localmente antes de fazer deploy! 🚀

