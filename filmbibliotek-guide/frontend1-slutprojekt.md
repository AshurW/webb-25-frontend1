# Frontend 1 - Slutprojekt: Filmbibliotek

## 📋 Projektöversikt

I detta slutprojekt ska du skapa en komplett **Filmbibliotek-webbplats** som integrerar alla viktiga koncept från Frontend 1-kursen. Projektet kombinerar HTML, CSS och JavaScript för att skapa en dynamisk, responsiv och interaktiv webbapplikation.

### 🎯 Vad du kommer att bygga

En fullständig filmwebbplats där användare kan:
- Bläddra bland populära filmer
- Söka efter specifika filmer
- Se detaljerad information om varje film
- Spara favoritfilmer
- Filtrera filmer efter genre
- Se personliga rekommendationer
- Ha en responsiv upplevelse på alla enheter

---

## 🛠️ Tekniska krav och koncept som täcks

### HTML
- ✅ Semantiska element (`header`, `nav`, `main`, `section`, `article`, `footer`)
- ✅ Formulär och input-hantering
- ✅ Data-attribut för att lagra information
- ✅ Tillgänglighet (aria-labels, alt-texter)

### CSS
- ✅ **Flexbox** för layout och komponentpositionering
- ✅ **CSS Grid** för filmkort-gallery
- ✅ **Media queries** för responsiv design
- ✅ **Pseudo-klasser** (`:hover`, `:focus`, `:active`, `:nth-child`)
- ✅ **Pseudo-element** (`::before`, `::after`)
- ✅ CSS-variabler för teman
- ✅ Transitions och animationer
- ✅ Modern CSS-design med shadows och gradients

### JavaScript
- ✅ **DOM-manipulation** (querySelector, createElement, append, remove)
- ✅ **Event handling** (click, submit, input, scroll)
- ✅ **Fetch API** för att hämta data från backend
- ✅ **Async/Await** för asynkrona operationer
- ✅ **Try-catch** för felhantering
- ✅ **localStorage** för att spara användardata
- ✅ **Array methods** (map, filter, reduce, find, forEach)
- ✅ **OOP** (Klasser och objekt)
- ✅ **ES6+ syntax** (arrow functions, destructuring, template literals)
- ✅ **ES6 Modules** (import/export för modulär kod)
- ✅ **Event delegation** för dynamiska element

---

## 📁 Projektstruktur

```
filmbibliotek/
│
├── index.html              # Huvudsida med filmgalleri
├── favorites.html          # Sida för sparade favoriter
├── movie-details.html      # Detaljsida för enskild film
│
├── css/
│   ├── styles.css          # Huvudstil och gemensamma styles
│   ├── components.css      # Komponenter (cards, buttons, modals)
│   └── responsive.css      # Media queries
│
├── js/
│   ├── utils.js            # Hjälpfunktioner (exporterar Utils)
│   ├── storage.js          # localStorage-hantering (exporterar Storage)
│   ├── api.js              # API-hantering (exporterar MovieAPI klass)
│   ├── ui.js               # UI-komponenter (exporterar UI, importerar Storage & Utils)
│   ├── app.js              # Huvudapplikation (importerar alla modules)
│   ├── favorites.js        # Favoritsida-logik (importerar Storage & UI)
│   └── movie-details.js    # Detaljsida-logik (importerar API, Storage & UI)
│
└── assets/
    └── images/
        └── placeholder.png  # Placeholder för saknade bilder
```

**OBS:** Projektet använder **ES6 Modules** med `import/export`. Detta kräver att:
- Script-taggar har `type="module"` attribut
- Filsökvägar i imports inkluderar `.js` filändelse
- Moduler laddas automatiskt i defer-läge (defer-attributet är tekniskt sett redundant men kan användas för tydlighet)
- Projektet körs via en HTTP-server (inte `file://` protokoll)

---

## 🚀 Steg-för-steg implementering

### Viktigt: Köra projektet

Eftersom projektet använder **ES6 Modules** måste det köras via en HTTP-server. Du kan inte öppna `index.html` direkt i webbläsaren (`file://` protokoll fungerar inte med modules).

**Alternativ för att starta en lokal server:**

1. **Med VS Code Live Server-extension:**
   - Installera "Live Server" extension i VS Code
   - Högerklicka på `index.html` och välj "Open with Live Server"

2. **Med Python (om du har det installerat):**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Öppna sedan http://localhost:8000
   ```

3. **Med Node.js:**
   ```bash
   npx http-server -p 8000
   
   # Öppna sedan http://localhost:8000
   ```

4. **Med PHP:**
   ```bash
   php -S localhost:8000
   ```

---

## **Del 1: HTML-struktur**

### 1.1 Skapa `index.html`

Skapa huvudsidan med semantisk HTML-struktur:

```html
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filmbibliotek - Upptäck fantastiska filmer</title>
    <meta name="description" content="Bläddra bland tusentals filmer och spara dina favoriter">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
    
    <!-- JavaScript Module -->
    <script type="module" src="js/app.js" defer></script>
</head>
<body>
    <!-- Header med navigation -->
    <header class="main-header">
        <div class="container">
            <div class="header-content">
                <h1 class="logo">🎬 Filmbibliotek</h1>
                
                <nav class="main-nav" aria-label="Huvudnavigation">
                    <ul class="nav-list">
                        <li><a href="index.html" class="nav-link active">Hem</a></li>
                        <li><a href="favorites.html" class="nav-link">
                            Favoriter <span class="favorites-count">0</span>
                        </a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero-sektion -->
    <section class="hero" aria-labelledby="hero-title">
        <div class="container">
            <h2 id="hero-title">Upptäck fantastiska filmer</h2>
            <p class="hero-subtitle">Tusentals filmer att utforska</p>
        </div>
    </section>

    <!-- Sökfält och filter -->
    <section class="search-section">
        <div class="container">
            <form class="search-form" id="searchForm" role="search">
                <div class="search-wrapper">
                    <input 
                        type="text" 
                        id="searchInput" 
                        class="search-input" 
                        placeholder="Sök efter filmer..."
                        aria-label="Sök efter filmer"
                    >
                    <button type="submit" class="search-btn" aria-label="Sök">
                        🔍
                    </button>
                </div>
            </form>

            <!-- Genre-filter -->
            <div class="filter-section">
                <label for="genreFilter" class="filter-label">Filtrera efter genre:</label>
                <select id="genreFilter" class="genre-select">
                    <option value="">Alla genrer</option>
                    <option value="action">Action</option>
                    <option value="comedy">Komedi</option>
                    <option value="drama">Drama</option>
                    <option value="horror">Skräck</option>
                    <option value="scifi">Sci-Fi</option>
                    <option value="romance">Romantik</option>
                </select>
            </div>
        </div>
    </section>

    <!-- Huvudinnehåll -->
    <main class="main-content">
        <div class="container">
            <!-- Loading spinner -->
            <div class="loading-spinner" id="loadingSpinner" aria-live="polite" aria-busy="true">
                <div class="spinner"></div>
                <p>Laddar filmer...</p>
            </div>

            <!-- Felmeddelande -->
            <div class="error-message" id="errorMessage" role="alert" aria-live="assertive">
                <p class="error-text"></p>
                <button class="retry-btn" id="retryBtn">Försök igen</button>
            </div>

            <!-- Filmgalleri -->
            <section class="movies-section" aria-labelledby="movies-title">
                <h2 id="movies-title">Populära filmer</h2>
                <div class="movies-grid" id="moviesGrid">
                    <!-- Filmkort genereras dynamiskt här -->
                </div>
            </section>

            <!-- Load more-knapp -->
            <div class="load-more-section">
                <button class="btn btn-primary" id="loadMoreBtn">Ladda fler filmer</button>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="main-footer">
        <div class="container">
            <p>&copy; 2025 Filmbibliotek. Skapad med ❤️ i Frontend 1-kursen</p>
            <div class="footer-links">
                <a href="#" class="footer-link">Om oss</a>
                <a href="#" class="footer-link">Kontakt</a>
                <a href="#" class="footer-link">Integritet</a>
            </div>
        </div>
    </footer>

    <!-- Modal för filmdetaljer -->
    <div class="modal" id="movieModal" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-overlay" id="modalOverlay"></div>
        <div class="modal-content">
            <button class="modal-close" id="modalClose" aria-label="Stäng modal">×</button>
            <div class="modal-body" id="modalBody">
                <!-- Innehåll läggs in dynamiskt -->
            </div>
        </div>
    </div>
