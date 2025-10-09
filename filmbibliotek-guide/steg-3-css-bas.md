# Steg 3: CSS - Bas-styling

Nu börjar vi styla vår applikation! I detta steg skapar vi grundläggande styles, CSS-variabler och layout.

---

## 🎯 Mål för detta steg

- ✅ Skapa CSS-variabler för konsistent design
- ✅ Implementera reset och grundläggande styles
- ✅ Styla header och navigation
- ✅ Skapa hero-sektion med gradient
- ✅ Styla sök och filter-sektion
- ✅ Förstå CSS-variabler och BEM-liknande namngivning

---

## 🎨 css/styles.css

Öppna `css/styles.css` och lägg till följande:

### **Del 1: CSS-variabler**

```css
/* ===========================
   CSS-variabler för teman
   =========================== */
:root {
    /* Färger */
    --primary-color: #e50914;
    --secondary-color: #f5f5f1;
    --dark-bg: #141414;
    --dark-gray: #222;
    --light-gray: #e5e5e5;
    --text-primary: #ffffff;
    --text-secondary: #b3b3b3;
    --overlay-bg: rgba(0, 0, 0, 0.8);
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 3rem;
    --spacing-xl: 4rem;
    
    /* Font sizes */
    --font-sm: 0.875rem;
    --font-md: 1rem;
    --font-lg: 1.25rem;
    --font-xl: 1.5rem;
    --font-xxl: 2.5rem;
    
    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2);
    
    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

**💡 Förklaring:**
- `:root` - Pseudo-klass för att definiera globala variabler
- `--variabel-namn` - Syntax för CSS-variabler
- Användning: `color: var(--primary-color);`

### **Del 2: Reset och grundläggande**

```css
/* ===========================
   Reset och grundläggande
   =========================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--dark-bg);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

a {
    color: inherit;
    text-decoration: none;
}

ul {
    list-style: none;
}

button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
}
```

**💡 Förklaring:**
- `box-sizing: border-box` - Padding och border räknas in i elementets bredd
- `min-height: 100vh` - Minst 100% av viewport-höjden
- `display: flex` på body gör att footer kan stanna i botten

### **Del 3: Container och layout**

```css
/* ===========================
   Container och layout
   =========================== */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}
```

**💡 Förklaring:**
- `max-width` - Innehållet blir aldrig bredare än 1400px
- `margin: 0 auto` - Centrerar containern horisontellt
- `padding` - Ger luft på sidorna

### **Del 4: Header och navigation**

```css
/* ===========================
   Header och navigation
   =========================== */
.main-header {
    background-color: var(--dark-gray);
    padding: var(--spacing-md) 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: var(--shadow-lg);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: var(--font-xl);
    font-weight: bold;
    color: var(--primary-color);
}

.nav-list {
    display: flex;
    gap: var(--spacing-md);
}

.nav-link {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    transition: background-color var(--transition-fast);
    position: relative;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
    background-color: var(--primary-color);
}

.favorites-count {
    background-color: var(--primary-color);
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: var(--font-sm);
    margin-left: var(--spacing-xs);
}
```

**💡 Nyckelkoncept:**
- **`position: sticky`** - Headern fastnar högst upp när du scrollar
- **Flexbox** - Används för att layouta header-innehållet
- **`gap`** - Modern CSS-egenskap för mellanrum i flex/grid
- **Pseudo-klass `:hover`** - Style när man hovrar över element
- **`.active` klass** - Markerar aktuell sida

### **Del 5: Hero-sektion**

```css
/* ===========================
   Hero-sektion
   =========================== */
.hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, #8b0000 100%);
    padding: var(--spacing-xl) 0;
    text-align: center;
    position: relative;
    overflow: hidden;
}

/* Pseudo-element för dekorativ effekt */
.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.1)"/></svg>');
    background-size: 100px 100px;
    opacity: 0.1;
    animation: float 20s infinite linear;
}

@keyframes float {
    from { transform: translateY(0); }
    to { transform: translateY(-100px); }
}

.hero h2 {
    font-size: var(--font-xxl);
    margin-bottom: var(--spacing-sm);
    position: relative;
    z-index: 1;
}

.hero-subtitle {
    font-size: var(--font-lg);
    color: var(--secondary-color);
    position: relative;
    z-index: 1;
}
```

**💡 Nyckelkoncept:**
- **`linear-gradient`** - Skapa färgövergångar
- **`::before` pseudo-element** - Lägg till dekorativt innehåll
- **`@keyframes`** - Definiera animationer
- **`z-index`** - Kontrollera lager-ordning

### **Del 6: Sök och filter**

```css
/* ===========================
   Sök och filter
   =========================== */
.search-section {
    background-color: var(--dark-gray);
    padding: var(--spacing-lg) 0;
}

.search-form {
    margin-bottom: var(--spacing-md);
}

.search-wrapper {
    display: flex;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: var(--shadow-lg);
    border-radius: var(--radius-md);
    overflow: hidden;
}

