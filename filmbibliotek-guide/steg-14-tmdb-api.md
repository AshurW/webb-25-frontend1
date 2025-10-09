# Steg 14: Integrera med TMDB API

Nu ersätter vi mockdata med riktiga filmdata från The Movie Database (TMDB) API!

---

## 🎯 Mål för detta steg

- ✅ Registrera för TMDB API-nyckel
- ✅ Förstå TMDB API-struktur
- ✅ Ersätta mockdata med riktiga API-anrop
- ✅ Hantera TMDB:s bildformat
- ✅ Implementera olika endpoints
- ✅ Hantera API-fel och rate limits

---

## 🔑 Steg 1: Skaffa API-nyckel

### **1. Registrera dig på TMDB**

1. Gå till [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Klicka på "Join TMDB" (uppe till höger)
3. Fyll i registreringsformuläret
4. Verifiera din e-post

### **2. Ansök om API-nyckel**

1. När du är inloggad, gå till din profil
2. Klicka på "Settings"
3. Klicka på "API" i vänstermenyn
4. Klicka på "Request an API Key"
5. Välj "Developer" (gratis)
6. Fyll i formuläret:
   - **Application Name:** Filmbibliotek (eller vad du vill)
   - **Application URL:** http://localhost:8000 (eller din URL)
   - **Application Summary:** Ett projekt för att lära sig webbutveckling
7. Acceptera villkoren
8. Du får din **API Key (v3 auth)** direkt!

### **3. Spara din API-nyckel säkert**

⚠️ **VIKTIGT:** Lägg ALDRIG API-nyckeln direkt i din kod om du ska publicera på GitHub!

**För utveckling (lokalt):**
```javascript
// api-config.js (lägg till i .gitignore)
export const TMDB_CONFIG = {
    apiKey: 'DIN_API_NYCKEL_HÄR',
    baseURL: 'https://api.themoviedb.org/3',
    imageBaseURL: 'https://image.tmdb.org/t/p'
};
```

**För produktion:**
Använd environment variables eller en backend som håller nyckeln hemlig.

---

## 🎬 Steg 2: Uppdatera API-klassen

Öppna `js/api.js` och ersätt innehållet med detta:

```javascript
// ===========================
// TMDB API-integration
// ===========================

export class MovieAPI {
    constructor() {
        // TMDB Configuration
        this.apiKey = 'DIN_API_NYCKEL_HÄR'; // BYT UT DENNA!
        this.baseURL = 'https://api.themoviedb.org/3';
        this.imageBaseURL = 'https://image.tmdb.org/t/p';
        this.language = 'sv-SE'; // Svenska med fallback till engelska
        
        this.currentPage = 1;
        this.totalPages = 0;
    }

    /**
     * Bygg URL med API-nyckel och parametrar
     */
    buildURL(endpoint, params = {}) {
        const url = new URL(`${this.baseURL}${endpoint}`);
        url.searchParams.append('api_key', this.apiKey);
        url.searchParams.append('language', this.language);
        
        // Lägg till extra parametrar
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
        
        return url.toString();
    }

    /**
     * Transformera TMDB film till vårt format
     */
    transformMovie(tmdbMovie) {
        return {
            id: tmdbMovie.id,
            title: tmdbMovie.title,
            year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 'N/A',
            rating: tmdbMovie.vote_average ? tmdbMovie.vote_average.toFixed(1) : 'N/A',
            genre: tmdbMovie.genre_ids ? this.getGenreNames(tmdbMovie.genre_ids) : 'Okänd',
            overview: tmdbMovie.overview || 'Ingen beskrivning tillgänglig.',
            poster: tmdbMovie.poster_path 
                ? `${this.imageBaseURL}/w500${tmdbMovie.poster_path}`
                : 'https://via.placeholder.com/500x750/1e293b/ffffff?text=Ingen+Bild',
            backdrop: tmdbMovie.backdrop_path
                ? `${this.imageBaseURL}/original${tmdbMovie.backdrop_path}`
                : null,
            releaseDate: tmdbMovie.release_date || 'N/A',
            popularity: tmdbMovie.popularity || 0
        };
    }

    /**
     * Transformera detaljerad film (från /movie/{id})
     */
    transformMovieDetails(tmdbMovie) {
        return {
            ...this.transformMovie(tmdbMovie),
            runtime: tmdbMovie.runtime || 0,
            director: tmdbMovie.credits?.crew?.find(person => person.job === 'Director')?.name || 'Okänd',
            cast: tmdbMovie.credits?.cast?.slice(0, 5).map(actor => actor.name) || [],
            genres: tmdbMovie.genres?.map(g => g.name).join(', ') || 'Okänd',
            genre: tmdbMovie.genres?.map(g => g.name).join(', ') || 'Okänd',
            budget: tmdbMovie.budget || 0,
            revenue: tmdbMovie.revenue || 0,
            tagline: tmdbMovie.tagline || '',
            homepage: tmdbMovie.homepage || ''
        };
    }

    /**
     * Hämta populära filmer
     */
    async fetchMovies(page = 1) {
        try {
            const url = this.buildURL('/movie/popular', { page });
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            this.currentPage = data.page;
            this.totalPages = data.total_pages;
            
            return {
                success: true,
                data: data.results.map(movie => this.transformMovie(movie)),
                page: this.currentPage,
                totalPages: this.totalPages
            };
            
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw new Error('Kunde inte hämta filmer från TMDB.');
        }
    }

    /**
     * Sök efter filmer
     */
    async searchMovies(query) {
        try {
            if (!query || query.trim() === '') {
                return this.fetchMovies(1);
            }
            
            const url = this.buildURL('/search/movie', { query });
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                success: true,
                data: data.results.map(movie => this.transformMovie(movie))
            };
            
        } catch (error) {
            console.error('Error searching movies:', error);
            throw new Error('Sökningen misslyckades.');
        }
    }

    /**
     * Hämta film efter ID
     */
    async getMovieById(movieId) {
        try {
            // Hämta film med credits (cast och crew)
            const url = this.buildURL(`/movie/${movieId}`, {
                append_to_response: 'credits'
            });
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                success: true,
                data: this.transformMovieDetails(data)
            };
            
        } catch (error) {
            console.error('Error fetching movie:', error);
            throw new Error('Kunde inte hämta filmdetaljer.');
        }
    }

    /**
     * Filtrera filmer efter genre
     */
    async filterByGenre(genreId) {
        try {
            if (!genreId) {
                return this.fetchMovies(1);
            }
            
            // Konvertera genre-namn till ID
            const genreIdMap = {
                'action': 28,
                'comedy': 35,
                'drama': 18,
                'horror': 27,
                'scifi': 878,
                'romance': 10749
            };
            
            const tmdbGenreId = genreIdMap[genreId.toLowerCase()] || genreId;
            
            const url = this.buildURL('/discover/movie', {
                with_genres: tmdbGenreId,
                sort_by: 'popularity.desc'
            });
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                success: true,
                data: data.results.map(movie => this.transformMovie(movie))
            };
            
        } catch (error) {
            console.error('Error filtering movies:', error);
            throw new Error('Filtrering misslyckades.');
        }
    }

    /**
     * Hjälpmetod: Konvertera genre-IDs till namn
     */
    getGenreNames(genreIds) {
        const genres = {
            28: 'Action',
            12: 'Äventyr',
            16: 'Animation',
            35: 'Komedi',
            80: 'Kriminal',
            99: 'Dokumentär',
            18: 'Drama',
            10751: 'Familj',
            14: 'Fantasy',
            36: 'Historisk',
            27: 'Skräck',
            10402: 'Musik',
            9648: 'Mysterium',
            10749: 'Romantik',
            878: 'Sci-Fi',
            10770: 'TV-film',
            53: 'Thriller',
            10752: 'Krig',
            37: 'Western'
        };
        
        return genreIds
            .slice(0, 2) // Max 2 genrer
            .map(id => genres[id] || 'Okänd')
            .join(', ');
    }

    /**
     * Hämta filmer som visas nu på bio
     */
    async getNowPlaying(page = 1) {
        try {
            const url = this.buildURL('/movie/now_playing', { page });
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                success: true,
                data: data.results.map(movie => this.transformMovie(movie))
            };
            
        } catch (error) {
            console.error('Error fetching now playing:', error);
            throw new Error('Kunde inte hämta filmer som spelas nu.');
        }
    }

    /**
     * Hämta topprankade filmer
     */
    async getTopRated(page = 1) {
        try {
            const url = this.buildURL('/movie/top_rated', { page });
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                success: true,
                data: data.results.map(movie => this.transformMovie(movie))
            };
            
        } catch (error) {
            console.error('Error fetching top rated:', error);
            throw new Error('Kunde inte hämta topprankade filmer.');
        }
    }

    /**
     * Hämta kommande filmer
     */
    async getUpcoming(page = 1) {
        try {
            const url = this.buildURL('/movie/upcoming', { page });
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                success: true,
                data: data.results.map(movie => this.transformMovie(movie))
            };
            
        } catch (error) {
            console.error('Error fetching upcoming:', error);
            throw new Error('Kunde inte hämta kommande filmer.');
        }
    }
}
```

---

## 🖼️ Steg 3: Uppdatera HTML för genre-filter

TMDB använder andra genre-namn. Uppdatera i `index.html`:

```html
<select id="genreFilter" class="genre-select">
    <option value="">Alla genrer</option>
    <option value="28">Action</option>
    <option value="35">Komedi</option>
    <option value="18">Drama</option>
    <option value="27">Skräck</option>
    <option value="878">Sci-Fi</option>
    <option value="10749">Romantik</option>
    <option value="53">Thriller</option>
    <option value="16">Animation</option>
</select>
```

---

## 📊 TMDB API Endpoints

### **Viktiga endpoints:**

```
GET /movie/popular              → Populära filmer
GET /movie/top_rated            → Topprankade
GET /movie/now_playing          → Visas nu på bio
GET /movie/upcoming             → Kommande filmer
GET /movie/{id}                 → Specifik film
GET /search/movie?query=...     → Sök filmer
GET /discover/movie             → Upptäck filmer med filter
GET /genre/movie/list           → Lista alla genrer
```

### **Bildstorlekar:**

TMDB har olika bildstorlekar:
- `w92` - Mycket liten thumbnail
- `w185` - Liten thumbnail
- `w500` - Medium (vi använder denna)
- `w780` - Stor
- `original` - Originalstorlek

**Exempel:**
```
https://image.tmdb.org/t/p/w500/posterPath.jpg
```

---

## 🔒 Säkerhet och Best Practices

### **1. Dölj API-nyckeln (viktigt!)**

**För GitHub:**
```gitignore
# .gitignore
api-config.js
.env
```

**Skapa config-fil:**
```javascript
// api-config.js (lägg till i .gitignore)
export const TMDB_CONFIG = {
    apiKey: 'din-api-nyckel-här'
};
```

**Importera i api.js:**
```javascript
import { TMDB_CONFIG } from './api-config.js';

constructor() {
    this.apiKey = TMDB_CONFIG.apiKey;
    // ...
}
```

### **2. Rate Limiting**

TMDB har rate limits:
- **40 requests per 10 sekunder**
- **200,000 requests per dag** (gratis tier)

**Implementera cache:**
```javascript
class MovieAPI {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minuter
    }
    
    async fetchWithCache(url) {
        // Kolla cache först
        if (this.cache.has(url)) {
            const cached = this.cache.get(url);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }
        
        // Annars hämta från API
        const response = await fetch(url);
        const data = await response.json();
        
        // Spara i cache
        this.cache.set(url, {
            data,
            timestamp: Date.now()
        });
        
        return data;
    }
}
```

---

## ✅ Testa TMDB-integrationen

### **Test 1: API-nyckel fungerar**

Öppna Console och testa:
```javascript
fetch('https://api.themoviedb.org/3/movie/popular?api_key=DIN_NYCKEL')
    .then(r => r.json())
    .then(data => console.log(data));
```

Du ska få tillbaka filmdata!

### **Test 2: Populära filmer**

1. Öppna `index.html`
2. Riktiga filmer ska ladda (inte mockdata)
3. Riktiga filmposters visas
4. Aktuella filmer från TMDB

### **Test 3: Sökning**

1. Sök efter "Inception"
2. Riktiga sökresultat visas
3. Bilder och data från TMDB

### **Test 4: Filmdetaljer**

1. Klicka på en film
2. Detaljsida visar riktig data
3. Riktiga skådespelare och regissör
4. Allt från TMDB

---

## 🎨 Extra: Lägg till fler TMDB-funktioner

### **1. Hämta trailers**

```javascript
async getMovieTrailer(movieId) {
    try {
        const url = this.buildURL(`/movie/${movieId}/videos`);
        const response = await fetch(url);
        const data = await response.json();
        
        // Hitta YouTube-trailer
        const trailer = data.results.find(
            video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        
        return trailer 
            ? `https://www.youtube.com/embed/${trailer.key}`
            : null;
            
    } catch (error) {
        console.error('Error fetching trailer:', error);
        return null;
    }
}
```

### **2. Liknande filmer**

```javascript
async getSimilarMovies(movieId) {
    try {
        const url = this.buildURL(`/movie/${movieId}/similar`);
        const response = await fetch(url);
        const data = await response.json();
        
        return {
            success: true,
            data: data.results.map(movie => this.transformMovie(movie))
        };
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        return { success: false, data: [] };
    }
}
```

### **3. Cast och crew**

```javascript
async getMovieCredits(movieId) {
    try {
        const url = this.buildURL(`/movie/${movieId}/credits`);
        const response = await fetch(url);
        const data = await response.json();
        
        return {
            cast: data.cast.slice(0, 10).map(actor => ({
                name: actor.name,
                character: actor.character,
                profile: actor.profile_path 
                    ? `${this.imageBaseURL}/w185${actor.profile_path}`
                    : null
            })),
            crew: data.crew.filter(person => 
                ['Director', 'Producer', 'Writer'].includes(person.job)
            )
        };
    } catch (error) {
        console.error('Error fetching credits:', error);
        return { cast: [], crew: [] };
    }
}
```

---

## 📚 TMDB API Dokumentation

Läs mer på:
- **API Docs:** https://developers.themoviedb.org/3
- **Getting Started:** https://developers.themoviedb.org/3/getting-started/introduction
- **Authentication:** https://developers.themoviedb.org/3/getting-started/authentication

---

## ✅ Checklista

- [ ] Registrerad på TMDB
- [ ] API-nyckel mottagen
- [ ] API-nyckel sparad säkert
- [ ] `api.js` uppdaterad med TMDB-integration
- [ ] Populära filmer laddas från TMDB
- [ ] Sökning fungerar
- [ ] Genre-filter fungerar
- [ ] Filmdetaljer visar riktig data
- [ ] Bilder från TMDB visas korrekt
- [ ] Inga API-nycklar i GitHub

---

## 🎓 Vad du lärt dig

- ✅ **REST API integration** - Anropa externa API:er
- ✅ **API authentication** - Använda API-nycklar
- ✅ **Data transformation** - Mappa API-data till vårt format
- ✅ **Image CDN** - Arbeta med TMDB:s bildtjänst
- ✅ **Rate limiting** - Hantera API-begränsningar
- ✅ **Caching** - Spara API-svar för prestanda
- ✅ **Error handling** - Hantera API-fel
- ✅ **Security** - Skydda API-nycklar

---

## 🎉 Grattis!

Du har nu en fullt fungerande filmapp med riktiga data från TMDB! 🎬

Din app visar nu:
- ✅ Riktiga filmer
- ✅ Aktuella posters
- ✅ Faktisk information
- ✅ Sökbara filmer
- ✅ Genrefiltrering
- ✅ Detaljerad info

**Nästa steg:**
- Lägg till trailers
- Visa liknande filmer
- Implementera cast-visning
- Publicera din app online!

---

[⬅️ Steg 13: Extra](./steg-13-extra.md) | [📚 Innehåll](./README.md)
