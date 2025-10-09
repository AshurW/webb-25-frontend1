# 🎬 Filmbibliotek - Frontend 1 Slutprojekt

En fullständig filmbibliotek-webbplats byggd med HTML, CSS och JavaScript som demonstrerar alla viktiga koncept från Frontend 1-kursen.

## 🚀 Snabbstart

### Alternativ 1: Med Node.js (Rekommenderat)
```bash
# Navigera till projektmappen
cd filmbibliotek

# Starta servern
npm start

# Öppna http://localhost:8000 i din webbläsare
```

### Alternativ 2: Med Python
```bash
# Navigera till projektmappen
cd filmbibliotek

# Starta Python HTTP-server
python -m http.server 8000

# Öppna http://localhost:8000 i din webbläsare
```

### Alternativ 3: Med VS Code Live Server
1. Installera "Live Server" extension i VS Code
2. Högerklicka på `index.html`
3. Välj "Open with Live Server"

## 📁 Projektstruktur

```
filmbibliotek/
│
├── index.html              # Huvudsida med filmgalleri
├── favorites.html          # Sida för sparade favoriter
├── movie-details.html      # Detaljsida för enskild film
│
├── css/
│   ├── styles.css          # Huvudstil och gemensamma styles
│   ├── components.css      # Komponenter (cards, buttons, modals)
│   └── responsive.css      # Media queries
│
├── js/
│   ├── utils.js            # Hjälpfunktioner (exporterar Utils)
│   ├── storage.js          # localStorage-hantering (exporterar Storage)
│   ├── api.js              # API-hantering (exporterar MovieAPI klass)
│   ├── ui.js               # UI-komponenter (exporterar UI)
│   ├── app.js              # Huvudapplikation (importerar alla modules)
│   ├── favorites.js        # Favoritsida-logik
│   └── movie-details.js    # Detaljsida-logik
│
├── assets/
│   └── images/
│       └── placeholder.png # Placeholder för saknade bilder
│
├── server.js               # Enkel HTTP-server
├── package.json            # Node.js konfiguration
└── README.md               # Denna fil
```

## ✨ Funktioner

### 🎯 Grundfunktioner
- **Filmgalleri** - Visa populära filmer i responsiv grid
- **Sökfunktion** - Sök efter filmer med debounced input
- **Genre-filter** - Filtrera filmer efter genre
- **Favoriter** - Spara och hantera favoritfilmer
- **Filmdetaljer** - Detaljerad vy för enskild film
- **Responsiv design** - Fungerar på alla enheter

### 🛠️ Tekniska koncept som demonstreras

#### HTML
- ✅ Semantiska element (`header`, `nav`, `main`, `section`, `article`, `footer`)
- ✅ Formulär och input-hantering
- ✅ Data-attribut för att lagra information
- ✅ Tillgänglighet (aria-labels, alt-texter)

#### CSS
- ✅ **Flexbox** för layout och komponentpositionering
- ✅ **CSS Grid** för filmkort-gallery
- ✅ **Media queries** för responsiv design
- ✅ **Pseudo-klasser** (`:hover`, `:focus`, `:active`, `:nth-child`)
- ✅ **Pseudo-element** (`::before`, `::after`)
- ✅ CSS-variabler för teman
- ✅ Transitions och animationer

#### JavaScript
- ✅ **ES6 Modules** med import/export för modulär kod
- ✅ **OOP** (Klasser och objekt)
- ✅ **Async/Await** för asynkrona operationer
- ✅ **Try-catch** för felhantering
- ✅ **localStorage** för att spara användardata
- ✅ **Array methods** (map, filter, reduce, find, forEach)
- ✅ **DOM-manipulation** (querySelector, createElement, append, remove)
- ✅ **Event handling** och delegation
- ✅ **Debouncing** för prestanda
- ✅ **URL Parameters** (URLSearchParams för routing)
- ✅ **History API** (browser navigation)
- ✅ **Web Share API** med fallback

## 🎨 Design

Projektet använder en modern, mörk design inspirerad av Netflix:
- **Primärfärg**: Röd (#e50914)
- **Bakgrund**: Mörk (#141414)
- **Typografi**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Responsiv**: Mobile-first approach

## 🔧 Utveckling

### Lokal utveckling
```bash
# Starta utvecklingsserver
npm run dev

# Servern startar automatiskt om vid filändringar
```

### Debugging
- Öppna Developer Tools (F12)
- Kontrollera Console för JavaScript-fel
- Använd Network-fliken för att se HTTP-requests
- Använd Sources-fliken för att sätta breakpoints

## 🐛 Felsökning

### Problem: "Failed to load module script"
**Lösning**: Projektet måste köras via HTTP-server, inte `file://` protokoll.

### Problem: "Uncaught SyntaxError: Cannot use import statement outside a module"
**Lösning**: Kontrollera att script-taggar har `type="module"` attribut.

### Problem: Modules laddas inte i rätt ordning
**Lösning**: Kontrollera att alla imports har rätt filsökväg med `.js` filändelse.

## 📱 Responsiv design

- **Mobile** (< 768px): Enkel kolumn, kompakt layout
- **Tablet** (768px - 1024px): Två kolumner, balanserad layout  
- **Desktop** (> 1024px): Tre+ kolumner, full funktionalitet

## 🚀 Deployment

För att publicera projektet:

1. **Testa lokalt** - Kontrollera att allt fungerar
2. **Validera HTML/CSS** - Använd W3C validator
3. **Optimera bilder** - Komprimera för webben
4. **Välj hosting** - Netlify, Vercel, GitHub Pages, etc.
5. **Ladda upp filer** - Via FTP eller Git

## 🎓 Vad har vi lärt oss?

Detta projekt kombinerar alla viktiga koncept från Frontend 1:
- Modern HTML-struktur med semantiska element
- Avancerad CSS med Grid, Flexbox och responsiv design
- Professionell JavaScript med ES6 Modules och OOP
- State management med localStorage
- API-integration (förberedelse för backend)
- Användarvänlig UI/UX med tillgänglighet i fokus

## 📝 Licens

MIT License - Fri att använda för utbildningssyfte.

---

**Lycka till med projektet! 🎬🍿**
