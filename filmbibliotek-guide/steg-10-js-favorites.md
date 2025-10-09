# Steg 10: JavaScript - Favoritsida

Nu skapar vi logiken för favoritsidan där användare kan se sina sparade filmer.

---

## 🎯 Mål för detta steg

- ✅ Skapa JavaScript för favoritsidan
- ✅ Läsa favoriter från localStorage
- ✅ Visa empty state när inga favoriter finns
- ✅ Implementera enkel module entry point
- ✅ Hantera conditional rendering

---

## ❤️ js/favorites.js

Öppna `js/favorites.js` och lägg till följande:

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

---

## 🔍 Koncept-förklaring

### **1. Module Entry Point**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Kod här körs när DOM är laddad
});
```

**Entry Point** = Startpunkten för koden

**Varför DOMContentLoaded?**
- Säkerställer att alla HTML-element finns
- Körs innan bilder och externa resurser laddas
- Snabbare än `window.onload`

### **2. Läsa från localStorage**

```javascript
const favorites = Storage.getFavorites();
```

**Data-flöde:**
1. Användare lägger till favorit på `index.html`
2. Data sparas i localStorage via `Storage.addFavorite()`
3. På `favorites.html` läser vi samma data
4. Data finns kvar mellan sidladdningar

### **3. Conditional Rendering**

```javascript
if (favorites.length === 0) {
    // Visa empty state
    emptyState.style.display = 'block';
    grid.style.display = 'none';
} else {
    // Visa favoriter
    emptyState.style.display = 'none';
    grid.style.display = 'grid';
}
```

**Empty State** = Vad användaren ser när det inte finns data

**Bra UX:**
- Tydligt meddelande varför det är tomt
- Call-to-action (länk tillbaka)
- Inte bara tomt utrymme

### **4. Återanvända UI-komponenter**

```javascript
favorites.forEach(movie => {
    const card = UI.createMovieCard(movie);
    grid.appendChild(card);
});
```

**DRY** (Don't Repeat Yourself):
- Samma `createMovieCard()` på båda sidorna
- Konsekvent design automatiskt
- Lättare att underhålla

---

## ✅ Testa ditt arbete

### **Test 1: Tom favoritsida**

1. Rensa localStorage:
   ```javascript
   // I DevTools Console
   localStorage.clear();
   ```
2. Öppna `favorites.html`
3. Empty state ska visas med meddelande
4. Länk "Bläddra bland filmer" ska finnas

### **Test 2: Med favoriter**

1. Gå till `index.html`
2. Lägg till några filmer i favoriter
3. Gå till `favorites.html`
4. Filmkorten ska visas
5. Empty state ska vara dold

### **Test 3: Ta bort favorit**

1. På favoritsidan, klicka på hjärta-ikonen
2. Filmen tas bort från favoriter
3. Om det var sista filmen, visa empty state
4. Räknare uppdateras

### **Test 4: Persistent data**

1. Lägg till favoriter
2. Stäng webbläsaren helt
3. Öppna igen
4. Favoriterna finns kvar!

---

## 🎓 Fördjupning: localStorage

### **Hur localStorage fungerar**

```javascript
// Spara
localStorage.setItem('key', 'value');

// Hämta
const value = localStorage.getItem('key');

// Ta bort
localStorage.removeItem('key');

// Rensa allt
localStorage.clear();
```

**Viktigt:**
- Lagrar bara strängar
- Måste använda `JSON.stringify()` för objekt
- Måste använda `JSON.parse()` när man läser
- Max ~5-10 MB beroende på webbläsare

### **Vår wrapper-funktion**

```javascript
// I storage.js
set(key, data) {
    const serialized = JSON.stringify(data);  // Objekt → Sträng
    localStorage.setItem(key, serialized);
}

get(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;   // Sträng → Objekt
}
```

**Fördelar med wrapper:**
- Enklare API
- Automatisk serialisering
- Felhantering på ett ställe
- Lätt att byta till annan storage senare

---

## 🎨 Förbättringsförslag

### **1. Sortering av favoriter**

```javascript
// Sortera efter när de lades till (nyast först)
const favorites = Storage.getFavorites()
    .sort((a, b) => b.addedDate - a.addedDate);