</body>
</html>
```

### 1.2 Skapa `favorites.html`

```html
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mina favoriter - Filmbibliotek</title>
    
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
    
    <!-- JavaScript Module -->
    <script type="module" src="js/favorites.js" defer></script>
</head>
<body>
    <header class="main-header">
        <div class="container">
            <div class="header-content">
                <h1 class="logo">🎬 Filmbibliotek</h1>
                
                <nav class="main-nav">
                    <ul class="nav-list">
                        <li><a href="index.html" class="nav-link">Hem</a></li>
                        <li><a href="favorites.html" class="nav-link active">
                            Favoriter <span class="favorites-count">0</span>
                        </a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <main class="main-content">
        <div class="container">
            <section class="favorites-section">
                <h2>Mina Favoritfilmer</h2>
                
                <!-- Tomt state -->
                <div class="empty-state" id="emptyState">
                    <p class="empty-icon">📽️</p>
                    <h3>Inga favoriter ännu</h3>
                    <p>Börja lägga till filmer genom att klicka på hjärtikonen!</p>
                    <a href="index.html" class="btn btn-primary">Bläddra bland filmer</a>
                </div>

                <!-- Favoritfilmer -->
                <div class="movies-grid" id="favoritesGrid">
                    <!-- Favoritfilmer läggs in här -->
                </div>
            </section>
        </div>
    </main>

    <footer class="main-footer">
        <div class="container">
            <p>&copy; 2025 Filmbibliotek. Skapad med ❤️ i Frontend 1-kursen</p>
        </div>
    </footer>
</body>
</html>
```

### 1.3 Skapa `movie-details.html`

```html
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filmdetaljer - Filmbibliotek</title>
    
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
    
    <!-- JavaScript Module -->
    <script type="module" src="js/movie-details.js" defer></script>
</head>
<body>
    <header class="main-header">
        <div class="container">
            <div class="header-content">
                <h1 class="logo">🎬 Filmbibliotek</h1>
                
                <nav class="main-nav">
                    <ul class="nav-list">
                        <li><a href="index.html" class="nav-link">Hem</a></li>
                        <li><a href="favorites.html" class="nav-link">
                            Favoriter <span class="favorites-count">0</span>
                        </a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <main class="main-content">
        <div class="container">
            <!-- Loading spinner -->
            <div class="loading-spinner active" id="loadingSpinner">
                <div class="spinner"></div>
                <p>Laddar film...</p>
            </div>

            <!-- Felmeddelande -->
            <div class="error-message" id="errorMessage" role="alert">
                <p class="error-text">Film hittades inte</p>
                <a href="index.html" class="btn btn-primary">Tillbaka till start</a>
            </div>

            <!-- Filmdetaljer -->
            <article class="movie-details" id="movieDetails">
                <button class="back-btn" id="backBtn" aria-label="Tillbaka">
                    ← Tillbaka
                </button>

                <div class="movie-details-grid">
                    <!-- Vänster kolumn: Poster -->
                    <div class="movie-details-poster">
                        <img 
                            id="moviePoster" 
                            src="" 
                            alt="Film poster" 
                            class="details-poster-img"
                        >
                    </div>

                    <!-- Höger kolumn: Information -->
                    <div class="movie-details-info">
                        <h1 id="movieTitle" class="details-title"></h1>
                        
                        <div class="details-meta">
                            <span class="meta-item" id="movieRating"></span>
                            <span class="meta-item" id="movieYear"></span>
                            <span class="meta-item" id="movieRuntime"></span>
                        </div>

                        <div class="details-genres" id="movieGenres">
                            <!-- Genrer läggs in här -->
                        </div>

                        <div class="details-actions">
                            <button class="btn btn-primary favorite-detail-btn" id="favoriteBtn">
                                🤍 Lägg till favorit
                            </button>
                            <button class="btn btn-secondary share-btn" id="shareBtn">
                                🔗 Dela
                            </button>
                        </div>

                        <section class="details-section">
                            <h2>Handling</h2>
                            <p id="movieOverview" class="details-overview"></p>
                        </section>

                        <section class="details-section">
                            <h2>Detaljer</h2>
                            <dl class="details-list">
                                <dt>Regissör:</dt>
                                <dd id="movieDirector"></dd>
                                
                                <dt>Skådespelare:</dt>
                                <dd id="movieCast"></dd>
                                
                                <dt>Premiär:</dt>
                                <dd id="movieReleaseDate"></dd>
                            </dl>
                        </section>
                    </div>
                </div>
            </article>
        </div>
    </main>

    <footer class="main-footer">
        <div class="container">
            <p>&copy; 2025 Filmbibliotek. Skapad med ❤️ i Frontend 1-kursen</p>
        </div>
    </footer>
</body>
</html>
```

---

## **Del 2: CSS-styling**

### 2.1 Skapa `css/styles.css` (Grundläggande styles)

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

/* ===========================
   Container och layout
   =========================== */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}

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

### 2.2 Skapa `css/components.css` (Komponenter)

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

/* ===========================
   Movie Grid (CSS Grid)
   =========================== */
.movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

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

### 2.3 Skapa `css/responsive.css` (Media queries)

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

/* ===========================
   Desktop large (min-width: 1400px)
   =========================== */
@media screen and (min-width: 1400px) {
    .movies-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}

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

---

## **Del 3: JavaScript**

### 3.1 Skapa `js/utils.js` (Hjälpfunktioner)

```javascript
// ===========================
// Hjälpfunktioner
// ===========================

