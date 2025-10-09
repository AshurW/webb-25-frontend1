# Steg 6: JavaScript - Hjälpmoduler

Nu börjar vi med JavaScript! I detta steg skapar vi hjälpmoduler som används av andra delar av applikationen.

---

## 🎯 Mål för detta steg

- ✅ Skapa `utils.js` med hjälpfunktioner
- ✅ Skapa `storage.js` för localStorage-hantering
- ✅ Förstå ES6 Modules (export/import)
- ✅ Lära sig localStorage API
- ✅ Skapa återanvändbara funktioner

---

## 📦 Del 1: utils.js - Hjälpfunktioner

Öppna `js/utils.js` och lägg till:

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

### 🔍 Förklaring:

**`export`** - Gör `Utils` tillgängligt för andra moduler

**`debounce`** - Väntar tills användaren slutar skriva innan funktionen körs
- Användning: När användaren söker, vänta 300ms innan API-anrop

**`formatDate`** - Konverterar datum till läsbart format
- Exempel: "2024-12-25" → "25 december 2024"

**`truncateText`** - Klipper av lång text
- Användning: Visa max 150 tecken i filmöversikt

**`showToast`** - Visar ett popup-meddelande
- Modern UX för feedback

---

## 💾 Del 2: storage.js - localStorage-hantering

Öppna `js/storage.js` och lägg till:

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

### 🔍 Förklaring:

**`localStorage`** - Browser API för att spara data lokalt
- Data sparas som strängar
- Finns kvar efter att sidan stängs
- Begränsad till ~5-10MB

**`JSON.stringify()`** - Konvertera objekt → sträng
**`JSON.parse()`** - Konvertera sträng → objekt

**`try/catch`** - Fånga och hantera fel
- localStorage kan vara full
- localStorage kan vara blockerat
- Privat läge kan hindra sparning

**Array methods:**
- `.some()` - Kontrollera om något element matchar
- `.filter()` - Skapa ny array med filtrerade element
- `.push()` - Lägg till i slutet
- `.unshift()` - Lägg till i början
- `.slice()` - Skapa delarray

---

## ✅ Testa dina moduler

### **Test 1: Öppna DevTools Console**

Även om vi inte har importerat modulerna än, kan vi testa localStorage direkt:

```javascript
// I Console
localStorage.setItem('test', 'Hello!');
localStorage.getItem('test'); // "Hello!"
localStorage.removeItem('test');
```

### **Test 2: Kontrollera att filerna laddas**

1. Ladda om sidan
2. Öppna Network-fliken i DevTools
3. Kontrollera att `utils.js` och `storage.js` laddas (status 200)

---

## 🎓 ES6 Modules - Djupdykning

### **Export-syntax**

```javascript
// Named export (kan exportera flera)
export const Utils = { ... };
export const Storage = { ... };

// Default export (en per fil)
export default class MovieAPI { ... }
```

### **Import-syntax**

```javascript
// Named imports
import { Utils } from './utils.js';
import { Storage } from './storage.js';
import { Utils, Storage } from './file.js'; // Flera från samma fil

// Default import
import MovieAPI from './api.js';

// Allt från en modul
import * as Helpers from './utils.js';
// Användning: Helpers.Utils.debounce(...)
```

### **Viktiga regler:**

1. ✅ Alltid inkludera `.js` i importsökvägar
2. ✅ Relativa sökvägar börjar med `./` eller `../`
3. ✅ Exportera bara det du vill göra tillgängligt
4. ✅ En modul laddas bara en gång (cachad)

---

## ✅ Checklista

- [ ] `utils.js` är skapad med alla funktioner
- [ ] `storage.js` är skapad med localStorage-hantering
- [ ] Båda filerna har `export` statements
- [ ] Inga syntaxfel i Console
- [ ] Du förstår `export` och `import`

---

## 🎓 Vad du lärt dig

- ✅ **ES6 Modules** med export/import
- ✅ **localStorage API** för persistent data
- ✅ **JSON.stringify/parse** för serialisering
- ✅ **Try-catch** för felhantering
- ✅ **Array methods** (some, filter, push, unshift, slice)
- ✅ **Debouncing** för prestanda
- ✅ **Object methods** och strukturering

---

## 💡 Tips

- **Håll hjälpfunktioner små och återanvändbara**
- **Dokumentera dina funktioner** med JSDoc-kommentarer
- **Felhantera alltid localStorage** - användare kan ha blockerat det
- **Namespaces** (som `Utils` och `Storage`) förhindrar namnkollisioner

---

## ➡️ Nästa steg

Nu har vi hjälpmoduler klara! Nästa steg är att skapa API-hanteringen.

**Gå vidare till:** [Steg 7: JavaScript - API och Data](./steg-7-js-api.md)

---

[⬅️ Steg 5: CSS Responsive](./steg-5-css-responsive.md) | [📚 Innehåll](./README.md) | [Steg 7: JS API →](./steg-7-js-api.md)
