# 🎨 Paleta de Cores - Nexihub

Paleta de cores baseada no gradiente da logo: **#60efff (ciano) → #00ff87 (verde)**

## 🎯 Cores Principais

### Background
- **Primary**: `#151515` - Background principal (escuro)
- **Secondary**: `#1a1a1a` - Cards e elementos elevados
- **Tertiary**: `#202020` - Áreas de destaque sutil

### Brand (Gradiente da Logo)
- **Content Brand**: `#30ffb3` - Verde-ciano intermediário para textos
- **Background Brand**: `#20e09d` - Verde-ciano médio para fundos
- **Background Highlights**: `#60efff` - Ciano brilhante da logo

### Borders
- **Primary**: `#2a2a2a` - Bordas principais
- **Secondary**: `#3a3a3a` - Bordas secundárias
- **Brand**: `#30ffb3` - Bordas com destaque brand
- **Divisor**: `#222222` - Linhas divisórias sutis

## ✨ Accent Colors

### Primary (Verde)
- **Base**: `#00ff87` - Verde brilhante da logo
- **Light**: `#33ffa0` - Verde claro para hover

### Cyan (Ciano)
- **Base**: `#60efff` - Ciano brilhante da logo
- **Light**: `#1a4a52` - Fundo escuro com toque de ciano

### Success (Verde)
- **Base**: `#00ff87` - Indica sucesso
- **Light**: `#1a5238` - Fundo escuro com toque de verde

### Warning (Amarelo)
- **Base**: `#ffcc00` - Alertas e avisos
- **Light**: `#75601b` - Fundo escuro com toque de amarelo

### Error (Vermelho)
- **Base**: `#ff3366` - Erros e ações destrutivas
- **Light**: `#751b2e` - Fundo escuro com toque de vermelho

## 📝 Uso Recomendado

### Botões Primários
```css
background: var(--color-accent-primary); /* #00ff87 */
color: #0a0a0a; /* Texto escuro sobre verde brilhante */
```

### Botões Secundários
```css
background: var(--color-accent-cyan); /* #60efff */
color: #0a0a0a; /* Texto escuro sobre ciano brilhante */
```

### Links e Destaques
```css
color: var(--color-content-brand); /* #30ffb3 */
```

### Highlights/Badges
```css
background: var(--color-background-highlights); /* #60efff */
color: #0a0a0a;
```

## 🌈 Gradiente da Logo

```css
background: linear-gradient(135deg, #60efff 0%, #00ff87 100%);
```

### Com Glow Effect
```css
box-shadow: 
  0 0 20px rgba(96, 239, 255, 0.3),
  0 0 40px rgba(0, 255, 135, 0.2);
```

## 🎨 Contraste e Acessibilidade

- **Texto primário** (#ffffff) tem excelente contraste sobre todos os backgrounds escuros
- **Texto brand** (#30ffb3) tem bom contraste sobre backgrounds escuros
- **Cores accent** são vibrantes e chamam atenção mantendo legibilidade
- **Foreground sobre cores brilhantes**: usar `#0a0a0a` para máximo contraste

## 💡 Dicas de Uso

1. **Verde (#00ff87)**: Use para ações principais, sucesso, confirmações
2. **Ciano (#60efff)**: Use para links, destaques secundários, hover states
3. **Verde-Ciano (#30ffb3)**: Use para textos com brand, ícones importantes
4. **Gradiente**: Reserve para logo, headers especiais e CTAs principais