export const Utils = {
    /**
     * Debounce-funktion för att begränsa funktionsanrop
     * @param {Function} func - Funktion att debounce
     * @param {number} delay - Fördröjning i millisekunder
     */
    debounce(func, delay = 300) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Formatera datum till läsbart format
     * @param {string} dateString - Datum som sträng
     */
    formatDate(dateString) {
        if (!dateString) return 'Okänt';
        
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('sv-SE', options);
    },

    /**
     * Trunkera text till viss längd
     * @param {string} text - Text att trunkera
     * @param {number} maxLength - Max längd
     */
    truncateText(text, maxLength = 150) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    /**
     * Generera slumpmässig ID
     */
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Validera om ett värde är tomt
     */
    isEmpty(value) {
        return value === null || value === undefined || value === '';
    },

    /**
     * Visa toast-meddelande
     * @param {string} message - Meddelande att visa
     * @param {string} type - success, error, info
     */
    showToast(message, type = 'info') {
        // Skapa toast-element om det inte finns
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        // Sätt innehåll och typ
        toast.textContent = message;
        toast.className = `toast toast-${type} active`;

        // Ta bort efter 3 sekunder
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
};

// Lägg till toast-styling dynamiskt
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: #333;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 9999;
    }
    
    .toast.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-success { background-color: #10b981; }
    .toast-error { background-color: #ef4444; }
    .toast-info { background-color: #3b82f6; }
`;
document.head.appendChild(toastStyle);
```

### 3.2 Skapa `js/storage.js` (localStorage-hantering)

```javascript
// ===========================
// LocalStorage-hantering
// ===========================

export const Storage = {
    // Keys för localStorage
    KEYS: {
        FAVORITES: 'moviedb_favorites',
        THEME: 'moviedb_theme',
        RECENT_SEARCHES: 'moviedb_recent_searches'
    },

    /**
     * Spara data till localStorage
     * @param {string} key - Nyckel
     * @param {*} data - Data att spara
     */
    set(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    /**
     * Hämta data från localStorage
     * @param {string} key - Nyckel
     */
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    /**
     * Ta bort data från localStorage
     * @param {string} key - Nyckel
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    /**
     * Rensa all data
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    // ===========================
    // Favoriter
    // ===========================

    /**
     * Hämta alla favoritfilmer
     */
    getFavorites() {
        return this.get(this.KEYS.FAVORITES) || [];
    },

    /**
     * Lägg till film till favoriter
     * @param {Object} movie - Filmobjekt
     */
    addFavorite(movie) {
        const favorites = this.getFavorites();
        
        // Kontrollera om filmen redan finns
        const exists = favorites.some(fav => fav.id === movie.id);
        if (exists) {
            return false;
        }

        favorites.push(movie);
        this.set(this.KEYS.FAVORITES, favorites);
        return true;
    },

    /**
     * Ta bort film från favoriter
     * @param {number} movieId - Film-ID
     */
    removeFavorite(movieId) {
        const favorites = this.getFavorites();
        const filtered = favorites.filter(movie => movie.id !== movieId);
        this.set(this.KEYS.FAVORITES, filtered);
        return true;
    },

    /**
     * Kontrollera om film är favorit
     * @param {number} movieId - Film-ID
     */
    isFavorite(movieId) {
        const favorites = this.getFavorites();
        return favorites.some(movie => movie.id === movieId);
    },

    /**
     * Toggla favorit-status
     * @param {Object} movie - Filmobjekt
     */
    toggleFavorite(movie) {
        if (this.isFavorite(movie.id)) {
            this.removeFavorite(movie.id);
            return false; // Inte längre favorit
        } else {
            this.addFavorite(movie);
            return true; // Nu favorit
        }
    },

    // ===========================
    // Senaste sökningar
    // ===========================

    /**
     * Hämta senaste sökningar
     */
    getRecentSearches() {
        return this.get(this.KEYS.RECENT_SEARCHES) || [];
    },

    /**
     * Lägg till sökning
     * @param {string} searchTerm - Sökterm
     */
    addRecentSearch(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') return;

        let searches = this.getRecentSearches();
        
        // Ta bort om den redan finns
        searches = searches.filter(term => term !== searchTerm);
        
        // Lägg till i början
        searches.unshift(searchTerm);
        
        // Behåll bara de 10 senaste
        searches = searches.slice(0, 10);
        
        this.set(this.KEYS.RECENT_SEARCHES, searches);
    },

    /**
     * Rensa senaste sökningar
     */
    clearRecentSearches() {
        this.remove(this.KEYS.RECENT_SEARCHES);
    }
};
```

### 3.3 Skapa `js/api.js` (API-hantering med OOP)

```javascript
// ===========================
// API-hantering med klass
// ===========================

export class MovieAPI {
    constructor() {
        // Base URL för API (simulerad - du kan byta till riktigt API)
        this.baseURL = 'https://api.example.com/movies'; // Byt ut mot riktigt API
        this.currentPage = 1;
        this.totalPages = 0;
    }

    /**
     * Simulerad API-anrop (generera mockdata)
     * I produktion skulle detta vara en riktig fetch till backend
     */
    async fetchMovies(page = 1) {
        try {
            // Simulera nätverksfördröjning
            await this.delay(500);

            // Generera mockdata (i produktion: fetch från backend)
            const movies = this.generateMockMovies(page);
            
            this.currentPage = page;
            this.totalPages = 10; // Simulerat

            return {
                success: true,
                data: movies,
                page: this.currentPage,
                totalPages: this.totalPages
            };

        } catch (error) {
            console.error('Error fetching movies:', error);
            throw new Error('Kunde inte hämta filmer. Försök igen senare.');
        }
    }

    /**
     * Sök efter filmer
     * @param {string} query - Sökterm
     */
    async searchMovies(query) {
        try {
            await this.delay(300);

            // I produktion: fetch med query-parameter
            // const response = await fetch(`${this.baseURL}/search?q=${query}`);
            
            const allMovies = this.generateMockMovies(1, 50);
            const filtered = allMovies.filter(movie => 
                movie.title.toLowerCase().includes(query.toLowerCase()) ||
                movie.overview.toLowerCase().includes(query.toLowerCase())
            );

            return {
                success: true,
                data: filtered
            };

        } catch (error) {
            console.error('Error searching movies:', error);
            throw new Error('Sökningen misslyckades.');
        }
    }

    /**
     * Hämta film efter ID
     * @param {number} movieId - Film-ID
     */
    async getMovieById(movieId) {
        try {
            await this.delay(200);

            // I produktion: fetch med ID
            // const response = await fetch(`${this.baseURL}/${movieId}`);
            
            const movie = this.generateMockMovie(movieId);

            return {
                success: true,
                data: movie
            };

        } catch (error) {
            console.error('Error fetching movie:', error);
            throw new Error('Kunde inte hämta filmdetaljer.');
        }
    }

    /**
     * Filtrera filmer efter genre
     * @param {string} genre - Genre
     */
    async filterByGenre(genre) {
        try {
            await this.delay(300);

            const allMovies = this.generateMockMovies(1, 30);
            const filtered = genre 
                ? allMovies.filter(movie => 
                    movie.genre.toLowerCase().includes(genre.toLowerCase())
                  )
                : allMovies;

            return {
                success: true,
                data: filtered
            };

        } catch (error) {
            console.error('Error filtering movies:', error);
            throw new Error('Filtrering misslyckades.');
        }
    }

    // ===========================
    // Hjälpmetoder
    // ===========================

    /**
     * Simulera fördröjning (för mockdata)
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Generera mockfilmer
     */
    generateMockMovies(page = 1, count = 20) {
        const movies = [];
        const startId = (page - 1) * count + 1;

        const titles = [
            'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
            'Pulp Fiction', 'Forrest Gump', 'Inception', 'Fight Club',
            'The Matrix', 'Goodfellas', 'Se7en', 'Interstellar',
            'The Silence of the Lambs', 'Saving Private Ryan', 'The Green Mile',
            'Life is Beautiful', 'The Prestige', 'The Lion King',
            'Back to the Future', 'The Pianist', 'Gladiator',
            'Casablanca', 'Schindler\'s List', 'City of God',
            'The Departed', 'Whiplash', 'The Intouchables'
        ];

        const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];
        
        const overviews = [
            'En episk berättelse om hopp och vänskap.',
            'Ett mästerverk som definierade en generation.',
            'En intensiv thriller som håller dig på helspänn.',
            'En emotionell resa genom tid och rum.',
            'Ett visuellt spektakel med djup mening.'
        ];

        for (let i = 0; i < count; i++) {
            const id = startId + i;
            movies.push({
                id: id,
                title: titles[i % titles.length] + ` ${Math.floor(i / titles.length) + 1}`,
                year: 1990 + (i % 30),
                rating: (7 + Math.random() * 2).toFixed(1),
                genre: genres[i % genres.length],
                overview: overviews[i % overviews.length],
                poster: `https://via.placeholder.com/300x450/1e293b/ffffff?text=${encodeURIComponent(titles[i % titles.length])}`,
                director: 'Steven Spielberg',
                cast: ['Actor A', 'Actor B', 'Actor C'],
                runtime: 120 + (i % 60),
                releaseDate: `${1990 + (i % 30)}-${String((i % 12) + 1).padStart(2, '0')}-15`
            });
        }

        return movies;
    }

    /**
     * Generera enskild mockfilm
     */
    generateMockMovie(id) {
        const movies = this.generateMockMovies(1, 100);
        return movies.find(m => m.id === id) || movies[0];
    }
}
```

### 3.4 Skapa `js/ui.js` (UI-komponenter)

```javascript
// ===========================
// UI-komponenter och rendering
// ===========================

