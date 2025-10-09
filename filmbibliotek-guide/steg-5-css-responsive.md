# Steg 5: CSS - Responsiv Design

Nu gör vi vår applikation responsiv så den fungerar perfekt på mobil, tablet och desktop!

---

## 🎯 Mål för detta steg

- ✅ Implementera media queries
- ✅ Anpassa för mobil (< 768px)
- ✅ Anpassa för tablet (768-1024px)
- ✅ Optimera för stora skärmar (> 1400px)
- ✅ Skapa print-styles
- ✅ Respektera användares motion-preferenser

---

## 📱 css/responsive.css

Öppna `css/responsive.css` och lägg till följande:

### **Del 1: Mobile First - Mobil (max-width: 768px)**

```css
/* ===========================
   Mobile styles (max-width: 768px)
   =========================== */
@media screen and (max-width: 768px) {
    :root {
        --font-xxl: 2rem;
        --font-xl: 1.25rem;
        --spacing-lg: 2rem;
        --spacing-xl: 2.5rem;
    }
    
    /* Header */
    .header-content {
        flex-direction: column;
        gap: var(--spacing-sm);
        text-align: center;
    }
    
    .logo {
        font-size: var(--font-lg);
    }
    
    /* Hero */
    .hero {
        padding: var(--spacing-lg) 0;
    }
    
    .hero h2 {
        font-size: var(--font-xl);
    }
    
    .hero-subtitle {
        font-size: var(--font-md);
    }
    
    /* Search */
    .search-wrapper {
        flex-direction: column;
    }
    
    .search-btn {
        padding: var(--spacing-sm);
    }
    
    .filter-section {
        flex-direction: column;
    }
    
    .genre-select {
        width: 100%;
    }
    
    /* Movie grid */
    .movies-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: var(--spacing-sm);
    }
    
    .movie-poster {
        height: 225px;
    }
    
    .movie-title {
        font-size: var(--font-md);
    }
    
    /* Modal */
    .modal-content {
        max-width: 95%;
        margin: var(--spacing-sm);
    }
    
    .modal-body {
        padding: var(--spacing-md);
    }
    
    .modal-title {
        font-size: var(--font-xl);
    }
    
    .modal-meta {
        flex-direction: column;
        gap: var(--spacing-xs);
    }
    
    /* Footer */
    .footer-links {
        flex-direction: column;
        gap: var(--spacing-sm);
    }
    
    /* Movie Details */
    .movie-details-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }
    
    .details-list {
        grid-template-columns: 1fr;
        gap: var(--spacing-xs);
    }
    
    .details-list dt {
        margin-top: var(--spacing-sm);
    }
}
```

**💡 Förklaring:**

**Varför max-width: 768px?**
- Mobiler är oftast < 768px breda
- Detta är en standard breakpoint

**Viktiga ändringar för mobil:**
- **Flexbox columns** istället för rows (header, search)
- **Mindre grid-kort** (150px istället för 250px)
- **Full bredd** för select och inputs
- **Mindre fontstorlekar** via CSS-variabler
- **Enkel kolumn** för detaljsida

### **Del 2: Tablet (769px - 1024px)**

```css
/* ===========================
   Tablet styles (769px - 1024px)
   =========================== */
@media screen and (min-width: 769px) and (max-width: 1024px) {
    .movies-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    
    .container {
        padding: 0 var(--spacing-lg);
    }
}
```

**💡 Förklaring:**
- Tablets får mellanstora filmkort (200px)
- Lite mer padding på sidorna

### **Del 3: Desktop Large (min-width: 1400px)**

```css
/* ===========================
   Desktop large (min-width: 1400px)
   =========================== */
@media screen and (min-width: 1400px) {
    .movies-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}
```

**💡 Förklaring:**
- På stora skärmar blir korten lite bredare (280px)
- Bättre användning av tillgängligt utrymme

### **Del 4: Print Styles**

```css
/* ===========================
   Print styles
   =========================== */
@media print {
    .main-header,
    .search-section,
    .main-footer,
    .movie-actions,
    .modal {
        display: none;
    }
    
    body {
        background-color: white;
        color: black;
    }
    
    .movies-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

**💡 Förklaring:**
- När användaren skriver ut sidan
- Dölj navigation, sök, knappar
- Vit bakgrund för mindre bläck
- 2 kolumner för filmkort

### **Del 5: Reduced Motion**

```css
/* ===========================
   Reduced motion
   =========================== */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

**💡 Förklaring:**
- Respekterar användares systeminställning
- Vissa användare får illamående av animationer
- Stänger av/snabbar upp alla animationer
- **Tillgänglighet är viktigt!**

---

## 📱 Responsiva Design-principer

### **Mobile First vs Desktop First**

**Mobile First (vårt val):**
```css
/* Bas-styles för mobil */
.element { font-size: 1rem; }

/* Tablet och uppåt */
@media (min-width: 768px) {
    .element { font-size: 1.25rem; }
}

/* Desktop */
@media (min-width: 1024px) {
    .element { font-size: 1.5rem; }
}
```

