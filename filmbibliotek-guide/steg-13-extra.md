# Steg 13: Extra funktioner och förbättringar

Grattis! Din filmbibliotek-app är klar. Nu lär vi oss hur man kan förbättra och utöka den.

---

## 🎯 Mål för detta steg

- ✅ Lära sig om möjliga förbättringar
- ✅ Integrera med riktiga API:er
- ✅ Förstå deployment-processen
- ✅ SEO och prestanda-optimering
- ✅ Planera framtida funktioner

---

## 🚀 Bonusfunktioner

### **Nivå 1: Grundläggande förbättringar**

#### **1. Sortering**

Lägg till sorteringsalternativ för filmerna:

```javascript
// I app.js
handleSort(sortBy) {
    let sorted = [...this.currentMovies];
    
    switch(sortBy) {
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'year':
            sorted.sort((a, b) => b.year - a.year);
            break;
        case 'title':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    const grid = document.getElementById('moviesGrid');
    UI.renderMovies(sorted, grid);
}
```

**HTML:**
```html
<select id="sortSelect" class="sort-select">
    <option value="">Sortera efter...</option>
    <option value="rating">Högst betyg</option>
    <option value="year">Nyast</option>
    <option value="title">Titel A-Ö</option>
</select>
```

#### **2. Tillbaka-till-toppen-knapp**

```javascript
// Lägg till i app.js
setupScrollButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scrolla till toppen');
    document.body.appendChild(scrollBtn);
    
    // Visa/dölj baserat på scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll till toppen
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
```

**CSS:**
```css
.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    font-size: 1.5rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 999;
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}
```

#### **3. Dark/Light Mode Toggle**

```javascript
// Lägg till i utils.js
const Theme = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    },
    
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
};
```

**CSS:**
```css
:root[data-theme="light"] {
    --dark-bg: #ffffff;
    --dark-gray: #f5f5f5;
    --text-primary: #000000;
    --text-secondary: #666666;
}
```

**HTML:**
```html
<button id="themeToggle" class="theme-toggle">
    🌙 / ☀️
</button>
```

---

### **Nivå 2: Mellansvåra förbättringar**

#### **4. Infinite Scroll**

Ersätt "Ladda fler"-knappen:

```javascript
// I app.js
setupInfiniteScroll() {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.isLoading) {
            this.loadMoreMovies();
        }
    }, {
        rootMargin: '100px' // Ladda när 100px från botten
    });
    
    // Observera ett sentinel-element
    const sentinel = document.createElement('div');
    sentinel.className = 'scroll-sentinel';
    document.getElementById('moviesGrid').after(sentinel);
    observer.observe(sentinel);
}
```

#### **5. Visa senaste sökningar**

```javascript
// När sökfältet får fokus
searchInput.addEventListener('focus', () => {
    const recent = Storage.getRecentSearches();
    if (recent.length > 0) {
        showRecentSearches(recent);
    }
});

function showRecentSearches(searches) {
    const dropdown = document.createElement('div');
    dropdown.className = 'recent-searches';
    dropdown.innerHTML = `
        <h4>Senaste sökningar</h4>
        ${searches.map(term => `
            <button class="recent-search-item">${term}</button>
        `).join('')}
    `;
    
    // Lägg till event listeners för att söka direkt
    dropdown.querySelectorAll('.recent-search-item').forEach(btn => {
        btn.addEventListener('click', () => {
            searchInput.value = btn.textContent;
            handleSearch(btn.textContent);
        });
    });
    
    searchInput.parentElement.appendChild(dropdown);
}
```

#### **6. Loading Skeleton**

Visa placeholder medan data laddas:

```html
<div class="skeleton-card">
    <div class="skeleton-img"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text short"></div>
</div>
```

```css
.skeleton-card {
    background: var(--dark-gray);
    border-radius: var(--radius-md);
    overflow: hidden;
}

.skeleton-img {
    height: 375px;
    background: linear-gradient(
        90deg,
        rgba(255,255,255,0.1) 0%,
        rgba(255,255,255,0.2) 50%,
        rgba(255,255,255,0.1) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
```

---

### **Nivå 3: Avancerade förbättringar**

#### **7. TMDB API Integration**

Integrera med The Movie Database (TMDB):

```javascript
// Registrera på https://www.themoviedb.org/ för API-nyckel

class TMDBApi {
    constructor() {
        this.apiKey = 'DIN_API_NYCKEL_HÄR';
        this.baseURL = 'https://api.themoviedb.org/3';
        this.imageBaseURL = 'https://image.tmdb.org/t/p/w500';
    }
    
    async fetchPopularMovies(page = 1) {
        const response = await fetch(
            `${this.baseURL}/movie/popular?api_key=${this.apiKey}&language=sv-SE&page=${page}`
        );
        const data = await response.json();
        
        return {
            success: true,
            data: data.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                year: new Date(movie.release_date).getFullYear(),
                rating: movie.vote_average,
                overview: movie.overview,
                poster: this.imageBaseURL + movie.poster_path,
                // ... mer data
            })),
            page: data.page,
            totalPages: data.total_pages
        };
    }
    
    async searchMovies(query) {
        const response = await fetch(
            `${this.baseURL}/search/movie?api_key=${this.apiKey}&query=${query}&language=sv-SE`
        );
        const data = await response.json();
        return { success: true, data: this.transformMovies(data.results) };
    }
}
```

