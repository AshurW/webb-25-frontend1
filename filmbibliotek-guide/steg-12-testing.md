# Steg 12: Testing och Felsökning

Nu testar vi hela applikationen och lär oss hur man felsöker vanliga problem.

---

## 🎯 Mål för detta steg

- ✅ Skapa en komplett testplan
- ✅ Testa funktionalitet systematiskt
- ✅ Lära sig använda Browser DevTools
- ✅ Förstå vanliga fel och lösningar
- ✅ Debugging-tekniker

---

## ✅ Testplan

### **1. Funktionella tester**

#### **Startsida (index.html)**

- [ ] **Filmgalleri**
  - Filmer laddas och visas
  - Grid-layout fungerar
  - Filmkort har poster, titel, betyg, genre

- [ ] **Sökfunktion**
  - Kan söka efter filmtitel
  - Debouncing fungerar (väntar innan sökning)
  - Sökningen filtrerar korrekt
  - Tom sökning visar alla filmer igen

- [ ] **Genre-filter**
  - Dropdown visar alla genrer
  - Filtrering fungerar korrekt
  - "Alla genrer" visar alla filmer

- [ ] **Favoriter**
  - Kan lägga till film i favoriter
  - Hjärta-ikon visas på favoriter
  - Kan ta bort från favoriter
  - Favorit-räknare uppdateras

- [ ] **"Ladda fler"**
  - Knappen fungerar
  - Nya filmer läggs till i slutet
  - Loading-state visas

- [ ] **Loading states**
  - Spinner visas när data laddas
  - Spinner försvinner när data är klar

- [ ] **Navigation**
  - Länkar till Favoriter fungerar
  - Klick på filmkort öppnar detaljsida

#### **Favoritsida (favorites.html)**

- [ ] **Favoriter visas**
  - Sparade favoriter laddas från localStorage
  - Filmkort visas korrekt

- [ ] **Empty state**
  - Visas när inga favoriter finns
  - Länk tillbaka till startsidan fungerar

- [ ] **Ta bort favoriter**
  - Kan ta bort film från favoriter
  - Sidan uppdateras korrekt

#### **Detaljsida (movie-details.html)**

- [ ] **URL Parameters**
  - Film-ID hämtas från URL
  - Rätt film visas

- [ ] **Filmdetaljer**
  - Poster visas
  - Titel, betyg, år, längd visas
  - Genrer visas som chips
  - Handling visas
  - Regissör och skådespelare visas

- [ ] **Tillbaka-knapp**
  - Navigerar tillbaka med history.back()
  - Går till startsidan om ingen history

- [ ] **Favorit-knapp**
  - Kan lägga till/ta bort favorit
  - Knappen uppdateras korrekt

- [ ] **Dela-knapp**
  - Web Share API används om tillgängligt
  - Fallback till clipboard fungerar
  - Toast-meddelande visas

- [ ] **Sidtitel**
  - Browser-tab visar filmnamn

---

### **2. Responsiva tester**

Testa på följande bredder:

#### **Mobil (< 768px)**

- [ ] Header blir vertikal
- [ ] Sökfält blir vertikalt
- [ ] Filmkort blir mindre (150px)
- [ ] Modal tar 95% av skärmen
- [ ] Detaljsida blir 1 kolumn
- [ ] Allt är läsbart utan zoom
- [ ] Knappar är lätta att klicka (minst 44px)

#### **Tablet (768px - 1024px)**

- [ ] Layout ser bra ut
- [ ] Filmkort har lagom storlek
- [ ] Inget onödigt whitespace

#### **Desktop (> 1024px)**

- [ ] Innehåll är centrerat
- [ ] Max-width på container respekteras
- [ ] Filmkort inte för stora eller små

---

### **3. Tillgänglighetstester**

- [ ] **Tangentbordsnavigation**
  - Kan tabba igenom alla interaktiva element
  - Focus-states är synliga
  - Enter/Space aktiverar knappar

- [ ] **ARIA-attribut**
  - `aria-label` på ikoner
  - `aria-live` för dynamiskt innehåll
  - `role="alert"` för felmeddelanden

- [ ] **Alt-texter**
  - Alla bilder har alt-attribut
  - Alt-texter är beskrivande

- [ ] **Färgkontrast**
  - Text är läsbar mot bakgrund
  - Minst 4.5:1 för normal text

- [ ] **Skärmläsare** (om möjligt)
  - Testa med NVDA (Windows) eller VoiceOver (Mac)
  - Innehåll läses i logisk ordning

---

### **4. Prestandatester**

- [ ] **Laddningstid**
  - Sidan laddar på < 3 sekunder
  - Ingen JavaScript-blockering

- [ ] **Animationer**
  - Smidiga transitions
  - Ingen laggy scroll

- [ ] **localStorage**
  - Data sparas korrekt
  - Ingen överfylld localStorage

---

## 🐛 Vanliga fel och lösningar

### **1. "Failed to load module script"**

**Symptom:** Sidan fungerar inte, felmeddelande i Console

**Orsak:** Du öppnar `file://` istället för `http://`

**Lösning:**
```bash
# Starta HTTP-server
python -m http.server 8000
# eller
npx http-server -p 8000
```

---

### **2. "Uncaught SyntaxError: Cannot use import statement outside a module"**

**Orsak:** Script-taggen saknar `type="module"`

**Lösning:**
```html
<!-- ❌ Fel -->
<script src="js/app.js"></script>

<!-- ✅ Rätt -->
<script type="module" src="js/app.js"></script>
```

---

### **3. "Uncaught ReferenceError: Storage is not defined"**

