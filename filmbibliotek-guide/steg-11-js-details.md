# Steg 11: JavaScript - Detaljsida

Sista JavaScript-steget! Nu skapar vi detaljsidan med URL parameters, history API och delningsfunktioner.

---

## 🎯 Mål för detta steg

- ✅ Skapa MovieDetails-klass för detaljsidan
- ✅ Hämta film-ID från URL
- ✅ Använda URLSearchParams
- ✅ Implementera History API för navigation
- ✅ Använda Web Share API för delning
- ✅ Implementera Clipboard API som fallback

---

## 🎬 js/movie-details.js

Öppna `js/movie-details.js` och lägg till följande:

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

## 🔍 Koncept-förklaring

### **1. URLSearchParams**

```javascript
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
```

**URL:** `movie-details.html?id=123&lang=sv`

**Parsing:**
```javascript
urlParams.get('id')    // "123"
urlParams.get('lang')  // "sv"
urlParams.get('other') // null
```

**Fördelar:**
- Delningsbara länkar
- Bokmärkesbara sidor
- Browser history fungerar
- SEO-vänligt

### **2. window.location**

```javascript
window.location.href     // "http://localhost:8000/movie-details.html?id=123"
window.location.search   // "?id=123"
window.location.pathname // "/movie-details.html"
```

**Användning:**
- Läsa URL
- Navigera till ny sida: `window.location.href = 'index.html'`

### **3. History API**

```javascript
if (window.history.length > 1) {
    window.history.back();  // Gå tillbaka i historiken
} else {
    window.location.href = 'index.html';  // Ingen historik, gå till start
}
```

**History-metoder:**
- `history.back()` - Gå tillbaka (som browser back-knapp)
- `history.forward()` - Gå framåt
- `history.go(-2)` - Gå 2 steg tillbaka

**Varför kontrollera length?**
- Om användaren öppnade länken direkt (utan historik)
- `history.back()` skulle stänga tabben
- Bättre att gå till startsidan

### **4. Web Share API**

```javascript
if (navigator.share) {
    await navigator.share({
        title: 'Filmtitel',
        text: 'Beskrivning',
        url: window.location.href
    });
}
```

**Web Share API:**
- Native delning på mobil
- Öppnar systemets delningsmenyn
- Fungerar inte i alla browsers

**Support:**
- ✅ Mobil: Android Chrome, iOS Safari
- ❌ Desktop: Begränsat stöd

### **5. Clipboard API**

```javascript
await navigator.clipboard.writeText(window.location.href);
```

**Clipboard API:**
- Kopiera text till urklipp
- Kräver HTTPS (eller localhost)
- Kräver användartillstånd

**Fallback för äldre browsers:**
```javascript
// Gammalt sätt (deprecated men funkar överallt)
const input = document.createElement('input');
input.value = text;
document.body.appendChild(input);
input.select();
document.execCommand('copy');
document.body.removeChild(input);
```

### **6. document.title**

```javascript
document.title = `${movie.title} - Filmbibliotek`;
```

**Fördelar:**
- Browser-tab visar filmnamn
- Bokmärken får rätt titel
- SEO (Google indexerar titel)

---

## ✅ Testa ditt arbete

### **Test 1: URL Parameters**

1. Gå till `index.html`
2. Klicka på ett filmkort
3. URL ska vara: `movie-details.html?id=X`
4. Rätt film visas

### **Test 2: Tillbaka-knapp**

1. Navigera till detaljsida från startsidan
2. Klicka "Tillbaka"
3. Ska gå tillbaka till startsidan

### **Test 3: Direkt länk**

1. Öppna `movie-details.html?id=5` direkt
2. Filmen ska visas
3. Tillbaka-knapp ska gå till startsidan (inte tomhet)

### **Test 4: Dela-funktion**

**På mobil:**
1. Klicka "Dela"
2. Systemets delningsmenyn öppnas

**På desktop:**
1. Klicka "Dela"
2. "Länk kopierad" toast visas
3. Klistra in i textredigerare - länken finns