#### **8. YouTube-trailers**

```javascript
async getMovieTrailer(movieId) {
    const response = await fetch(
        `${this.baseURL}/movie/${movieId}/videos?api_key=${this.apiKey}`
    );
    const data = await response.json();
    
    // Hitta trailer
    const trailer = data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
}

// Visa trailer i modal
function showTrailerModal(trailerUrl) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <iframe 
            width="100%" 
            height="450" 
            src="${trailerUrl}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
    document.getElementById('movieModal').classList.add('active');
}
```

#### **9. Watchlist-funktion**

Separat från favoriter:

```javascript
// I storage.js
const Watchlist = {
    add(movie) {
        const list = this.get() || [];
        if (!list.find(m => m.id === movie.id)) {
            list.push({ ...movie, addedDate: new Date().toISOString() });
            localStorage.setItem('watchlist', JSON.stringify(list));
        }
    },
    
    remove(movieId) {
        const list = this.get() || [];
        const filtered = list.filter(m => m.id !== movieId);
        localStorage.setItem('watchlist', JSON.stringify(filtered));
    },
    
    get() {
        return JSON.parse(localStorage.getItem('watchlist') || '[]');
    },
    
    markAsWatched(movieId) {
        const list = this.get();
        const movie = list.find(m => m.id === movieId);
        if (movie) {
            movie.watched = true;
            movie.watchedDate = new Date().toISOString();
            localStorage.setItem('watchlist', JSON.stringify(list));
        }
    }
};
```

---

## 🌐 Deployment

### **GitHub Pages (Gratis)**

1. **Skapa GitHub-repo:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/DittAnvändarnamn/filmbibliotek.git
git push -u origin main
```

2. **Aktivera GitHub Pages:**
- Gå till repo → Settings → Pages
- Source: main branch
- Folder: / (root)
- Save

3. **Din sida är live på:**
`https://DittAnvändarnamn.github.io/filmbibliotek/`

### **Netlify (Enklast)**

1. Gå till [netlify.com](https://www.netlify.com)
2. Dra och släpp din projektmapp
3. Eller connect till GitHub för automatisk deployment
4. Klar! Får egen URL: `ditt-projekt.netlify.app`

### **Vercel**

1. Installera Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd filmbibliotek
vercel
```

3. Följ instruktionerna

---

## 🔧 Optimering

### **1. Bilder**

```javascript
// Lazy loading
<img 
    src="placeholder.jpg" 
    data-src="real-image.jpg" 
    loading="lazy"
    class="lazy"
>

// Intersection Observer för lazy loading
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
});
```

### **2. Minifiera CSS/JS**

```bash
# Installera terser för JS
npm install -g terser

# Minifiera
terser js/app.js -o js/app.min.js

# Använd minifierad version
<script type="module" src="js/app.min.js" defer></script>
```

### **3. Service Worker (PWA)**

```javascript
// sw.js
const CACHE_NAME = 'filmbibliotek-v1';
const urlsToCache = [
    '/',
    '/css/styles.css',
    '/js/app.js',
    '/index.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
```

---

## ✅ Checklista före deployment

- [ ] **Kod**
  - Ingen `console.log()` kvar i produktion
  - Inga hardcodade API-nycklar i frontend
  - Error handling överallt

- [ ] **SEO**
  - Title-tags på alla sidor
  - Meta descriptions
  - Open Graph tags för social sharing
  - Favicon

- [ ] **Prestanda**
  - Bilder optimerade
  - CSS/JS minifierade
  - Lazy loading implementerat
  - Caching headers

- [ ] **Säkerhet**
  - HTTPS (automatiskt med Netlify/Vercel)
  - Content Security Policy
  - Inga XSS-sårbarheter

- [ ] **Tillgänglighet**
  - WCAG 2.1 AA-nivå
  - Keyboard navigation
  - Screen reader-vänlig

---

## 🎓 Vad du lärt dig

- ✅ Bonusfunktioner för bättre UX
- ✅ API-integration (TMDB)
- ✅ Deployment-strategier
- ✅ Optimerings-tekniker
- ✅ PWA-koncept
- ✅ SEO-grunderna
- ✅ Lazy loading
- ✅ Service Workers

---

## 🎉 Grattis!

Du har nu byggt en fullständig, modern webbapplikation med:
- ✅ Semantisk HTML
- ✅ Responsiv CSS med Grid och Flexbox
- ✅ Modern JavaScript med ES6 Modules
- ✅ API-integration
- ✅ localStorage för persistent data
- ✅ Deployment-färdig kod

**Nästa steg:**
1. Publicera din app online
2. Lägg till i din portfolio
3. Dela med vänner och familj
4. Fortsätt bygga och förbättra!

**Lycka till! 🚀**

---

[⬅️ Steg 12: Testing](./steg-12-testing.md) | [📚 Innehåll](./README.md)