import { Storage } from './storage.js';
import { Utils } from './utils.js';

export const UI = {
    /**
     * Skapa filmkort
     * @param {Object} movie - Filmobjekt
     */
    createMovieCard(movie) {
        const card = document.createElement('article');
        card.className = 'movie-card';
        card.setAttribute('data-movie-id', movie.id);
        
        // Lägg till favorit-klass om filmen är favorit
        if (Storage.isFavorite(movie.id)) {
            card.classList.add('is-favorite');
        }

        const isFavorite = Storage.isFavorite(movie.id);
        
        card.innerHTML = `
            <img 
                src="${movie.poster}" 
                alt="${movie.title} poster" 
                class="movie-poster"
                loading="lazy"
            >
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${movie.year}</span>
                    <span class="movie-rating">${movie.rating}</span>
                </div>
                <p class="movie-genre">${movie.genre}</p>
                <p class="movie-overview">
                    ${Utils.truncateText(movie.overview, 120)}
                </p>
                <div class="movie-actions">
                    <button 
                        class="favorite-btn ${isFavorite ? 'active' : ''}" 
                        data-movie-id="${movie.id}"
                        aria-label="${isFavorite ? 'Ta bort från favoriter' : 'Lägg till som favorit'}"
                    >
                        ${isFavorite ? '❤️ Favorit' : '🤍 Favorit'}
                    </button>
                    <a 
                        href="movie-details.html?id=${movie.id}" 
                        class="details-btn"
                        aria-label="Visa detaljer för ${movie.title}"
                    >
                        Mer info
                    </a>
                </div>
            </div>
        `;

        // Event listeners
        this.attachCardEvents(card, movie);

        return card;
    },

    /**
     * Bifoga event listeners till kort
     */
    attachCardEvents(card, movie) {
        // Favorit-knapp
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleFavoriteClick(movie, card);
        });

        // Hela kortet klickbart (navigerar till detaljsida)
        card.addEventListener('click', (e) => {
            // Om användaren klickade på favorit-knappen eller länken, ignorera
            if (e.target.closest('.favorite-btn') || e.target.closest('.details-btn')) {
                return;
            }
            // Annars navigera till detaljsidan
            window.location.href = `movie-details.html?id=${movie.id}`;
        });
    },

    /**
     * Hantera favorit-klick
     */
    handleFavoriteClick(movie, card) {
        const isFavorite = Storage.toggleFavorite(movie);
        
        // Uppdatera UI
        const btn = card.querySelector('.favorite-btn');
        if (isFavorite) {
            btn.textContent = '❤️ Favorit';
            btn.classList.add('active');
            card.classList.add('is-favorite');
            Utils.showToast('Tillagd i favoriter!', 'success');
        } else {
            btn.textContent = '🤍 Favorit';
            btn.classList.remove('active');
            card.classList.remove('is-favorite');
            Utils.showToast('Borttagen från favoriter', 'info');
        }

        this.updateFavoritesCount();
    },

    /**
     * Visa film i modal
     */
    showMovieModal(movie) {
        const modal = document.getElementById('movieModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <img 
                src="${movie.poster}" 
                alt="${movie.title} poster" 
                class="modal-poster"
            >
            <h2 class="modal-title">${movie.title}</h2>
            
            <div class="genre-chips">
                ${movie.genre.split(',').map(g => 
                    `<span class="genre-chip">${g.trim()}</span>`
                ).join('')}
            </div>
            
            <div class="modal-meta">
                <span class="modal-meta-item">⭐ ${movie.rating}/10</span>
                <span class="modal-meta-item">📅 ${movie.year}</span>
                <span class="modal-meta-item">⏱️ ${movie.runtime} min</span>
            </div>
            
            <h3>Handling</h3>
            <p class="modal-overview">${movie.overview}</p>
            
            <h3>Detaljer</h3>
            <p><strong>Regissör:</strong> ${movie.director}</p>
            <p><strong>Skådespelare:</strong> ${movie.cast.join(', ')}</p>
            <p><strong>Premiär:</strong> ${Utils.formatDate(movie.releaseDate)}</p>
            
            <div class="modal-actions">
                <button class="btn btn-primary favorite-modal-btn">
                    ${Storage.isFavorite(movie.id) ? '❤️ Favorit' : '🤍 Lägg till favorit'}
                </button>
            </div>
        `;

        // Favorit-knapp i modal
        const favoriteModalBtn = modalBody.querySelector('.favorite-modal-btn');
        favoriteModalBtn.addEventListener('click', () => {
            const isFavorite = Storage.toggleFavorite(movie);
            favoriteModalBtn.textContent = isFavorite ? '❤️ Favorit' : '🤍 Lägg till favorit';
            this.updateFavoritesCount();
            
            // Uppdatera kort om det finns
            const card = document.querySelector(`[data-movie-id="${movie.id}"]`);
            if (card) {
                const btn = card.querySelector('.favorite-btn');
                btn.textContent = isFavorite ? '❤️ Favorit' : '🤍 Favorit';
                btn.classList.toggle('active', isFavorite);
                card.classList.toggle('is-favorite', isFavorite);
            }
        });

        // Visa modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Förhindra scroll
    },

    /**
     * Stäng modal
     */
    closeModal() {
        const modal = document.getElementById('movieModal');
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Återställ scroll
    },

    /**
     * Rendera filmer till grid
     */
    renderMovies(movies, container) {
        container.innerHTML = '';
        
        if (!movies || movies.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <p class="empty-icon">🎬</p>
                    <h3>Inga filmer hittades</h3>
                    <p>Försök med en annan sökning eller filter</p>
                </div>
            `;
            return;
        }

        // Använd document fragment för bättre prestanda
        const fragment = document.createDocumentFragment();
        
        movies.forEach(movie => {
            const card = this.createMovieCard(movie);
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    },

    /**
     * Visa loading state
     */
    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.classList.add('active');
        }
    },

    /**
     * Göm loading state
     */
    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.classList.remove('active');
        }
    },

    /**
     * Visa felmeddelande
     */
    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.querySelector('.error-text').textContent = message;
            errorDiv.classList.add('active');
        }
    },

    /**
     * Göm felmeddelande
     */
    hideError() {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.classList.remove('active');
        }
    },

    /**
     * Uppdatera favoriter-räknare
     */
    updateFavoritesCount() {
        const favorites = Storage.getFavorites();
        const countElements = document.querySelectorAll('.favorites-count');
        countElements.forEach(el => {
            el.textContent = favorites.length;
        });
    }
};
```

### 3.5 Skapa `js/app.js` (Huvudapplikation)

```javascript
// ===========================
// Huvudapplikation
// ===========================

