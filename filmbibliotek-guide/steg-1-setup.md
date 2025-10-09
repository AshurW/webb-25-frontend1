# Steg 1: Setup och Projektstruktur

I detta första steg skapar vi projektmappen och förbereder utvecklingsmiljön.

---

## 🎯 Mål för detta steg

- ✅ Skapa projektmappen och alla undermappar
- ✅ Förstå projektstrukturen
- ✅ Sätta upp en lokal HTTP-server
- ✅ Förstå varför vi behöver ES6 Modules

---

## 📁 Skapa projektstruktur

### 1. Skapa huvudmappen

Skapa en ny mapp för projektet:

```bash
filmbibliotek/
```

### 2. Skapa alla undermappar och filer

Inuti `filmbibliotek/`, skapa denna struktur:

```
filmbibliotek/
│
├── index.html
├── favorites.html
├── movie-details.html
│
├── css/
│   ├── styles.css
│   ├── components.css
│   └── responsive.css
│
├── js/
│   ├── utils.js
│   ├── storage.js
│   ├── api.js
│   ├── ui.js
│   ├── app.js
│   ├── favorites.js
│   └── movie-details.js
│
└── assets/
    └── images/
```

### 3. Skapa tomma filer

Du kan skapa tomma filer nu som vi fyller i senare:

**HTML-filer:**
- `index.html`
- `favorites.html`
- `movie-details.html`

**CSS-filer:**
- `css/styles.css`
- `css/components.css`
- `css/responsive.css`

**JavaScript-filer:**
- `js/utils.js`
- `js/storage.js`
- `js/api.js`
- `js/ui.js`
- `js/app.js`
- `js/favorites.js`
- `js/movie-details.js`

---

## 🏗️ Förståelse av strukturen

### **HTML-filer** (3 st)

| Fil | Syfte |
|-----|-------|
| `index.html` | Huvudsida - visar filmgalleri, sök och filter |
| `favorites.html` | Favoritsida - visar sparade favoriter |
| `movie-details.html` | Detaljsida - visar enskild films information |

### **CSS-filer** (3 st)

| Fil | Syfte |
|-----|-------|
| `styles.css` | Grundläggande styles, variabler, layout |
| `components.css` | Komponenter (kort, knappar, modal) |
| `responsive.css` | Media queries för responsiv design |

### **JavaScript-filer** (7 st)

| Fil | Syfte | Exporterar |
|-----|-------|------------|
| `utils.js` | Hjälpfunktioner | `Utils` objekt |
| `storage.js` | localStorage-hantering | `Storage` objekt |
| `api.js` | API-kommunikation | `MovieAPI` klass |
| `ui.js` | UI-rendering | `UI` objekt |
| `app.js` | Huvudapplikation | - (entry point) |
| `favorites.js` | Favoritsida-logik | - (entry point) |
| `movie-details.js` | Detaljsida-logik | - (entry point) |

---

## 🔧 Sätta upp lokal HTTP-server

**VIKTIGT:** Projektet använder ES6 Modules som kräver att du kör en HTTP-server. Du kan INTE öppna `index.html` direkt i webbläsaren (`file://` fungerar inte).

### **Alternativ 1: VS Code Live Server (Rekommenderas)**

1. Installera "Live Server" extension i VS Code
2. Högerklicka på `index.html`
3. Välj "Open with Live Server"
4. Sidan öppnas på `http://localhost:5500` (eller liknande)

### **Alternativ 2: Python**

Om du har Python installerat:

```bash
# Navigera till projektmappen i terminalen
cd filmbibliotek

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Öppna sedan `http://localhost:8000` i webbläsaren.

### **Alternativ 3: Node.js**

Om du har Node.js installerat:

```bash
# Installera http-server globalt (en gång)
npm install -g http-server

# Navigera till projektmappen
cd filmbibliotek

# Starta server
http-server -p 8000
```

Öppna sedan `http://localhost:8000` i webbläsaren.

### **Alternativ 4: PHP**

Om du har PHP installerat:

```bash
cd filmbibliotek
php -S localhost:8000
```

---

## 📚 Vad är ES6 Modules?

### **Gammalt sätt (utan modules):**

```html
<script src="js/utils.js"></script>
<script src="js/storage.js"></script>
<script src="js/api.js"></script>
<script src="js/ui.js"></script>
<script src="js/app.js"></script>
```

**Problem:**
- Måste ladda i rätt ordning
- Allt blir globala variabler
- Risk för namnkollisioner
- Svårt att se beroenden

### **Nytt sätt (med ES6 modules):**

```html
<script type="module" src="js/app.js" defer></script>
```

**Fördelar:**
- ✅ Endast EN script-tag
- ✅ Beroenden hanteras automatiskt
- ✅ Inga globala variabler
- ✅ Tydliga import/export
- ✅ Modern och professionell

### **Hur det fungerar:**

**I en modul (t.ex. `storage.js`):**
```javascript
export const Storage = {
    // funktioner här
};
```

**I en annan modul (t.ex. `app.js`):**
```javascript
import { Storage } from './storage.js';

// Nu kan vi använda Storage
Storage.getFavorites();
```

---

## ✅ Checklista innan nästa steg

Innan du går vidare till Steg 2, se till att:

- [ ] Du har skapat alla mappar och filer
- [ ] Du har valt och testat en HTTP-server
- [ ] Du kan öppna projektet i webbläsaren (även om det är tomt)
- [ ] Du förstår grunderna i ES6 Modules

---

## 🎓 Vad du lärt dig

- ✅ Hur man strukturerar ett webbutvecklingsprojekt
- ✅ Skillnaden mellan HTML, CSS och JavaScript-filer
- ✅ Varför vi behöver en HTTP-server för moderna JavaScript-projekt
- ✅ Grunderna i ES6 Modules

---

## 💡 Tips

- **Organisera dina filer** från början - det gör projektet mycket lättare att underhålla
- **Använd VS Code** för bästa utvecklingsupplevelse
- **Håll terminalen öppen** när du jobbar, så ser du om servern kraschar
- **Ladda om sidan ofta** för att se dina ändringar

---

## 🐛 Vanliga problem

### **Problem: "Failed to load module script"**
**Lösning:** Du öppnar sidan med `file://` istället för `http://`. Starta en HTTP-server.

### **Problem: Ingenting händer när jag öppnar index.html**
**Lösning:** Det är normalt i detta steg - vi har inte skrivit någon kod än!

### **Problem: Live Server fungerar inte**
**Lösning:** Starta om VS Code eller använd ett annat alternativ (Python/Node.js).

---

## ➡️ Nästa steg

Bra jobbat! Nu är projektet uppsatt och klart för utveckling.

**Gå vidare till:** [Steg 2: HTML - Grundstruktur](./steg-2-html.md)

---

[⬅️ Tillbaka till innehåll](./README.md) | [Steg 2: HTML →](./steg-2-html.md)
