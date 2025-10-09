# Steg 4: CSS - Komponenter

Nu skapar vi CSS för alla komponenter: knappar, filmkort, modal och detaljsidan.

---

## 🎯 Mål för detta steg

- ✅ Skapa återanvändbara knappstilar
- ✅ Styla filmkort med CSS Grid
- ✅ Implementera hover-effekter och transitions
- ✅ Skapa modal med overlay
- ✅ Styla detaljsidan
- ✅ Använda pseudo-element för visuella effekter

---

## 🎨 css/components.css

Öppna `css/components.css` och lägg till följande:

### **Del 1: Knappar**

```css
/* ===========================
   Buttons
   =========================== */
.btn {
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-sm);
    font-size: var(--font-md);
    font-weight: 600;
    transition: all var(--transition-fast);
    display: inline-block;
    text-align: center;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: #c40812;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.btn-secondary {
    background-color: transparent;
    color: var(--text-primary);
    border: 2px solid var(--text-primary);
}

.btn-secondary:hover {
    background-color: var(--text-primary);
    color: var(--dark-bg);
}
```

**💡 Förklaring:**
- `.btn` - Bas-klass för alla knappar
- `.btn-primary` - Röd huvudknapp
- `.btn-secondary` - Transparent knapp med border
- `transform: translateY(-2px)` - Knappen "lyfter sig" vid hover

### **Del 2: Movie Grid**

```css
/* ===========================
   Movie Grid (CSS Grid)
   =========================== */
.movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}
```

**💡 Förklaring:**
- `repeat(auto-fill, ...)` - Skapa så många kolumner som får plats
- `minmax(250px, 1fr)` - Minst 250px bred, max lika bred
- `gap` - Mellanrum mellan kort

### **Del 3: Movie Card**

```css
/* ===========================
   Movie Card
   =========================== */
.movie-card {
    background-color: var(--dark-gray);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: all var(--transition-normal);
    cursor: pointer;
    position: relative;
}

/* Pseudo-klass för hover-effekt */
.movie-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
}

/* Pseudo-element för favorit-badge */
.movie-card.is-favorite::after {
    content: '❤️';
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    font-size: 1.5rem;
    animation: heartbeat 1s ease infinite;
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

.movie-poster {
    width: 100%;
    height: 375px;
    object-fit: cover;
    display: block;
}

.movie-info {
    padding: var(--spacing-md);
}

.movie-title {
    font-size: var(--font-lg);
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
    
    /* Text overflow hantering */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.movie-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
}

.movie-year {
    color: var(--text-secondary);
    font-size: var(--font-sm);
}

.movie-rating {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-weight: 600;
    color: #ffd700;
}

.movie-rating::before {
    content: '⭐';
}

.movie-genre {
    color: var(--text-secondary);
    font-size: var(--font-sm);
    margin-bottom: var(--spacing-sm);
}

.movie-overview {
    color: var(--text-secondary);
    font-size: var(--font-sm);
    line-height: 1.4;
    
    /* Visa max 3 rader */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.movie-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
}

.favorite-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    border-radius: var(--radius-sm);
    font-size: var(--font-sm);
    transition: all var(--transition-fast);
    flex: 1;
}

.favorite-btn:hover {
    background-color: var(--primary-color);
    color: white;
}

.favorite-btn.active {
    background-color: var(--primary-color);
    color: white;
}

.details-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: white;
    color: var(--dark-bg);
    border-radius: var(--radius-sm);
    font-size: var(--font-sm);
    transition: all var(--transition-fast);
    flex: 1;
    text-align: center;
    display: block;
    text-decoration: none;
}

.details-btn:hover {
    background-color: var(--light-gray);
}
```

**💡 Viktiga koncept:**

**`::after` pseudo-element:**
- Lägg till innehåll efter element
- Används för favorit-hjärtat
- Kräver `content` property

**Text overflow:**
- `text-overflow: ellipsis` - Visa "..." när texten är för lång
- `-webkit-line-clamp` - Begränsa antal rader

**`object-fit: cover`:**
- Bilden täcker hela området utan att sträckas

### **Del 4: Modal**

```css
/* ===========================
   Modal
   =========================== */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
}

.modal.active {
    display: flex;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--overlay-bg);
    animation: fadeIn var(--transition-normal);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-content {
    position: relative;
    background-color: var(--dark-gray);
    border-radius: var(--radius-lg);
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    z-index: 1001;
    animation: slideUp var(--transition-normal);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-close {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    font-size: 2rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1002;
    transition: background-color var(--transition-fast);
}

.modal-close:hover {
    background-color: var(--primary-color);
}

.modal-body {
    padding: var(--spacing-lg);
}

.modal-poster {
    width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
}

.modal-title {
    font-size: var(--font-xxl);
    margin-bottom: var(--spacing-sm);
}

.modal-meta {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    flex-wrap: wrap;
}

.modal-meta-item {
    color: var(--text-secondary);
    font-size: var(--font-md);
}

.modal-overview {
    line-height: 1.8;
    margin-bottom: var(--spacing-md);
}
```

**💡 Viktiga koncept:**

**Fixed positioning:**
- `position: fixed` - Element fastnar på skärmen
- Täcker hela viewporten med `top: 0; left: 0; right: 0; bottom: 0;`

**z-index:**
- Högre värde = ligger överst
- Overlay: 1000, Content: 1001, Close-button: 1002

**Animationer:**
- `fadeIn` - Gradvis fade in
- `slideUp` - Glider upp från botten

### **Del 5: Badges och Chips**

