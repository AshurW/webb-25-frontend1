# Steg 7: JavaScript - API och Data

Nu skapar vi API-klassen som hanterar all datahämtning. Vi använder mockdata, men strukturen gör det enkelt att byta till riktig backend senare.

---

## 🎯 Mål för detta steg

- ✅ Skapa `MovieAPI` klass med OOP
- ✅ Implementera async/await för asynkrona operationer
- ✅ Generera mockdata för utveckling
- ✅ Hantera olika typer av datahämtning
- ✅ Förstå Promise och async-programmering

---

## 🎬 js/api.js

Öppna `js/api.js` och lägg till följande:

### **Del 1: MovieAPI-klassen**

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

---

## 🎓 Koncept-förklaring

### **1. Export och Class**

```javascript
export class MovieAPI {
    // ...
}
```

- `export` - Gör klassen tillgänglig för andra moduler
- `class` - OOP-struktur för att gruppera relaterad funktionalitet
- Andra filer kan: `import { MovieAPI } from './api.js'`

### **2. Constructor**

```javascript
constructor() {
    this.baseURL = 'https://api.example.com/movies';
    this.currentPage = 1;
    this.totalPages = 0;
}
```

- Körs när man skapar ny instans: `new MovieAPI()`
- Initialiserar objektets properties
- `this` refererar till instansen

### **3. Async/Await**

```javascript
async fetchMovies(page = 1) {
    await this.delay(500);
    // ...
}
```

**Varför async/await?**
- Gör asynkron kod lättare att läsa
- Ser ut som synkron kod
- Bättre felhantering med try-catch

**Utan async/await (callback hell):**
```javascript
fetchMovies(page, (error, data) => {
    if (error) {
        handleError(error);
    } else {
        processData(data, (error2, result) => {
            if (error2) {
                handleError(error2);
            } else {
                // ... och så vidare
            }
        });
    }
});
```

**Med async/await:**
```javascript
async fetchMovies(page) {
    try {
        const data = await getData();
        const result = await processData(data);
        return result;
    } catch (error) {
        handleError(error);
    }
}
```

### **4. Promise**

```javascript
delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

- **Promise** - Representerar ett framtida värde
- **resolve** - Anropas när operationen lyckas
- **setTimeout** - Väntar en viss tid
- **Användning:** `await this.delay(500)`

### **5. Try-Catch**

```javascript
try {
    // Kod som kan orsaka fel
    const data = await fetchData();
} catch (error) {
    // Hantera felet
    console.error('Error:', error);
    throw new Error('Kunde inte hämta data');
}
```

- Fångar upp fel som kastas i try-blocket
- Förhindrar att hela appen kraschar
- Kan omvandla fel till användarvänliga meddelanden

### **6. Array Methods**

```javascript
const filtered = allMovies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase())
);
```

- **`.filter()`** - Skapar ny array med element som matchar villkoret
- **`.find()`** - Hittar första elementet som matchar
- **`.map()`** - Transformera varje element
- **Arrow function:** `(movie) => { ... }` eller `movie => ...`

---

## 🔄 Från Mockdata till Riktig Backend

När du har en riktig backend, byt ut metoderna:

### **Exempel: fetchMovies med riktig backend**

```javascript
async fetchMovies(page = 1) {
    try {
        // Riktig HTTP-request
        const response = await fetch(`${this.baseURL}/movies?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer YOUR_TOKEN' // Om API kräver auth
            }
        });
        
        // Kontrollera om requesten lyckades
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parsa JSON-svaret
        const data = await response.json();
        
        this.currentPage = data.page;
        this.totalPages = data.totalPages;
        
        return {
            success: true,
            data: data.movies,
            page: this.currentPage,
            totalPages: this.totalPages
        };
        
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Kunde inte hämta filmer.');
    }
}
```

### **Backend-endpoints du behöver:**

```
GET  /api/movies              → Hämta filmer (med pagination)
GET  /api/movies?page=2       → Hämta sida 2
GET  /api/movies/:id          → Hämta specifik film
GET  /api/movies/search?q=... → Sök filmer
GET  /api/movies?genre=action → Filtrera efter genre
```

---

## ✅ Testa din API-klass

Eftersom vi använder modules kan vi inte testa direkt i Console än, men vi kan kontrollera:

### **Test 1: Inga syntaxfel**

1. Öppna DevTools Console
2. Inga röda felmeddelanden = bra!

### **Test 2: Fil laddas**

1. Öppna Network-fliken i DevTools
2. Ladda om sidan
3. Kontrollera att `api.js` laddas (status 200)

### **Test 3: Validera din kod**

Använd en JavaScript linter eller validera manuellt:
- Alla `{` har matchande `}`
- Alla metoder har `async` när de använder `await`
- `this` används korrekt i klassen

---

## ✅ Checklista

- [ ] `MovieAPI` klass är skapad
- [ ] `export` statement finns
- [ ] Alla metoder har JSDoc-kommentarer
- [ ] `async/await` används korrekt
- [ ] `try-catch` finns för felhantering
- [ ] Mockdata genereras korrekt
- [ ] Inga syntaxfel i Console

---

## 🎓 Vad du lärt dig

- ✅ **OOP med klasser** - Strukturerad kod
- ✅ **Async/Await** - Asynkron programmering
- ✅ **Promise** - Framtida värden
- ✅ **Try-Catch** - Felhantering
- ✅ **Array methods** - Filter, find, map
- ✅ **Template literals** - Stränginterpolering
- ✅ **Default parameters** - `page = 1`
- ✅ **Arrow functions** - Kortare syntax
- ✅ **HTTP-koncept** - Requests och responses

---

## 💡 Tips

- **Separera data och presentation** - API-klassen ska bara hantera data
- **Konsistent felhantering** - Alla metoder ska kasta Error-objekt
- **JSDoc-kommentarer** - Hjälper dig och andra förstå koden
- **Mockdata är bra** - Du kan utveckla frontend medan backend byggs
- **Async/await > Promises** - Enklare att läsa och underhålla

---

## 🐛 Vanliga fel

### **Fel: "await is only valid in async function"**
**Lösning:** Lägg till `async` före funktionen:
```javascript
async fetchMovies() { // ✅
    await this.delay(500);
}
```

### **Fel: "this is undefined"**
**Lösning:** Använd arrow functions eller bind:
```javascript
// ✅ Arrow function
.map(movie => this.processMovie(movie))

// ❌ Regular function
.map(function(movie) { this.processMovie(movie) }) // this är undefined
```

### **Fel: "Cannot read property of undefined"**
**Lösning:** Kontrollera att data finns innan du använder den:
```javascript
const movie = movies.find(m => m.id === id);
if (!movie) {
    throw new Error('Film hittades inte');
}
```

---

## ➡️ Nästa steg

Nu har vi API-klassen klar! Nästa steg är att skapa UI-komponenter som visar datan.

**Gå vidare till:** [Steg 8: JavaScript - UI-komponenter](./steg-8-js-ui.md)

---

[⬅️ Steg 6: JS Helpers](./steg-6-js-helpers.md) | [📚 Innehåll](./README.md) | [Steg 8: JS UI →](./steg-8-js-ui.md)