**Desktop First:**
```css
/* Bas-styles för desktop */
.element { font-size: 1.5rem; }

/* Tablet och nedåt */
@media (max-width: 1024px) {
    .element { font-size: 1.25rem; }
}

/* Mobil */
@media (max-width: 768px) {
    .element { font-size: 1rem; }
}
```

### **Vanliga Breakpoints**

| Enhet | Bredd |
|-------|-------|
| **Mobil (small)** | < 576px |
| **Mobil (large)** | 576px - 767px |
| **Tablet** | 768px - 1023px |
| **Desktop** | 1024px - 1399px |
| **Desktop (large)** | ≥ 1400px |

### **Våra breakpoints:**
- **Mobile**: max-width: 768px
- **Tablet**: 769px - 1024px
- **Desktop large**: min-width: 1400px

---

## ✅ Testa din responsiva design

### **Test 1: Browser DevTools**

1. **Öppna DevTools** (F12)
2. **Klicka på device toolbar** (Ctrl/Cmd + Shift + M)
3. **Välj olika enheter:**
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

### **Test 2: Resize browser**

1. Gör webbläsarfönstret smalt (< 768px)
2. Kolla att:
   - Header blir vertikal
   - Sökfält blir vertikalt
   - Filmkort blir mindre
   - Allt ser bra ut

### **Test 3: Olika orientationer**

Testa både:
- Portrait (stående)
- Landscape (liggande)

### **Test 4: Print preview**

1. Tryck Ctrl/Cmd + P
2. Se hur utskriften ser ut
3. Navigation och knappar ska vara dolda

---

## 🎓 Media Query-syntax

### **Grundläggande syntax:**

```css
@media mediatype and (condition) {
    /* CSS här */
}
```

### **Mediatyper:**
- `screen` - Skärmar (mest använd)
- `print` - Utskrift
- `all` - Alla enheter (default)

### **Conditions (features):**

**Bredd:**
```css
/* Max bredd */
@media (max-width: 768px) { }

/* Min bredd */
@media (min-width: 1024px) { }

/* Mellan två bredder */
@media (min-width: 768px) and (max-width: 1024px) { }
```

**Höjd:**
```css
@media (max-height: 600px) { }
```

**Orientation:**
```css
@media (orientation: portrait) { }
@media (orientation: landscape) { }
```

**Preferenser:**
```css
@media (prefers-color-scheme: dark) { }
@media (prefers-reduced-motion: reduce) { }
@media (prefers-contrast: high) { }
```

---

## ✅ Checklista

- [ ] Mobil-styles fungerar (< 768px)
- [ ] Tablet-styles fungerar (768-1024px)
- [ ] Desktop large-styles fungerar (> 1400px)
- [ ] Print-styles är implementerade
- [ ] Reduced motion respekteras
- [ ] Alla element ser bra ut på alla skärmstorlekar
- [ ] Inga horisontella scrollbars på mobil

---

## 🎓 Vad du lärt dig

- ✅ **Media queries** för responsiv design
- ✅ **Breakpoints** och när man använder dem
- ✅ **Mobile first** vs Desktop first strategi
- ✅ **Flexbox och Grid** för responsiva layouts
- ✅ **Print styles** för utskrift
- ✅ **Accessibility** med reduced motion
- ✅ **Device testing** i DevTools
- ✅ **Viewport** och hur den fungerar

---

## 💡 Tips

- **Testa ofta** - Kolla responsivitet medan du utvecklar
- **Börja med mobil** - Det är lättare att bygga upp än att bryta ner
- **Använd DevTools** - Simulera olika enheter
- **Touchpoints** - Knappar bör vara minst 44x44px på mobil
- **Läsbarhet** - Text ska vara läsbar utan att zooma
- **Prestanda** - Mobila enheter har mindre kraft

---

## 🐛 Vanliga problem och lösningar

### **Problem: Viewport är zoomed in på mobil**
**Lösning:** Kontrollera att du har viewport meta-tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### **Problem: Horisontell scroll på mobil**
**Lösning:** Element är bredare än skärmen. Använd:
```css
* {
    max-width: 100%;
    box-sizing: border-box;
}
```

### **Problem: Text är för liten på mobil**
**Lösning:** Använd relativa enheter (rem, em) istället för px

### **Problem: Knappar är svåra att klicka på mobil**
**Lösning:** Gör dem minst 44x44px:
```css
@media (max-width: 768px) {
    .btn {
        min-height: 44px;
        min-width: 44px;
    }
}
```

---

## ➡️ Nästa steg

Grattis! Nu är all HTML och CSS klar. Dags att göra sidan levande med JavaScript!

**Gå vidare till:** [Steg 6: JavaScript - Hjälpmoduler](./steg-6-js-helpers.md)

*OBS: Du har redan gjort Steg 6, så gå vidare till Steg 7*

**Gå vidare till:** [Steg 7: JavaScript - API och Data](./steg-7-js-api.md)

---

[⬅️ Steg 4: CSS Komponenter](./steg-4-css-komponenter.md) | [📚 Innehåll](./README.md) | [Steg 7: JS API →](./steg-7-js-api.md)