import { MovieAPI } from './api.js';
import { Storage } from './storage.js';
import { UI } from './ui.js';
import { Utils } from './utils.js';

class App {
    constructor() {
        this.movieAPI = new MovieAPI();
        this.currentMovies = [];
        this.currentPage = 1;
        this.isLoading = false;
        this.currentFilter = '';
        this.currentSearch = '';
        
        this.init();
    }

    /**
     * Initialisera applikationen
     */
    async init() {
        console.log('🎬 Filmbibliotek startar...');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Uppdatera favoriter-räknare
        UI.updateFavoritesCount();
        
        // Ladda initiala filmer
        await this.loadMovies();
    }

    /**
     * Setup alla event listeners
     */
    setupEventListeners() {
        // Sökformulär
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        
        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSearch(searchInput.value);
            });

            // Debounced search on input
            searchInput.addEventListener('input', Utils.debounce((e) => {
                if (e.target.value.length >= 3 || e.target.value.length === 0) {
                    this.handleSearch(e.target.value);
                }
            }, 500));
        }

        // Genre-filter
        const genreFilter = document.getElementById('genreFilter');
        if (genreFilter) {
            genreFilter.addEventListener('change', (e) => {
                this.handleGenreFilter(e.target.value);
            });
        }

        // Load more-knapp
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreMovies();
            });
        }

        // Modal-stängning
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => UI.closeModal());
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => UI.closeModal());
        }

        // ESC-tangent för att stänga modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                UI.closeModal();
            }
        });

        // Retry-knapp
        const retryBtn = document.getElementById('retryBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                UI.hideError();
                this.loadMovies();
            });
        }

        // Infinite scroll (optional)
        // window.addEventListener('scroll', Utils.debounce(() => {
        //     if (this.isNearBottom() && !this.isLoading) {
        //         this.loadMoreMovies();
        //     }
        // }, 300));
    }

    /**
     * Ladda filmer
     */
    async loadMovies(page = 1) {
        if (this.isLoading) return;

        this.isLoading = true;
        UI.showLoading();
        UI.hideError();

        try {
            const response = await this.movieAPI.fetchMovies(page);
            
            if (response.success) {
                this.currentMovies = response.data;
                this.currentPage = response.page;
                
                const grid = document.getElementById('moviesGrid');
                UI.renderMovies(this.currentMovies, grid);
            }

        } catch (error) {
            console.error('Error loading movies:', error);
            UI.showError(error.message || 'Kunde inte ladda filmer');
        } finally {
            this.isLoading = false;
            UI.hideLoading();
        }
    }

    /**
     * Ladda fler filmer
     */
    async loadMoreMovies() {
        if (this.isLoading) return;

        this.isLoading = true;
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Laddar...';
            loadMoreBtn.disabled = true;
        }

        try {
            const nextPage = this.currentPage + 1;
            const response = await this.movieAPI.fetchMovies(nextPage);
            
            if (response.success) {
                this.currentMovies = [...this.currentMovies, ...response.data];
                this.currentPage = response.page;
                
                const grid = document.getElementById('moviesGrid');
                
                // Lägg till nya kort utan att rensa befintliga
                const fragment = document.createDocumentFragment();
                response.data.forEach(movie => {
                    const card = UI.createMovieCard(movie);
                    fragment.appendChild(card);
                });
                grid.appendChild(fragment);
                
                Utils.showToast('Fler filmer laddade!', 'success');
            }

        } catch (error) {
            console.error('Error loading more movies:', error);
            Utils.showToast('Kunde inte ladda fler filmer', 'error');
        } finally {
            this.isLoading = false;
            
            if (loadMoreBtn) {
                loadMoreBtn.textContent = 'Ladda fler filmer';
                loadMoreBtn.disabled = false;
            }
        }
    }

    /**
     * Hantera sökning
     */
    async handleSearch(query) {
        this.currentSearch = query.trim();

        // Om sökningen är tom, ladda alla filmer igen
        if (this.currentSearch === '') {
            await this.loadMovies();
            return;
        }

        // Spara sökning
        Storage.addRecentSearch(this.currentSearch);

        UI.showLoading();
        UI.hideError();

        try {
            const response = await this.movieAPI.searchMovies(this.currentSearch);
            
            if (response.success) {
                this.currentMovies = response.data;
                const grid = document.getElementById('moviesGrid');
                UI.renderMovies(this.currentMovies, grid);
                
                if (response.data.length > 0) {
                    Utils.showToast(`Hittade ${response.data.length} filmer`, 'success');
                }
            }

        } catch (error) {
            console.error('Error searching movies:', error);
            UI.showError(error.message || 'Sökningen misslyckades');
        } finally {
            UI.hideLoading();
        }
    }

    /**
     * Hantera genre-filter
     */
    async handleGenreFilter(genre) {
        this.currentFilter = genre;

        UI.showLoading();
        UI.hideError();

        try {
            const response = await this.movieAPI.filterByGenre(genre);
            
            if (response.success) {
                this.currentMovies = response.data;
                const grid = document.getElementById('moviesGrid');
                UI.renderMovies(this.currentMovies, grid);
            }

        } catch (error) {
            console.error('Error filtering movies:', error);
            UI.showError(error.message || 'Filtrering misslyckades');
        } finally {
            UI.hideLoading();
        }
    }

    /**
     * Kontrollera om användaren är nära botten (för infinite scroll)
     */
    isNearBottom() {
        const threshold = 200;
        const position = window.scrollY + window.innerHeight;
        const height = document.documentElement.scrollHeight;
        return position >= height - threshold;
    }
}

