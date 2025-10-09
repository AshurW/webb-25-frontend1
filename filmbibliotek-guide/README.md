# 🎬 Filmbibliotek - Steg-för-steg Guide

Välkommen till det ultimata Frontend 1-projektet! Denna guide tar dig igenom skapandet av en fullständig filmbiblioteks-webbapplikation steg för steg.

## 📚 Om projektet

I detta projekt bygger vi en komplett webbapplikation där användare kan:
- Bläddra bland filmer
- Söka efter specifika filmer
- Filtrera efter genre
- Spara favoriter (localStorage)
- Se detaljerad information om varje film
- Dela filmer med andra

### Tekniker vi använder:
- ✅ **HTML5** - Semantisk struktur
- ✅ **CSS3** - Flexbox, Grid, Media Queries, Animations
- ✅ **JavaScript ES6+** - Modules, Classes, Async/Await
- ✅ **LocalStorage** - Persistent data
- ✅ **Web APIs** - History, Share, Clipboard

---

## 📋 Innehåll

Projektet är uppdelat i **9 steg** som du följer i ordning:

### **Steg 1: Setup och Projektstruktur** 
[→ Gå till Steg 1](./steg-1-setup.md)
- Skapa projektmappar
- Förstå projektstrukturen
- Starta lokal server

### **Steg 2: HTML - Grundstruktur**
[→ Gå till Steg 2](./steg-2-html.md)
- `index.html` - Huvudsida
- `favorites.html` - Favoritsida
- `movie-details.html` - Detaljsida

### **Steg 3: CSS - Bas-styling**
[→ Gå till Steg 3](./steg-3-css-bas.md)
- CSS-variabler
- Reset och grundläggande styles
- Layout och container

### **Steg 4: CSS - Komponenter**
[→ Gå till Steg 4](./steg-4-css-komponenter.md)
- Filmkort
- Knappar
- Modal
- Detaljsida

### **Steg 5: CSS - Responsiv Design**
[→ Gå till Steg 5](./steg-5-css-responsive.md)
- Media queries
- Mobil-anpassning
- Tablet-anpassning

### **Steg 6: JavaScript - Hjälpmoduler**
[→ Gå till Steg 6](./steg-6-js-helpers.md)
- `utils.js` - Hjälpfunktioner
- `storage.js` - localStorage-hantering
- ES6 Modules introduktion

### **Steg 7: JavaScript - API och Data**
[→ Gå till Steg 7](./steg-7-js-api.md)
- `api.js` - API-hantering med OOP
- Mockdata-generering
- Async/Await

### **Steg 8: JavaScript - UI-komponenter**
[→ Gå till Steg 8](./steg-8-js-ui.md)
- `ui.js` - UI-rendering
- Filmkort-generering
- Modal-hantering

### **Steg 9: JavaScript - Huvudapplikation**
[→ Gå till Steg 9](./steg-9-js-app.md)
- `app.js` - Huvudlogik
- Sökning och filtrering
- Event handling

### **Steg 10: JavaScript - Favoritsida**
[→ Gå till Steg 10](./steg-10-js-favorites.md)
- `favorites.js` - Favorit-hantering
- Visa sparade filmer

### **Steg 11: JavaScript - Detaljsida**
[→ Gå till Steg 11](./steg-11-js-details.md)
- `movie-details.js` - Detaljsida
- URL Parameters
- History API
- Web Share API

### **Steg 12: Testing och Felsökning**
[→ Gå till Steg 12](./steg-12-testing.md)
- Testplan
- Vanliga fel och lösningar
- Debugging-tips

### **Steg 13: Extra funktioner och förbättringar**
[→ Gå till Steg 13](./steg-13-extra.md)
- Bonusfunktioner
- Förbättringsförslag
- Backend-integration

---

## 🎯 Rekommenderad arbetsordning

### **För nybörjare:**
Följ stegen i exakt ordning, gör ett steg i taget och testa efter varje steg.

### **För erfarna:**
Du kan hoppa mellan steg, men se till att:
1. Setup (Steg 1) är gjord först
2. HTML (Steg 2) innan CSS
3. Alla JavaScript-moduler (Steg 6-8) innan huvudapplikationen (Steg 9-11)

---

## ⏱️ Tidsuppskattning

- **Snabb genomgång**: 4-6 timmar
- **Normal takt**: 8-12 timmar
- **Grundlig genomgång med förbättringar**: 15-20 timmar

---

## 📦 Vad du behöver

### **Verktyg:**
- En textredigerare (VS Code rekommenderas)
- En webbläsare (Chrome/Firefox för DevTools)
- En lokal HTTP-server (Live Server, Python, eller Node.js)

### **Kunskaper:**
- Grundläggande HTML
- Grundläggande CSS
- Grundläggande JavaScript
- (Tidigare erfarenhet av Flexbox, Grid och ES6 är en fördel)

---

## 🎓 Lärandemål

Efter detta projekt kommer du att kunna:

### **HTML:**
- ✅ Skapa semantisk HTML-struktur
- ✅ Använda formulär och input-element
- ✅ Förstå data-attribut
- ✅ Implementera tillgänglighet (ARIA)

### **CSS:**
- ✅ Använda CSS Grid för layouts
- ✅ Använda Flexbox för komponenter
- ✅ Skapa responsiv design med media queries
- ✅ Använda CSS-variabler
- ✅ Implementera animationer och transitions
- ✅ Använda pseudo-klasser och pseudo-element

### **JavaScript:**
- ✅ Använda ES6 Modules (import/export)
- ✅ Skapa och använda klasser (OOP)
- ✅ Hantera asynkrona operationer (Async/Await)
- ✅ Arbeta med localStorage
- ✅ Manipulera DOM dynamiskt
- ✅ Hantera events effektivt
- ✅ Använda moderna Web APIs
- ✅ Förstå modulär arkitektur

---

## 💡 Tips innan du börjar

1. **Läs igenom hela guiden först** för att få en översikt
2. **Testa ofta** - ladda om sidan efter varje ändring
3. **Använd DevTools** - Console, Network och Elements är dina vänner
4. **Gör egna anpassningar** - byt färger, texter, funktioner
5. **Ta pauser** - bättre att göra lite i taget än allt på en gång
6. **Fråga om hjälp** - om du fastnar, kolla felsökningsguiden (Steg 12)

---

## 🚀 Kom igång!

Redo att börja? Gå till **[Steg 1: Setup och Projektstruktur](./steg-1-setup.md)**

---

## 📞 Har du frågor?

Om du stöter på problem:
1. Kolla [Steg 12: Testing och Felsökning](./steg-12-testing.md)
2. Jämför din kod med exempelkoden
3. Använd browser DevTools för att hitta fel
4. Fråga din lärare eller klasskamrater

**Lycka till! 🎬✨**