### **Test 5: Favorit från detaljsida**

1. Klicka på favorit-knappen
2. Toast visas
3. Räknare uppdateras
4. Gå tillbaka till startsidan - hjärtat ska synas på kortet

### **Test 6: Sidtitel**

1. Öppna detaljsida
2. Browser-tab visar filmnamn
3. Tryck F5 (reload)
4. Titeln finns kvar

---

## ✅ Checklista

- [ ] `movie-details.js` är skapad
- [ ] MovieDetails-klass implementerad
- [ ] URLSearchParams hämtar ID från URL
- [ ] Filmdetaljer laddas och visas
- [ ] Tillbaka-knapp fungerar med history
- [ ] Favorit-knapp fungerar
- [ ] Dela-knapp med Web Share API
- [ ] Fallback till Clipboard API
- [ ] document.title uppdateras
- [ ] Loading och error states
- [ ] Inga fel i Console

---

## 🎓 Vad du lärt dig

- ✅ **URLSearchParams** - Läsa query parameters
- ✅ **window.location** - URL-hantering
- ✅ **History API** - Browser navigation
- ✅ **Web Share API** - Native delning
- ✅ **Clipboard API** - Kopiera till urklipp
- ✅ **Progressive enhancement** - Fallback för äldre browsers
- ✅ **document.title** - Dynamisk sidtitel
- ✅ **Deep linking** - Delningsbara, bokmärkesbara länkar
- ✅ **Feature detection** - `if (navigator.share)`
- ✅ **Error handling** - AbortError för användare som avbryter

---

## 💡 Tips

- **URL Parameters** - Gör sidor delningsbara och bokmärkesbara
- **Feature Detection** - Alltid kolla `if (API.exists)` innan användning
- **Fallbacks** - Ha alternativ för äldre browsers
- **History API** - Förbättrar användarupplevelsen
- **Toast messages** - Ge tydlig feedback på alla actions

---

## 🌐 Browser Compatibility

### **Web Share API**
- ✅ Chrome 89+ (Android)
- ✅ Safari 12.1+ (iOS)
- ⚠️ Chrome Desktop (begränsat)
- ❌ Firefox
- **Lösning:** Clipboard fallback

### **Clipboard API**
- ✅ Chrome 63+
- ✅ Firefox 53+
- ✅ Safari 13.1+
- **Krav:** HTTPS eller localhost

### **URLSearchParams**
- ✅ Alla moderna browsers
- ✅ IE 10+ (med polyfill)

---

## 🚀 Extra förbättringar

### **1. Social Media Sharing**

```javascript
// Dela på specifika plattformar
shareOnTwitter(movie) {
    const text = `Kolla in ${movie.title}!`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
}

shareOnFacebook(movie) {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
}
```

### **2. Open Graph Meta Tags**

```html
<!-- I <head> -->
<meta property="og:title" content="Filmtitel" id="og-title">
<meta property="og:description" content="Beskrivning" id="og-description">
<meta property="og:image" content="poster.jpg" id="og-image">
<meta property="og:url" content="URL" id="og-url">
```

```javascript
// Uppdatera dynamiskt
document.getElementById('og-title').content = movie.title;
document.getElementById('og-description').content = movie.overview;
document.getElementById('og-image').content = movie.poster;
```

### **3. QR-kod för delning**

```javascript
// Använd API för QR-kod
generateQRCode(url) {
    const qrImg = document.getElementById('qrCode');
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=200x200`;
}
```

---

## ➡️ Nästa steg

Grattis! All JavaScript-kod är nu klar! Din filmbibliotek-app är komplett och fungerande.

**Gå vidare till:** [Steg 12: Testing och Felsökning](./steg-12-testing.md)

---

[⬅️ Steg 10: JS Favorites](./steg-10-js-favorites.md) | [📚 Innehåll](./README.md) | [Steg 12: Testing →](./steg-12-testing.md)