// ===========================
// Starta applikationen
// ===========================

// Vänta tills DOM är laddad
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
```

### 3.6 Skapa `js/favorites.js` (Favoritsida)

```javascript
// ===========================
// Favoritsida
// ===========================

import { Storage } from './storage.js';
import { UI } from './ui.js';

// Ladda och visa favoriter
document.addEventListener('DOMContentLoaded', () => {
    const favorites = Storage.getFavorites();
    const grid = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (favorites.length === 0) {
        emptyState.style.display = 'block';
        grid.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        grid.style.display = 'grid';
        favorites.forEach(movie => {
            const card = UI.createMovieCard(movie);
            grid.appendChild(card);
        });
    }
    
    UI.updateFavoritesCount();
});
```

### 3.7 Skapa `js/movie-details.js` (Detaljsida)

```javascript
// ===========================
// Detaljsida för enskild film
// ===========================

import { MovieAPI } from './api.js';
import { Storage } from './storage.js';
import { UI } from './ui.js';
import { Utils } from './utils.js';

class MovieDetails {
    constructor() {
        this.movieAPI = new MovieAPI();
        this.movieId = null;
        this.currentMovie = null;
        
        this.init();
    }

    /**
     * Initialisera detaljsidan
     */
    async init() {
        console.log('🎬 Detaljsida startar...');
        
        // Hämta film-ID från URL
        this.movieId = this.getMovieIdFromURL();
        
        if (!this.movieId) {
            this.showError('Inget film-ID angivet');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Uppdatera favoriter-räknare
        UI.updateFavoritesCount();
        
        // Ladda filmdetaljer
        await this.loadMovieDetails();
    }

    /**
     * Hämta film-ID från URL query parameter
     */
    getMovieIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        return id ? parseInt(id) : null;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Tillbaka-knapp
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                // Använd history.back() om möjligt, annars gå till startsidan
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = 'index.html';
                }
            });
        }

        // Favorit-knapp
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', () => {
                this.toggleFavorite();
            });
        }

        // Dela-knapp
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareMovie();
            });
        }
    }

    /**
     * Ladda filmdetaljer från API
     */
    async loadMovieDetails() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const errorMessage = document.getElementById('errorMessage');
        const movieDetails = document.getElementById('movieDetails');

        try {
            // Visa loading
            if (loadingSpinner) loadingSpinner.classList.add('active');
            if (errorMessage) errorMessage.classList.remove('active');
            if (movieDetails) movieDetails.classList.remove('active');

            // Hämta film från API
            const response = await this.movieAPI.getMovieById(this.movieId);

            if (response.success && response.data) {
                this.currentMovie = response.data;
                this.renderMovieDetails(this.currentMovie);
                
                // Uppdatera sidtitel
                document.title = `${this.currentMovie.title} - Filmbibliotek`;
            } else {
                throw new Error('Film hittades inte');
            }

        } catch (error) {
            console.error('Error loading movie details:', error);
            this.showError('Kunde inte ladda filmdetaljer');
        } finally {
            // Göm loading
            if (loadingSpinner) loadingSpinner.classList.remove('active');
        }
    }

    /**
     * Rendera filmdetaljer på sidan
     */
    renderMovieDetails(movie) {
        // Uppdatera poster
        const posterImg = document.getElementById('moviePoster');
        if (posterImg) {
            posterImg.src = movie.poster;
            posterImg.alt = `${movie.title} poster`;
        }

        // Uppdatera titel
        const titleEl = document.getElementById('movieTitle');
        if (titleEl) {
            titleEl.textContent = movie.title;
        }

        // Uppdatera meta-information
        const ratingEl = document.getElementById('movieRating');
        if (ratingEl) {
            ratingEl.innerHTML = `⭐ ${movie.rating}/10`;
        }

        const yearEl = document.getElementById('movieYear');
        if (yearEl) {
            yearEl.textContent = movie.year;
        }

        const runtimeEl = document.getElementById('movieRuntime');
        if (runtimeEl) {
            runtimeEl.textContent = `${movie.runtime} min`;
        }

        // Uppdatera genrer
        const genresEl = document.getElementById('movieGenres');
        if (genresEl) {
            genresEl.innerHTML = movie.genre
                .split(',')
                .map(g => `<span class="genre-chip">${g.trim()}</span>`)
                .join('');
        }

        // Uppdatera handling
        const overviewEl = document.getElementById('movieOverview');
        if (overviewEl) {
            overviewEl.textContent = movie.overview;
        }

        // Uppdatera detaljer
        const directorEl = document.getElementById('movieDirector');
        if (directorEl) {
            directorEl.textContent = movie.director;
        }

        const castEl = document.getElementById('movieCast');
        if (castEl) {
            castEl.textContent = movie.cast.join(', ');
        }

        const releaseDateEl = document.getElementById('movieReleaseDate');
        if (releaseDateEl) {
            releaseDateEl.textContent = Utils.formatDate(movie.releaseDate);
        }

        // Uppdatera favorit-knapp
        this.updateFavoriteButton();

        // Visa filmdetaljer
        const movieDetails = document.getElementById('movieDetails');
        if (movieDetails) {
            movieDetails.classList.add('active');
        }
    }

    /**
     * Uppdatera favorit-knapp baserat på status
     */
    updateFavoriteButton() {
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (!favoriteBtn || !this.currentMovie) return;

        const isFavorite = Storage.isFavorite(this.currentMovie.id);

        if (isFavorite) {
            favoriteBtn.innerHTML = '❤️ Favorit';
            favoriteBtn.classList.add('active');
        } else {
            favoriteBtn.innerHTML = '🤍 Lägg till favorit';
            favoriteBtn.classList.remove('active');
        }
    }

    /**
     * Toggla favorit-status
     */
    toggleFavorite() {
        if (!this.currentMovie) return;

        const isFavorite = Storage.toggleFavorite(this.currentMovie);
        
        if (isFavorite) {
            Utils.showToast('Tillagd i favoriter!', 'success');
        } else {
            Utils.showToast('Borttagen från favoriter', 'info');
        }

        // Uppdatera knapp och räknare
        this.updateFavoriteButton();
        UI.updateFavoritesCount();
    }

    /**
     * Dela film (Web Share API eller fallback)
     */
    async shareMovie() {
        if (!this.currentMovie) return;

        const shareData = {
            title: this.currentMovie.title,
            text: `Kolla in ${this.currentMovie.title} på Filmbibliotek!`,
            url: window.location.href
        };

        // Använd Web Share API om tillgängligt
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                Utils.showToast('Film delad!', 'success');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                }
            }
        } else {
            // Fallback: kopiera länk till clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                Utils.showToast('Länk kopierad till urklipp!', 'success');
            } catch (error) {
                console.error('Error copying to clipboard:', error);
                Utils.showToast('Kunde inte kopiera länk', 'error');
            }
        }
    }

    /**
     * Visa felmeddelande
     */
    showError(message) {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const errorMessage = document.getElementById('errorMessage');
        const movieDetails = document.getElementById('movieDetails');

        if (loadingSpinner) loadingSpinner.classList.remove('active');
        if (movieDetails) movieDetails.classList.remove('active');
        
        if (errorMessage) {
            const errorText = errorMessage.querySelector('.error-text');
            if (errorText) {
                errorText.textContent = message;
            }
            errorMessage.classList.add('active');
        }
    }
}