**Orsak:** Glömt att importera modulen

**Lösning:**
```javascript
// Lägg till i början av filen
import { Storage } from './storage.js';
```

---

### **4. "Uncaught TypeError: Cannot read property 'textContent' of null"**

**Orsak:** Elementet finns inte i DOM

**Lösning:**
```javascript
// Kontrollera att element finns
const element = document.getElementById('myElement');
if (element) {
    element.textContent = 'Hello';
} else {
    console.warn('Element not found!');
}
```

---

### **5. Modules laddas inte i rätt ordning**

**Orsak:** Glömt `.js` i import-sökväg

**Lösning:**
```javascript
// ❌ Fel
import { Storage } from './storage';

// ✅ Rätt
import { Storage } from './storage.js';
```

---

### **6. localStorage fungerar inte**

**Orsak:** 
- Privat läge i webbläsaren
- localStorage är full
- Felaktig data-typ

**Lösning:**
```javascript
try {
    localStorage.setItem('test', 'value');
    localStorage.removeItem('test');
    console.log('localStorage works!');
} catch (error) {
    console.error('localStorage not available:', error);
    // Använd fallback (in-memory storage)
}
```

---

### **7. Favoriter försvinner efter reload**

**Orsak:** Data sparas inte i localStorage

**Lösning:**
```javascript
// Kontrollera att du sparar
Storage.addFavorite(movie); // ✅

// Inte bara i minnet
this.favorites.push(movie); // ❌ Försvinner efter reload
```

---

### **8. CSS laddas inte**

**Orsak:** Fel sökväg till CSS-fil

**Lösning:**
```html
<!-- Kontrollera sökvägen -->
<link rel="stylesheet" href="css/styles.css">

<!-- I DevTools Network, kolla status för CSS-filer -->
```

---

## 🔧 Debugging-tekniker

### **1. Console-meddelanden**

```javascript
// Basic logging
console.log('Variable:', myVariable);

// Warnings
console.warn('This might be a problem');

// Errors
console.error('Something went wrong!');

// Table för arrays/objekt
console.table(movies);

// Group
console.group('Movie Details');
console.log('Title:', movie.title);
console.log('Year:', movie.year);
console.groupEnd();
```

### **2. Debugger Statement**

```javascript
function loadMovies() {
    debugger; // Execution pausar här
    const movies = await movieAPI.fetchMovies();
    console.log(movies);
}
```

### **3. Breakpoints i DevTools**

1. Öppna DevTools (F12)
2. Gå till **Sources**-fliken
3. Hitta din JavaScript-fil
4. Klicka på radnummer för att sätta breakpoint
5. Ladda om sidan
6. Execution pausar vid breakpoint

**Knappar:**
- **Resume** (F8) - Fortsätt execution
- **Step Over** (F10) - Gå till nästa rad
- **Step Into** (F11) - Gå in i funktionsanrop
- **Step Out** (Shift+F11) - Gå ut ur funktion

### **4. Network-fliken**

Använd för att:
- Se vilka filer som laddas
- Kontrollera HTTP status codes
- Se request/response data
- Mäta laddningstider

**Status codes:**
- **200** - OK
- **304** - Not Modified (cachad)
- **404** - Not Found
- **500** - Server Error

### **5. Application-fliken**

Använd för att:
- Inspektera **localStorage**
- Se **sessionStorage**
- Kolla **cookies**
- Rensa cached data

**localStorage viewer:**
1. Öppna DevTools
2. Gå till **Application**
3. Expandera **Local Storage**
4. Klicka på din domän
5. Se alla sparade key-value pairs

### **6. Elements-fliken**

Använd för att:
- Inspektera HTML-struktur
- Se computed CSS
- Redigera HTML/CSS live
- Kontrollera event listeners

**Tips:**
- Högerklicka element → Inspect
- Dubbelklicka för att redigera
- Ctrl+F för att söka i DOM

---

## 🎯 Checklista före leverans

- [ ] **Funktionalitet**
  - Alla funktioner fungerar
  - Inga JavaScript-fel i Console
  - Loading states visas korrekt

- [ ] **Design**
  - Konsistent styling
  - Responsiv på alla enheter
  - Inga layoutfel

- [ ] **Kod-kvalitet**
  - Kod är kommenterad
  - Inga `console.log()` kvar
  - Inga oanvända variabler

- [ ] **Prestanda**
  - Sidan laddar snabbt
  - Inga onödiga re-renders
  - Optimerade bilder

- [ ] **Tillgänglighet**
  - ARIA-attribut är korrekta
  - Tangentbordsnavigation fungerar
  - Alt-texter finns

- [ ] **Browser-kompatibilitet**
  - Testat i Chrome
  - Testat i Firefox
  - Testat i Safari (om möjligt)

---

## 💡 Tips

- **Testa ofta** - Inte bara i slutet
- **Använd DevTools** - Det är din bästa vän
- **Läs felmeddelanden** - De säger ofta exakt vad som är fel
- **Isolera problem** - Kommentera ut kod för att hitta felet
- **Google är din vän** - Sök på felmeddelanden
- **Validera kod** - Använd linters och validators

---

## ➡️ Nästa steg

Bra jobbat! Din app fungerar nu. Nästa steg är att lära sig om extra funktioner och deployment.

**Gå vidare till:** [Steg 13: Extra funktioner och förbättringar](./steg-13-extra.md)

---

[⬅️ Steg 11: JS Details](./steg-11-js-details.md) | [📚 Innehåll](./README.md) | [Steg 13: Extra →](./steg-13-extra.md)
