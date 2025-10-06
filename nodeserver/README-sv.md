# Node.js Server Exempel

Denna mapp innehåller exempel och övningar för att lära sig Node.js serverutveckling. Perfekt för studenter som vill förstå hur webbservrar fungerar och hur man bygger sina egna.

## 📚 Vad Du Kommer Lära Dig

- Hur man skapar HTTP-servrar med Node.js
- Hantera olika HTTP-metoder (GET, POST, etc.)
- Servera statiska filer (HTML, CSS, JavaScript, bilder)
- Bygga en live reload-server (som VS Code Live Server)
- Grundläggande felhantering och säkerhet
- Grundläggande API-utveckling

## 🚀 Snabbstart

### Förutsättningar
- Node.js installerat (version 14 eller högre)
- Grundläggande kunskaper i JavaScript
- En textredigerare (VS Code rekommenderas)

### Installation
1. Navigera till denna mapp:
   ```bash
   cd node
   ```

2. Installera beroenden:
   ```bash
   npm install
   ```

3. Börja utforska!

## 📁 Filöversikt

### Dokumentation
- `nodejs-server-guide.md` - Komplett handledning och referensguide
- `README.md` - Denna fil

### Serverexempel
- `basic-server.js` - Enkel HTTP-server med API-endpoints
- `simple-live-server.js` - Live reload-server (VS Code Live Server-alternativ)

### Exempelfiler
- `public/index.html` - Demosida för live-servern
- `public/style.css` - Stilar för demosidan
- `public/script.js` - JavaScript för demosidan

### Konfiguration
- `package.json` - Projektkonfiguration och skript

## 🎯 Kom Igång

### 1. Grundläggande Server
Börja med den grundläggande servern för att förstå HTTP-grunder:

```bash
npm run basic
# eller
node basic-server.js
```

Besök `http://localhost:3000` för att se servern i aktion.

**Vad du kommer se:**
- Hemsida med tillgängliga endpoints
- API-endpoints som returnerar JSON-data
- Olika HTTP-metoder i aktion

### 2. Live Server
Prova live reload-servern för utveckling:

```bash
npm start
# eller
node simple-live-server.js
```

Besök `http://localhost:3000` och prova att redigera filerna i `public/`-mappen. Se sidan ladda om automatiskt!

**Funktioner:**
- Serverar statiska filer (HTML, CSS, JS, bilder)
- Live reload när filer ändras
- Korrekt MIME-typdetektering
- Säkerhetsfunktioner (skydd mot katalogtraversering)

## 🛠️ Tillgängliga Skript

```bash
npm start          # Starta live-servern
npm run basic      # Starta den grundläggande servern
npm run dev        # Alias för start
```

## 📖 Inlärningsväg

### Nybörjarnivå
1. **Läs guiden**: Börja med `nodejs-server-guide.md`
2. **Kör grundläggande server**: Förstå HTTP-grunder
3. **Utforska endpoints**: Prova olika URL:er och metoder
4. **Modifiera svar**: Redigera serverkoden och starta om

### Mellannivå
1. **Live server**: Förstå filservering och live reload
2. **Lägg till nya endpoints**: Utöka den grundläggande servern
3. **Hantera POST-förfrågningar**: Lär dig om request bodies
4. **Felhantering**: Implementera korrekta felresponser

### Avancerad nivå
1. **Filövervakning**: Förstå hur live reload fungerar
2. **Säkerhet**: Lär dig om katalogtraversering och CORS
3. **Prestanda**: Optimera filservering
4. **Realtidsfunktioner**: Utforska WebSockets

## 🎮 Interaktiva Exempel

### Grundläggande Server Endpoints
- `GET /` - Hemsida med navigering
- `GET /hello` - Enkel hälsning
- `GET /time` - Aktuell servertid (JSON)
- `GET /api/users` - Lista alla användare (JSON)
- `GET /api/users/:id` - Hämta specifik användare (JSON)
- `POST /api/users` - Skapa ny användare (JSON)

### Testning med curl
```bash
# Hämta alla användare
curl http://localhost:3000/api/users

# Hämta specifik användare
curl http://localhost:3000/api/users/1

# Skapa ny användare
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Testning med JavaScript (i webbläsarkonsol)
```javascript
// Hämta användare
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));

// Skapa användare
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Jane Doe', email: 'jane@example.com' })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🔧 Anpassning

### Lägga Till Nya Endpoints
Redigera `basic-server.js` och lägg till nya fall i switch-satsen:

```javascript
case '/my-endpoint':
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hej från min endpoint!' }));
    break;
```

### Lägga Till Nya Filtyper
Redigera `simple-live-server.js` och lägg till MIME-typer:

```javascript
const mimeTypes = {
    // ... befintliga typer
    '.md': 'text/markdown',
    '.txt': 'text/plain'
};
```

### Ändra Port
Sätt PORT-miljövariabeln:
```bash
PORT=8080 node basic-server.js
```

## 🐛 Felsökning

### Port Redan I Användning
Om du får "EADDRINUSE"-fel:
```bash
# Hitta process som använder port 3000
lsof -i :3000

# Döda processen
kill -9 <PID>

# Eller använd en annan port
PORT=8080 node basic-server.js
```

### Åtkomst Nekad
På vissa system kan du behöva använda en annan port:
```bash
PORT=8080 node simple-live-server.js
```

### Fil Inte Hittad
Se till att du är i rätt mapp och att `public/`-mappen finns:
```bash
ls -la public/
```

## 📚 Ytterligare Resurser

- [Node.js Officiell Dokumentation](https://nodejs.org/docs/)
- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [Express.js Framework](https://expressjs.com/) (nästa steg efter att behärska grunderna)
- [Socket.io för Realtidskommunikation](https://socket.io/)

## 🤝 Bidrag

Hittat en bugg eller vill lägga till ett exempel? Känn dig fri att:
1. Skapa ett problem
2. Forka repositoryt
3. Gör dina ändringar
4. Skicka in en pull request

## 📝 Licens

Detta projekt är öppen källkod och tillgängligt under MIT-licensen.

---

**Lycka till med kodningen! 🚀**

Kom ihåg: Det bästa sättet att lära sig är genom att göra. Börja med den grundläggande servern, experimentera sedan med live-servern. Prova att modifiera koden och se vad som händer!