```css
/* ===========================
   Badges och chips
   =========================== */
.badge {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: var(--primary-color);
    color: white;
    border-radius: var(--radius-sm);
    font-size: var(--font-sm);
    font-weight: 600;
}

.genre-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-md);
}

.genre-chip {
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-sm);
    font-size: var(--font-sm);
    color: var(--text-secondary);
}

/* Pseudo-klass: nth-child för olika färger */
.genre-chip:nth-child(1) { border-left: 3px solid #ff6b6b; }
.genre-chip:nth-child(2) { border-left: 3px solid #4ecdc4; }
.genre-chip:nth-child(3) { border-left: 3px solid #45b7d1; }
.genre-chip:nth-child(4) { border-left: 3px solid #f9ca24; }
.genre-chip:nth-child(5) { border-left: 3px solid #6c5ce7; }
```

**💡 `:nth-child()` pseudo-klass:**
- Väljer element baserat på position
- `:nth-child(1)` - Första elementet
- `:nth-child(2n)` - Vartannat element (jämna)
- `:nth-child(odd)` - Udda element

### **Del 6: Movie Details Page**

```css
/* ===========================
   Movie Details Page
   =========================== */
.movie-details {
    display: none;
    margin-top: var(--spacing-lg);
}

.movie-details.active {
    display: block;
}

.back-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    border-radius: var(--radius-sm);
    font-size: var(--font-md);
    margin-bottom: var(--spacing-lg);
    transition: background-color var(--transition-fast);
}

.back-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.movie-details-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--spacing-xl);
}

.details-poster-img {
    width: 100%;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
}

.details-title {
    font-size: var(--font-xxl);
    margin-bottom: var(--spacing-md);
}

.details-meta {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    flex-wrap: wrap;
}

.meta-item {
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-sm);
    font-size: var(--font-md);
}

.details-genres {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-lg);
}

.details-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
}

.details-section {
    margin-bottom: var(--spacing-lg);
}

.details-section h2 {
    font-size: var(--font-xl);
    margin-bottom: var(--spacing-sm);
    color: var(--primary-color);
}

.details-overview {
    line-height: 1.8;
    color: var(--text-secondary);
}

.details-list {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: var(--spacing-sm) var(--spacing-md);
}

.details-list dt {
    font-weight: 600;
    color: var(--text-primary);
}

.details-list dd {
    color: var(--text-secondary);
}
```

**💡 Definition list grid:**
- `<dt>` (definition term) - Nyckeln
- `<dd>` (definition description) - Värdet
- Grid gör dem snyggt alignade

---

## ✅ Testa ditt arbete

Nu ska du börja se resultat även om JavaScript inte är klart än!

### **Test 1: Knappar**

Lägg till en knapp i HTML temporärt för att testa:

```html
<!-- I index.html, efter hero -->
<div style="text-align: center; padding: 2rem;">
    <button class="btn btn-primary">Primary Button</button>
    <button class="btn btn-secondary">Secondary Button</button>
</div>
```

Du bör se:
- ✅ Röd primary-knapp
- ✅ Transparent secondary-knapp med border
- ✅ Hover-effekter fungerar

### **Test 2: Grid**

Grid-layouten kommer visa sig när JavaScript lägger in filmkort, men du kan testa med placeholder:

```html
<!-- I #moviesGrid -->
<div class="movie-card">
    <img src="https://via.placeholder.com/300x450" class="movie-poster" alt="Test">
    <div class="movie-info">
        <h3 class="movie-title">Test Film</h3>
        <div class="movie-meta">
            <span class="movie-year">2024</span>
            <span class="movie-rating">8.5</span>
        </div>
        <p class="movie-genre">Action</p>
        <p class="movie-overview">Detta är en test-beskrivning av filmen...</p>
    </div>
</div>
```

### **Test 3: Modal**

Lägg till `.active` klass på modalen i DevTools:
1. Inspektera `<div class="modal">`
2. Dubbelklicka på class-attributet
3. Lägg till ` active`
4. Modalen bör visas med animation

---

## ✅ Checklista

- [ ] Knappstilar är skapade och fungerar
- [ ] Movies-grid använder CSS Grid
- [ ] Filmkort har hover-effekter
- [ ] Favorit-hjärta visas med `::after`
- [ ] Modal har overlay och animation
- [ ] Detaljsida har 2-kolumns grid
- [ ] Alla transitions är smidiga

---

## 🎓 Vad du lärt dig

- ✅ **CSS Grid** för både filmgalleri och detaljsida
- ✅ **Flexbox** för knappar och meta-information
- ✅ **Pseudo-element** (`::after`) för visuella effekter
- ✅ **Pseudo-klasser** (`:hover`, `:nth-child()`)
- ✅ **CSS Animations** (`@keyframes`)
- ✅ **Position: fixed** för modal
- ✅ **z-index** för lagerhantering
- ✅ **Transitions** för smidiga effekter
- ✅ **Text overflow** hantering
- ✅ **Återanvändbara komponenter**

---

## 💡 Tips

- **Komponenter ska vara återanvändbara** - Tänk på att de kan användas på flera ställen
- **Använd CSS-variabler** - Gör det lätt att ändra färger och spacing
- **Testa hover-states** - Interaktivitet är viktigt för UX
- **Animationer ska vara subtila** - Lagom mycket är bäst
- **Grid vs Flexbox** - Grid för 2D-layout, Flexbox för 1D

---

## ➡️ Nästa steg

Nu har vi alla komponenter stylade! Nästa steg är responsiv design.

**Gå vidare till:** [Steg 5: CSS - Responsiv Design](./steg-5-css-responsive.md)

---

[⬅️ Steg 3: CSS Bas](./steg-3-css-bas.md) | [📚 Innehåll](./README.md) | [Steg 5: CSS Responsive →](./steg-5-css-responsive.md)
