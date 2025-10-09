# Steg 2: HTML - Grundstruktur

Nu bygger vi HTML-strukturen för alla tre sidorna. Vi fokuserar på **semantisk HTML** och **tillgänglighet**.

---

## 🎯 Mål för detta steg

- ✅ Skapa `index.html` med filmgalleri
- ✅ Skapa `favorites.html` för favoriter
- ✅ Skapa `movie-details.html` för filmdetaljer
- ✅ Förstå semantiska HTML-element
- ✅ Lära sig om tillgänglighet (ARIA)

---

## 📄 Del 1: index.html

Öppna `index.html` och lägg till följande kod:

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

### 🔍 Förklaring av viktiga delar:

**`<header>` - Semantiskt element för sidhuvud**
- Innehåller logotyp och navigation
- Används endast en gång per sida

**`<nav>` - Navigationselement**
- `aria-label="Huvudnavigation"` för skärmläsare
- `.active` klass markerar aktuell sida

**`<section>` - Tematiska sektioner**
- `aria-labelledby` kopplar sektion till rubrik
- Varje sektion har ett tydligt syfte

**`<main>` - Huvudinnehåll**
- Endast ett `<main>` per sida
- Innehåller det primära innehållet

**`<footer>` - Sidfot**
- Metadata och länkar

**ARIA-attribut:**
- `aria-label` - Beskrivande text för skärmläsare
- `aria-live` - Meddelar förändringar dynamiskt
- `aria-hidden` - Döljer element från skärmläsare
- `role` - Definierar elementets roll

---

## 📄 Del 2: favorites.html

Skapa `favorites.html`:

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

### 🔍 Skillnader från index.html:

- **Enklare struktur** - ingen sök eller filter
- **Empty state** - meddelande när inga favoriter finns
- **Annan JavaScript-fil** - `favorites.js` istället för `app.js`

---

## 📄 Del 3: movie-details.html

Skapa `movie-details.html`:

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

### 🔍 Nya element i detaljsidan:

**`<article>` - Självständigt innehåll**
- Används för filmdetaljer som kan stå för sig själv

**`<dl>`, `<dt>`, `<dd>` - Definition list**
- Perfekt för nyckel-värde par (Regissör: Namn)

---

## 🎓 Vad vi använder

### **Semantiska HTML5-element:**

| Element | Syfte | Exempel |
|---------|-------|---------|
| `<header>` | Sidhuvud | Logo och navigation |
| `<nav>` | Navigation | Meny med länkar |
| `<main>` | Huvudinnehåll | Sidans primära innehåll |
| `<section>` | Tematisk sektion | Hero, sök, filmlista |
| `<article>` | Självständigt innehåll | Filmdetaljer |
| `<footer>` | Sidfot | Copyright och länkar |

### **Tillgänglighet (ARIA):**

| Attribut | Syfte |
|----------|-------|
| `aria-label` | Beskrivande text för skärmläsare |
| `aria-labelledby` | Koppla element till sin rubrik |
| `aria-live` | Meddela dynamiska uppdateringar |
| `aria-hidden` | Dölj element från skärmläsare |
| `role` | Definiera elementets roll |

---

## ✅ Testa ditt arbete

1. **Öppna index.html** i webbläsaren via din HTTP-server
2. **Kontrollera att sidan laddas** (även om det inte finns någon styling än)
3. **Testa navigation** - klicka på "Favoriter" länken
4. **Öppna movie-details.html** direkt (utan ID än)
5. **Inspektera HTML** - öppna DevTools och kolla Elements-fliken

### **Vad du bör se:**
- ✅ Sid-strukturen visas (utan styling)
- ✅ Länkar fungerar mellan sidorna
- ✅ Inga JavaScript-fel i Console

---

## ✅ Checklista

- [ ] `index.html` är skapad med komplett struktur
- [ ] `favorites.html` är skapad
- [ ] `movie-details.html` är skapad
- [ ] Alla sidor laddar utan fel
- [ ] Navigation fungerar mellan sidorna
- [ ] Inga fel i browser Console

---

## 🎓 Vad du lärt dig

- ✅ Semantiska HTML5-element (`header`, `nav`, `main`, `section`, `article`, `footer`)
- ✅ Formulär och input-element
- ✅ ARIA-attribut för tillgänglighet
- ✅ Struktur för multi-page applikation
- ✅ ES6 Modules i `<script>`-taggar

---

## 💡 Tips

- **Semantisk HTML** gör din kod lättare att förstå och underhålla
- **ARIA-attribut** förbättrar tillgängligheten för alla användare
- **`<div>` och `<span>`** är generiska - använd semantiska element när möjligt
- **Validera din HTML** på https://validator.w3.org/

---

## ➡️ Nästa steg

Nu har vi HTML-strukturen klar! Dags att göra det snyggt med CSS.

**Gå vidare till:** [Steg 3: CSS - Bas-styling](./steg-3-css-bas.md)

---

[⬅️ Steg 1: Setup](./steg-1-setup.md) | [📚 Innehåll](./README.md) | [Steg 3: CSS Bas →](./steg-3-css-bas.md)