// ===========================
// Starta detaljsidan
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    new MovieDetails();
});
```

---

## **🎯 Fördelar med ES6 Modules**

I detta projekt använder vi ES6 Modules (`import/export`) istället för att ladda flera `<script>`-taggar. Detta ger oss:

### ✅ Bättre kodorganisation
- Varje fil har ett specifikt ansvar (Separation of Concerns)
- `utils.js` - Hjälpfunktioner
- `storage.js` - localStorage-hantering
- `api.js` - API-kommunikation
- `ui.js` - UI-rendering
- `app.js` - Huvudlogik

### ✅ Tydliga beroenden
```javascript
// I ui.js kan vi se exakt vad filen behöver
import { Storage } from './storage.js';
import { Utils } from './utils.js';
```

### ✅ Inga globala variabler
- Tidigare: Alla variabler i `window`-objektet (risk för kollisioner)
- Nu: Varje modul har sitt eget scope
- Man måste explicit exportera/importera det man vill dela

### ✅ Enklare underhåll
- Lätt att hitta var kod används (sök efter imports)
- Lätt att refaktorera (IDE:n kan hjälpa till)
- Tydlig struktur gör det lätt för nya utvecklare att förstå projektet

### ✅ Automatisk defer
- Modules laddas alltid i defer-läge
- Scripten körs i rätt ordning
- DOM:en är redan laddad när modulen körs

### 📝 Jämförelse: Gammalt vs Nytt sätt

**Gammalt sätt (utan modules):**
```html
<script src="js/utils.js"></script>
<script src="js/storage.js"></script>
<script src="js/api.js"></script>
<script src="js/ui.js"></script>
<script src="js/app.js"></script>
```
- Ordningen måste vara rätt
- Allt är globalt
- Svårt att veta vilka filer som beror på varandra

**Nytt sätt (med modules):**
```html
<script type="module" src="js/app.js" defer></script>
```
- Endast EN script-tag behövs
- `app.js` importerar vad den behöver
- JavaScript-motorn hanterar laddningsordning
- Beroenden är explicita i koden

### 📊 Modulernas struktur och beroenden

```
index.html
    └── app.js (module entry point)
        ├── imports: MovieAPI (from api.js)
        ├── imports: Storage (from storage.js)
        ├── imports: UI (from ui.js)
        └── imports: Utils (from utils.js)

favorites.html
    └── favorites.js (module entry point)
        ├── imports: Storage (from storage.js)
        └── imports: UI (from ui.js)

movie-details.html
    └── movie-details.js (module entry point)
        ├── imports: MovieAPI (from api.js)
        ├── imports: Storage (from storage.js)
        ├── imports: UI (from ui.js)
        └── imports: Utils (from utils.js)

ui.js
    ├── imports: Storage (from storage.js)
    └── imports: Utils (from utils.js)

api.js (exporterar MovieAPI klass, inga dependencies)
storage.js (exporterar Storage objekt, inga dependencies)
utils.js (exporterar Utils objekt, inga dependencies)
```

**Laddningsordning (hanteras automatiskt):**
1. Browser läser `<script type="module" src="js/app.js">`
2. Browser hittar imports i `app.js`
3. Browser laddar `api.js`, `storage.js`, `utils.js` först
4. Browser hittar imports i `ui.js`
5. Kör alla moduler i rätt ordning
6. Slutligen körs `app.js`

---

## **🔗 Detaljsidan - Nya koncept**

Detaljsidan (`movie-details.html` & `movie-details.js`) introducerar flera viktiga koncept:

### 1. URL Query Parameters

Filmen identifieras via URL:en: `movie-details.html?id=123`

```javascript
// Hämta parameter från URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
```

**Fördelar:**
- ✅ Delningsbara länkar
- ✅ Bokmärkesbara sidor
- ✅ Browser-historik fungerar
- ✅ Tillbaka-knappen fungerar

### 2. Browser History API

```javascript
// Navigera tillbaka
if (window.history.length > 1) {
    window.history.back();
} else {
    window.location.href = 'index.html';
}
```

### 3. Web Share API

Moderna webbläsare stödjer delning av innehåll:

```javascript
if (navigator.share) {
    await navigator.share({
        title: 'Filmtitel',
        text: 'Beskrivning',
        url: window.location.href
    });
}
```

**Fallback:** Om Web Share API inte finns, kopiera länk till clipboard istället.

### 4. Dynamisk sidtitel

```javascript
document.title = `${movie.title} - Filmbibliotek`;
```

Detta gör att:
- Browser-tabben visar filmnamnet
- Bokmärken får rätt titel
- Bättre SEO

### 5. Navigation mellan sidor

**Från index.html till movie-details.html:**
```javascript
// Som länk
<a href="movie-details.html?id=${movie.id}">Mer info</a>

// Som JavaScript
window.location.href = `movie-details.html?id=${movie.id}`;
```

**Från movie-details.html tillbaka:**
```javascript
// Använd history API
window.history.back();