// För detta behöver vi spara datum när vi lägger till:
addFavorite(movie) {
    const favorites = this.getFavorites();
    favorites.push({
        ...movie,
        addedDate: Date.now()
    });
    this.set(this.KEYS.FAVORITES, favorites);
}
```

### **2. Filtrera favoriter**

```javascript
// Lägg till dropdown för att filtrera
const genreFilter = document.getElementById('favoriteGenreFilter');
genreFilter.addEventListener('change', (e) => {
    const genre = e.target.value;
    const filtered = genre 
        ? favorites.filter(m => m.genre === genre)
        : favorites;
    
    grid.innerHTML = '';
    filtered.forEach(movie => {
        grid.appendChild(UI.createMovieCard(movie));
    });
});
```

### **3. Rensa alla favoriter**

```javascript
// Lägg till knapp för att rensa alla
const clearBtn = document.getElementById('clearFavorites');
clearBtn.addEventListener('click', () => {
    if (confirm('Är du säker på att du vill ta bort alla favoriter?')) {
        Storage.clear();
        location.reload();
    }
});
```

### **4. Statistik**

```javascript
// Visa statistik om favoriter
const stats = {
    total: favorites.length,
    genres: [...new Set(favorites.map(m => m.genre))],
    avgRating: (favorites.reduce((sum, m) => sum + parseFloat(m.rating), 0) / favorites.length).toFixed(1)
};

console.log(`Du har ${stats.total} favoriter i ${stats.genres.length} olika genrer!`);
console.log(`Genomsnittsbetyg: ${stats.avgRating}`);
```

---

## ✅ Checklista

- [ ] `favorites.js` är skapad
- [ ] Imports från Storage och UI
- [ ] DOMContentLoaded event listener
- [ ] Favoriter laddas från localStorage
- [ ] Empty state visas när inga favoriter finns
- [ ] Filmkort visas när favoriter finns
- [ ] Favorit-räknare uppdateras
- [ ] Favoriter kan tas bort
- [ ] Data persistas mellan sidladdningar

---

## 🎓 Vad du lärt dig

- ✅ **Module entry points** - Starta kod när DOM är redo
- ✅ **localStorage API** - Persistent data i webbläsaren
- ✅ **Conditional rendering** - Visa olika UI baserat på data
- ✅ **Empty states** - Hantera när det inte finns data
- ✅ **Component reuse** - Återanvända UI-komponenter
- ✅ **Data persistence** - Data finns kvar mellan sessioner
- ✅ **forEach iteration** - Loopa genom array och skapa element

---

## 💡 Tips

- **Empty states är viktigt** - Aldrig visa bara tomt utrymme
- **Ge användaren nästa steg** - Vad kan de göra härnäst?
- **Testa edge cases** - Vad händer med 0 favoriter? 100 favoriter?
- **localStorage kan vara full** - Alltid try-catch
- **localStorage är synkron** - Kan vara långsamt med mycket data

---

## 🐛 Vanliga problem

### **Problem: localStorage fungerar inte**
**Lösning:**
- Privat läge blockerar localStorage
- Vissa browsers i privat mode tillåter det inte
- Testa i normal mode

### **Problem: Data försvinner**
**Lösning:**
- Kontrollera att du inte anropar `localStorage.clear()` någonstans
- Olika domains har olika localStorage
- `localhost:3000` ≠ `localhost:8000`

### **Problem: "Unexpected token" fel**
**Lösning:**
- localStorage innehåller korrupt data
- Rensa: `localStorage.clear()`
- Implementera bättre validering vid läsning

---

## ➡️ Nästa steg

Bra jobbat! Favoritsidan är klar. Sista JavaScript-steget är detaljsidan.

**Gå vidare till:** [Steg 11: JavaScript - Detaljsida](./steg-11-js-details.md)

---

[⬅️ Steg 9: JS App](./steg-9-js-app.md) | [📚 Innehåll](./README.md) | [Steg 11: JS Details →](./steg-11-js-details.md)
