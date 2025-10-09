# Steg 9: JavaScript - Huvudapplikation

Nu skapar vi huvudapplikationen som samordnar allt - API, UI och användarinteraktioner.

---

## 🎯 Mål för detta steg

- ✅ Skapa App-klassen som samordnar alla moduler
- ✅ Implementera event handling för sök och filter
- ✅ Hantera state och data-flöde
- ✅ Implementera pagination (ladda fler)
- ✅ Koppla ihop alla delar till en fungerande app

---

## 🚀 js/app.js

Öppna `js/app.js` och lägg till följande:

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

---

## 🔍 Koncept-förklaring

### **1. App-klass som Orchestrator**

```javascript
class App {
    constructor() {
        this.movieAPI = new MovieAPI();  // API-hantering
        this.currentMovies = [];         // Nuvarande data
        this.currentPage = 1;            // Pagination state
        this.isLoading = false;          // Loading state
    }
}
```

**App-klassen:**
- Samordnar alla andra moduler
- Håller application state
- Hanterar användarinteraktioner
- Koordinerar data-flöde

### **2. State Management**

```javascript
this.currentMovies = [];    // Vilka filmer visas nu
this.currentPage = 1;       // Vilken sida är vi på
this.isLoading = false;     // Laddar vi data just nu
this.currentFilter = '';    // Vilket filter är aktivt
this.currentSearch = '';    // Vad söker användaren efter
```

**State** = Applikationens tillstånd vid en given tidpunkt

**Varför hålla state?**
- Vet vad som visas
- Kan ladda nästa sida
- Förhindra dubbelklick under laddning

### **3. Debouncing för Sökning**

```javascript
searchInput.addEventListener('input', Utils.debounce((e) => {
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
        this.handleSearch(e.target.value);
    }
}, 500));
```

**Utan debounce:**
- Varje tangent → API-anrop
- "react" → 5 API-anrop (r, e, a, c, t)
- Slösar resurser

**Med debounce:**
- Väntar 500ms efter sista tangenten
- "react" → 1 API-anrop
- Mycket mer effektivt

### **4. Event Delegation Pattern**

```javascript
setupEventListeners() {
    // Setup en gång
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSearch(searchInput.value);
    });
}
```

**Fördel:**
- Setup event listeners en gång vid start
- Fungerar för alla framtida element
- Centraliserad event-hantering

### **5. Loading State Guard**

```javascript
async loadMovies(page = 1) {
    if (this.isLoading) return;  // Guard clause
    
    this.isLoading = true;
    // ... ladda data
    this.isLoading = false;
}
```

**Förhindrar:**
- Dubbelklick under laddning
- Flera samtidiga API-anrop
- Race conditions

### **6. Try-Catch med Finally**

```javascript
try {
    // Försök göra något
    const response = await this.movieAPI.fetchMovies(page);
} catch (error) {
    // Om det går fel
    UI.showError(error.message);
} finally {
    // Körs alltid, oavsett om det lyckas eller misslyckas
    this.isLoading = false;
    UI.hideLoading();
}
```

**Finally** = Städkod som alltid körs

### **7. Spread Operator för Array**

```javascript
// Lägga till nya filmer till befintliga
this.currentMovies = [...this.currentMovies, ...response.data];

// Samma som:
this.currentMovies = this.currentMovies.concat(response.data);
```

**`...` operator:**
- Sprider ut array-element
- Skapar ny array (immutability)
- Modern ES6-syntax

---

## ✅ Testa ditt arbete

Nu ska hela appen fungera!

### **Test 1: Sidan laddar**

1. Öppna `index.html` i webbläsaren (via HTTP-server)
2. Filmer ska ladda automatiskt
3. Loading spinner visas först
4. Filmkort visas efter laddning

### **Test 2: Sökfunktion**

1. Skriv i sökfältet
2. Vänta 500ms (debounce)
3. Filmer filtreras baserat på sökning
4. Tom sökning visar alla filmer igen

### **Test 3: Genre-filter**

1. Välj en genre från dropdown
2. Endast filmer i den genren visas
3. "Alla genrer" visar alla filmer

### **Test 4: Favoriter**

1. Klicka på hjärta-ikonen
2. Toast-meddelande visas
3. Räknare i navigation uppdateras
4. Hjärta ändrar färg

### **Test 5: "Ladda fler"**

1. Klicka på "Ladda fler filmer"
2. Knappen visar "Laddar..."
3. Nya filmer läggs till i slutet
4. Knappen återgår till normal

### **Test 6: Modal**

1. Klicka på filmkort
2. Modal öppnas med detaljer
3. Stäng med X-knapp
4. Eller ESC-tangent
5. Eller klick utanför

---

## ✅ Checklista

- [ ] `app.js` är skapad
- [ ] App-klassen importerar alla moduler
- [ ] Constructor initialiserar state
- [ ] `init()` körs vid start
- [ ] Event listeners är setupade
- [ ] Filmer laddas och visas
- [ ] Sökning fungerar med debounce
- [ ] Genre-filter fungerar
- [ ] "Ladda fler" fungerar
- [ ] Loading states visas korrekt
- [ ] Error handling fungerar
- [ ] Inga fel i Console

---

## 🎓 Vad du lärt dig

- ✅ **App-arkitektur** - Hur man strukturerar en applikation
- ✅ **State management** - Hålla reda på applikationens tillstånd
- ✅ **Orchestration** - Samordna olika moduler
- ✅ **Event handling** - Submit, input, click, keydown
- ✅ **Debouncing** - Optimera användarinteraktioner
- ✅ **Loading guards** - Förhindra dubbelklick
- ✅ **Try-catch-finally** - Robust felhantering
- ✅ **Spread operator** - Modern array-hantering
- ✅ **Async coordination** - Hantera många asynkrona operationer
- ✅ **UX patterns** - Loading states, error states, toast messages

---

## 💡 Tips

- **Single Responsibility** - Varje metod gör en sak
- **Guard Clauses** - Validera tidigt, returnera tidigt
- **State Management** - Håll state på ett ställe
- **Error Handling** - Fånga och hantera alla fel
- **User Feedback** - Visa alltid vad som händer (loading, error, success)

---

## 🐛 Vanliga problem

### **Problem: Filmer visas inte**
**Lösning:** 
1. Öppna Console - finns fel?
2. Kontrollera att alla imports är korrekta
3. Kolla att HTTP-server körs

### **Problem: Dubbelklick laddar samma filmer två gånger**
**Lösning:** Guard clause med `isLoading` löser det

### **Problem: Sökning är långsam/buggar**
**Lösning:** Debounce är implementerad i koden

---

## ➡️ Nästa steg

Grattis! Huvudapplikationen är klar. Nu ska vi skapa favoritsidan.

**Gå vidare till:** [Steg 10: JavaScript - Favoritsida](./steg-10-js-favorites.md)

---

[⬅️ Steg 8: JS UI](./steg-8-js-ui.md) | [📚 Innehåll](./README.md) | [Steg 10: JS Favorites →](./steg-10-js-favorites.md)