// Eller direktlänk
window.location.href = 'index.html';
```

---

## **Del 4: Testing och förbättringar**

### 4.1 Testplan

**Funktionella tester:**
- ✅ Kan man bläddra bland filmer?
- ✅ Fungerar sökfunktionen?
- ✅ Kan man filtrera efter genre?
- ✅ Går det att lägga till/ta bort favoriter?
- ✅ Sparas favoriter efter sidladdning?
- ✅ Öppnas och stängs modalen korrekt?
- ✅ Fungerar "Ladda fler"-knappen?
- ✅ Navigerar man till detaljsidan när man klickar på en film?
- ✅ Visas rätt filmdetaljer på detaljsidan?
- ✅ Fungerar tillbaka-knappen från detaljsidan?
- ✅ Kan man lägga till favoriter från detaljsidan?
- ✅ Fungerar dela-funktionen?
- ✅ Uppdateras sidtiteln korrekt?

**Responsiva tester:**
- ✅ Testa på mobil (< 768px)
- ✅ Testa på tablet (768-1024px)
- ✅ Testa på desktop (> 1024px)

**Tillgänglighetstester:**
- ✅ Kan man navigera med tangentbordet?
- ✅ Fungerar skärmläsare korrekt?
- ✅ Finns alt-texter på bilder?
- ✅ Är färgkontrasten tillräcklig?

**Prestandatester:**
- ✅ Laddas sidan snabbt?
- ✅ Är animationerna smidiga?
- ✅ Hanteras många filmkort bra?

### 4.2 Möjliga förbättringar

**Nivå 1 (Grundläggande):**
- Lägg till fler filter (årtal, betyg)
- Implementera sortering
- Lägg till "Tillbaka till toppen"-knapp
- Dark/Light mode toggle

**Nivå 2 (Medel):**
- Infinite scroll istället för "Ladda fler"
- Spara senaste sökningar och visa dem
- Implementera en "Loading skeleton"
- Lägg till en "Dela film"-funktion

**Nivå 3 (Avancerad):**
- Integrera med riktigt film-API (TMDB, OMDB)
- Lägg till användarrecensioner
- Implementera en watchlist
- Lägg till filmtrailers

---

## **Del 5: Integration med riktig backend**

### Byt ut mock-API mot riktig backend

När du har en riktig backend kan du enkelt byta ut mock-funktionerna:

```javascript
// I api.js, byt ut fetchMovies-metoden:

async fetchMovies(page = 1) {
    try {
        const response = await fetch(`${this.baseURL}/movies?page=${page}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            success: true,
            data: data.movies,
            page: data.page,
            totalPages: data.totalPages
        };
        
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}
```

### Exempel på backend-endpoints som behövs:

```
GET  /api/movies              - Hämta alla filmer (med pagination)
GET  /api/movies/:id          - Hämta specifik film
GET  /api/movies/search?q=... - Sök filmer
GET  /api/movies/genre/:genre - Filtrera efter genre
POST /api/movies              - Skapa ny film (admin)
PUT  /api/movies/:id          - Uppdatera film (admin)
DELETE /api/movies/:id        - Ta bort film (admin)
```

---

## **Del 6: Deployment**

### Checklista innan publicering:

1. ✅ Testa alla funktioner
2. ✅ Validera HTML (https://validator.w3.org/)
3. ✅ Validera CSS
4. ✅ Kontrollera JavaScript-fel i konsolen
5. ✅ Testa på olika webbläsare
6. ✅ Optimera bilder
7. ✅ Minifiera CSS och JavaScript (i produktion)
8. ✅ Lägg till meta-tags för SEO
9. ✅ Lägg till favicon
10. ✅ Testa laddningstider

---

## 🎓 Vad har vi lärt oss?

### HTML
- Semantiska element för bättre struktur och tillgänglighet
- Formulärhantering och validering
- Data-attribut för att lagra metadata
- ARIA-attribut för tillgänglighet

### CSS
- **CSS Grid** för gallery-layouts
- **Flexbox** för flexibla komponenter
- **Media queries** för responsiv design
- **Pseudo-klasser** för interaktivitet
- **Pseudo-element** för dekorativa effekter
- CSS-variabler för konsekvent design
- Animationer och transitions

### JavaScript
- **ES6 Modules** med import/export för modulär kodstruktur
- **OOP** med klasser (MovieAPI, App, MovieDetails)
- **Async/Await** för asynkrona operationer
- **Try-catch** för felhantering
- **LocalStorage** för persistent data
- **Array methods** (map, filter, forEach, find)
- **DOM-manipulation** (createElement, querySelector, etc.)
- **Event handling** och delegation
- **Debouncing** för prestanda
- **URL Parameters** (URLSearchParams för routing)
- **History API** (browser navigation)
- **Web Share API** med fallback
- **Clipboard API** för kopiera text
- **Modulär arkitektur** med separation of concerns

---

## 📝 Slutsats

Detta projekt kombinerar allt du har lärt dig i Frontend 1-kursen till en fullständig, professionell webbapplikation. Projektet demonstrerar:

- ✅ Modern HTML-struktur
- ✅ Avancerad CSS med responsiv design
- ✅ Professionell JavaScript-arkitektur
- ✅ API-integration (förberedelse för backend)
- ✅ State management med localStorage
- ✅ Användarvänlig UI/UX
- ✅ Tillgänglighet och prestanda
- ✅ Skalbar och underhållbar kod

**Lycka till med projektet! 🎬🍿**

---

## 💡 Extra utmaningar

1. Lägg till möjlighet att skapa egna spellistor
2. Implementera en "Random film"-funktion
3. Lägg till filmtrailers med YouTube-integration
4. Skapa en "Rekommenderade filmer"-sektion
5. Implementera användarrecensioner och betyg
6. Lägg till dela-funktioner för sociala medier
7. Skapa en "Watched films"-lista
8. Implementera multi-språkstöd (i18n)

---

## 🐛 Felsökning och vanliga fel

### Problem: "Failed to load module script"

**Orsak:** Projektet öppnas med `file://` protokoll istället för HTTP-server.

**Lösning:** Starta en lokal HTTP-server (se instruktioner ovan).

### Problem: "Uncaught SyntaxError: Cannot use import statement outside a module"

**Orsak:** Script-taggen saknar `type="module"` attribut.

**Lösning:** 
```html
<!-- Fel -->
<script src="js/app.js"></script>

<!-- Rätt -->
<script type="module" src="js/app.js"></script>
```

### Problem: Modules laddas inte i rätt ordning

**Orsak:** Detta ska inte hända med ES6 modules - browsern hanterar ordningen.

**Lösning:** Kontrollera att alla imports har rätt filsökväg:
```javascript
// Rätt
import { Storage } from './storage.js';

// Fel (glöm inte .js)
import { Storage } from './storage';
```

### Problem: "Storage is not defined" eller liknande

**Orsak:** Glömt att importera modulen eller exportera från modulen.

**Lösning:** 
```javascript
// I storage.js - glöm inte export
export const Storage = { ... };

// I annan fil - glöm inte import
import { Storage } from './storage.js';
```

### Debugging-tips

**1. Kontrollera Network-fliken i DevTools:**
- Öppna DevTools (F12)
- Gå till Network-fliken
- Ladda om sidan
- Se till att alla `.js`-filer laddas med status 200

**2. Kontrollera Console-fliken:**
- Modulfel visas tydligt i konsolen
- Läs felmeddelandet noga - det säger ofta exakt vad som är fel

**3. Använd `console.log()` för att debugga:**
```javascript
// I början av varje modul för att se när den laddas
console.log('✅ storage.js loaded');
```

**4. Sätt breakpoints:**
- Gå till Sources-fliken i DevTools
- Hitta din fil och sätt breakpoints
- Stega igenom koden för att se vad som händer