.search-input {
    flex: 1;
    padding: var(--spacing-md);
    border: none;
    font-size: var(--font-md);
    background-color: white;
    color: var(--dark-bg);
}

.search-input:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
}

.search-btn {
    padding: var(--spacing-md) var(--spacing-lg);
    background-color: var(--primary-color);
    color: white;
    font-size: var(--font-lg);
    transition: background-color var(--transition-fast);
}

.search-btn:hover {
    background-color: #c40812;
}

.filter-section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-sm);
}

.filter-label {
    font-size: var(--font-md);
    color: var(--text-secondary);
}

.genre-select {
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-sm);
    border: 2px solid var(--light-gray);
    background-color: white;
    color: var(--dark-bg);
    font-size: var(--font-md);
    cursor: pointer;
    transition: border-color var(--transition-fast);
}

.genre-select:focus {
    outline: none;
    border-color: var(--primary-color);
}
```

**💡 Nyckelkoncept:**
- **`flex: 1`** - Element tar upp tillgängligt utrymme
- **`:focus` pseudo-klass** - Style när element har fokus
- **`outline`** - Ring runt fokuserat element
- **Custom select styling** - Vi stylar dropdown-menyn

### **Del 7: Main content**

```css
/* ===========================
   Main content
   =========================== */
.main-content {
    flex: 1;
    padding: var(--spacing-lg) 0;
}

.movies-section h2 {
    font-size: var(--font-xl);
    margin-bottom: var(--spacing-md);
}
```

### **Del 8: Loading och error states**

```css
/* ===========================
   Loading och error states
   =========================== */
.loading-spinner {
    display: none;
    text-align: center;
    padding: var(--spacing-xl);
}

.loading-spinner.active {
    display: block;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    margin: 0 auto var(--spacing-md);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.error-message {
    display: none;
    text-align: center;
    padding: var(--spacing-xl);
    background-color: rgba(229, 9, 20, 0.1);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
}

.error-message.active {
    display: block;
}

.error-text {
    color: var(--primary-color);
    font-size: var(--font-lg);
    margin-bottom: var(--spacing-md);
}

.retry-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--primary-color);
    color: white;
    border-radius: var(--radius-sm);
    font-size: var(--font-md);
    transition: background-color var(--transition-fast);
}

.retry-btn:hover {
    background-color: #c40812;
}
```

### **Del 9: Load more och footer**

```css
/* ===========================
   Load more section
   =========================== */
.load-more-section {
    text-align: center;
    margin-top: var(--spacing-lg);
}

/* ===========================
   Footer
   =========================== */
.main-footer {
    background-color: var(--dark-gray);
    padding: var(--spacing-lg) 0;
    margin-top: auto;
    text-align: center;
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
}

.footer-link {
    color: var(--text-secondary);
    font-size: var(--font-sm);
    transition: color var(--transition-fast);
}

.footer-link:hover {
    color: var(--text-primary);
}

/* ===========================
   Empty state
   =========================== */
.empty-state {
    text-align: center;
    padding: var(--spacing-xl);
    display: none;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-md);
}

.empty-state h3 {
    font-size: var(--font-xl);
    margin-bottom: var(--spacing-sm);
}

.empty-state p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
}
```

---

## ✅ Testa ditt arbete

1. **Ladda om sidan** - Du bör nu se:
   - Mörk bakgrund
   - Stylad header med röd logotyp
   - Hero-sektion med gradient
   - Sökfält och filter

2. **Testa interaktivitet:**
   - Hovra över navigationslänkar
   - Fokusera sökfältet (klicka i det)
   - Hovra över knappar

---

## ✅ Checklista

- [ ] CSS-variabler är definierade
- [ ] Header är stylad och sticky
- [ ] Hero-sektion har gradient
- [ ] Sökfält och filter ser bra ut
- [ ] Loading spinner syns (öppna DevTools och lägg till `.active` klass)
- [ ] Hover-effekter fungerar

---

## 🎓 Vad du lärt dig

- ✅ **CSS-variabler** (`--variabel-namn` och `var()`)
- ✅ **Flexbox** för layout
- ✅ **Pseudo-klasser** (`:hover`, `:focus`)
- ✅ **Pseudo-element** (`::before`)
- ✅ **CSS-animationer** (`@keyframes`)
- ✅ **Gradients** (`linear-gradient`)
- ✅ **Position: sticky**
- ✅ **Transitions** för smidiga effekter

---

## ➡️ Nästa steg

Nu har vi bas-stylingen klar! Nästa steg är att styla komponenter som filmkort och modal.

**Gå vidare till:** [Steg 4: CSS - Komponenter](./steg-4-css-komponenter.md)

---

[⬅️ Steg 2: HTML](./steg-2-html.md) | [📚 Innehåll](./README.md) | [Steg 4: CSS Komponenter →](./steg-4-css-komponenter.md)
