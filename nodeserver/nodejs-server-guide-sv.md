# Node.js Server Grunderna - En Komplett Guide

## Innehållsförteckning
1. [Introduktion](#introduktion)
2. [Vad är Node.js?](#vad-är-nodejs)
3. [Sätta upp Node.js](#sätta-upp-nodejs)
4. [Skapa Din Första Server](#skapa-din-första-server)
5. [Förstå HTTP-metoder](#förstå-http-metoder)
6. [Servera Statiska Filer](#servera-statiska-filer)
7. [Skapa en Live Server (VS Code Live Server-alternativ)](#skapa-en-live-server-vs-code-live-server-alternativ)
8. [Hantera Olika Filtyper](#hantera-olika-filtyper)
9. [Felhantering](#felhantering)
10. [Lägga till Auto-Reload (Hot Reload)](#lägga-till-auto-reload-hot-reload)
11. [Övningar](#övningar)

## Introduktion

Denna guide kommer lära dig hur man skapar webbservrar med Node.js. I slutet kommer du att förstå hur man bygger en enkel server som kan servera statiska filer, liknande VS Code:s Live Server-tillägg.

## Vad är Node.js?

Node.js är en JavaScript-runtime som låter dig köra JavaScript på serversidan (utanför webbläsare). Den är byggd på Chrome:s V8 JavaScript-motor och använder en händelsedriven, icke-blockerande I/O-modell.

### Nyckelfunktioner:
- **Server-side JavaScript**: Kör JavaScript på servern
- **Händelsedriven**: Svarar på händelser när de inträffar
- **Icke-blockerande**: Kan hantera flera förfrågningar samtidigt
- **NPM**: Pakethanterare med tusentals bibliotek

## Sätta upp Node.js

### 1. Installation
Ladda ner och installera Node.js från [nodejs.org](https://nodejs.org/). Välj LTS-versionen (Long Term Support).

### 2. Verifiera Installation
Öppna din terminal/kommandotolk och kör:
```bash
node --version
npm --version
```

### 3. Initiera ett Projekt
Skapa en ny mapp för ditt projekt och initiera det:
```bash
mkdir my-server
cd my-server
npm init -y
```

## Skapa Din Första Server

Låt oss börja med den enklaste möjliga servern:

### Grundläggande Server Exempel
```javascript
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hej Världen från Node.js!</h1>');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
});
```

### Köra Servern
```bash
node server.js
```

Besök `http://localhost:3000` i din webbläsare för att se resultatet.

### Förstå Koden

1. **`require('http')`**: Importerar Node.js inbyggda HTTP-modul
2. **`http.createServer()`**: Skapar en ny HTTP-server
3. **`(req, res) => {}`**: Callback-funktion som hanterar varje förfrågan
   - `req`: Request-objekt (innehåller info om den inkommande förfrågan)
   - `res`: Response-objekt (används för att skicka data tillbaka till klienten)
4. **`res.writeHead()`**: Sätter statuskod och headers
5. **`res.end()`**: Skickar svaret och stänger anslutningen
6. **`server.listen()`**: Startar servern på den angivna porten

## Förstå HTTP-metoder

### Hantera Olika Rutter
```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    console.log(`${method} ${path}`);

    if (method === 'GET') {
        switch (path) {
            case '/':
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Hemsida</h1><p>Välkommen till vår server!</p>');
                break;
            case '/about':
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Om Oss-sida</h1><p>Detta är om oss-sidan.</p>');
                break;
            case '/api/data':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Hej från API!', timestamp: new Date() }));
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Sida Inte Hittad</h1>');
        }
    } else if (method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ received: body }));
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
});
```

## Servera Statiska Filer

Nu ska vi skapa en server som serverar statiska filer som HTML, CSS och JavaScript-filer:

### Filstruktur
```
my-server/
├── server.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── package.json
```

### Statisk Filserver
```javascript
// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Ta bort query string och avkoda URL
    let filePath = req.url.split('?')[0];
    if (filePath === '/') filePath = '/index.html';
    
    // Säkerhet: förhindra katalogtraversering
    filePath = path.join(__dirname, 'public', filePath); // ./public/index.html
    
    
    // Hämta filtillägg
    const extname = path.extname(filePath).toLowerCase();
    
    // Sätt content type baserat på filtillägg
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };
    
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Läs och servera filen
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Fil inte hittad
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Fil Inte Hittad</h1>');
            } else {
                // Serverfel
                res.writeHead(500);
                res.end('Serverfel: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
    console.log(`Serverar filer från: ${path.join(__dirname, 'public')}`);
});
```

### Exempel HTML-fil
```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Min Node.js Server</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Välkommen till Min Server!</h1>
    <p>Denna sida serveras av vår Node.js-server.</p>
    <button id="btn">Klicka på mig!</button>
    <script src="script.js"></script>
</body>
</html>
```

### Exempel CSS-fil
```css
/* public/style.css */
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
```

### Exempel JavaScript-fil
```javascript
// public/script.js
document.getElementById('btn').addEventListener('click', function() {
    alert('Hej från klientsidan JavaScript!');
});
```

## Skapa en Live Server (VS Code Live Server-alternativ)

Låt oss förbättra vår server för att inkludera live reload-funktionalitet:

### Förbättrad Live Server
```javascript
// live-server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

class LiveServer {
    constructor(port = 3000, publicDir = 'public') {
        this.port = port;
        this.publicDir = publicDir;
        this.clients = new Set();
    }

    // MIME-typer för olika filtillägg
    getMimeType(extname) {
        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf'
        };
        return mimeTypes[extname] || 'application/octet-stream';
    }

    // Servera statiska filer
    serveFile(filePath, res) {
        const extname = path.extname(filePath).toLowerCase();
        const contentType = this.getMimeType(extname);

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    this.send404(res);
                } else {
                    this.send500(res, error);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }

    // Injicera live reload-skript i HTML
    injectLiveReload(content) {
        const liveReloadScript = `
            <script>
                (function() {
                    const eventSource = new EventSource('/live-reload');
                    eventSource.onmessage = function(event) {
                        if (event.data === 'reload') {
                            window.location.reload();
                        }
                    };
                })();
            </script>
        `;
        
        // Infoga före stängande body-tagg
        return content.replace('</body>', liveReloadScript + '</body>');
    }

    // Hantera live reload endpoint
    handleLiveReload(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        });

        // Lagra klientanslutning
        this.clients.add(res);
        
        // Skicka initial anslutningsmeddelande
        res.write('data: connected\n\n');

        // Hantera klientfrånkoppling
        req.on('close', () => {
            this.clients.delete(res);
        });
    }

    // Meddela alla klienter att ladda om
    notifyReload() {
        this.clients.forEach(client => {
            try {
                client.write('data: reload\n\n');
            } catch (error) {
                this.clients.delete(client);
            }
        });
    }

    // Skicka 404-svar
    send404(res) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>404 - Inte Hittad</title></head>
            <body>
                <h1>404 - Fil Inte Hittad</h1>
                <p>Den begärda filen kunde inte hittas.</p>
            </body>
            </html>
        `);
    }

    // Skicka 500-svar
    send500(res, error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>500 - Serverfel</title></head>
            <body>
                <h1>500 - Serverfel</h1>
                <p>Ett fel inträffade: ${error.message}</p>
            </body>
            </html>
        `);
    }

    // Huvudförfrågningshanterare
    handleRequest(req, res) {
        const url = req.url.split('?')[0];
        
        // Hantera live reload endpoint
        if (url === '/live-reload') {
            this.handleLiveReload(req, res);
            return;
        }

        // Bestäm filsökväg
        let filePath = url === '/' ? '/index.html' : url;
        filePath = path.join(__dirname, this.publicDir, filePath);

        // Säkerhet: förhindra katalogtraversering
        const publicPath = path.join(__dirname, this.publicDir);
        if (!filePath.startsWith(publicPath)) {
            this.send404(res);
            return;
        }

        // Kontrollera om filen finns och servera den
        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                this.send404(res);
                return;
            }

            const extname = path.extname(filePath).toLowerCase();
            
            if (extname === '.html') {
                // För HTML-filer, injicera live reload-skript
                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        this.send500(res, error);
                        return;
                    }
                    
                    const modifiedContent = this.injectLiveReload(content.toString());
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(modifiedContent);
                });
            } else {
                // För andra filer, servera normalt
                this.serveFile(filePath, res);
            }
        });
    }

    // Starta servern
    start() {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(this.port, () => {
            console.log(`🚀 Live Server körs på http://localhost:${this.port}`);
            console.log(`📁 Serverar filer från: ${path.join(__dirname, this.publicDir)}`);
            console.log(`🔄 Live reload aktiverat`);
            console.log(`Tryck Ctrl+C för att stoppa servern`);
        });

        // Övervaka filändringar
        this.watchFiles();
    }

    // Övervaka filändringar och ladda om
    watchFiles() {
        const watchPath = path.join(__dirname, this.publicDir);
        
        fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
            if (filename && (filename.endsWith('.html') || filename.endsWith('.css') || filename.endsWith('.js'))) {
                console.log(`📝 Fil ändrad: ${filename}`);
                this.notifyReload();
            }
        });
    }
}

// Starta live-servern
const liveServer = new LiveServer(3000, 'public');
liveServer.start();
```

## Hantera Olika Filtyper

### Avancerad MIME-typ Hantering
```javascript
// Förbättrad MIME-typdetektering
const mimeTypes = {
    // Textfiler
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    
    // Bilder
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    
    // Teckensnitt
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    
    // Arkiv
    '.zip': 'application/zip',
    '.tar': 'application/x-tar',
    '.gz': 'application/gzip',
    
    // Dokument
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};
```

## Felhantering

### Omfattande Felhantering
```javascript
// error-handler.js
class ErrorHandler {
    static handleError(error, req, res) {
        console.error('Fel:', error);
        
        if (error.code === 'ENOENT') {
            this.send404(res);
        } else if (error.code === 'EACCES') {
            this.send403(res);
        } else if (error.code === 'EMFILE' || error.code === 'ENFILE') {
            this.send503(res);
        } else {
            this.send500(res, error);
        }
    }

    static send404(res) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>404 - Inte Hittad</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    h1 { color: #e74c3c; }
                </style>
            </head>
            <body>
                <h1>404 - Sida Inte Hittad</h1>
                <p>Den begärda resursen kunde inte hittas.</p>
                <a href="/">Gå Hem</a>
            </body>
            </html>
        `);
    }

    static send403(res) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>403 - Förbjudet</title></head>
            <body>
                <h1>403 - Åtkomst Förbjuden</h1>
                <p>Du har inte behörighet att komma åt denna resurs.</p>
            </body>
            </html>
        `);
    }

    static send500(res, error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>500 - Serverfel</title></head>
            <body>
                <h1>500 - Internt Serverfel</h1>
                <p>Något gick fel på vår sida.</p>
                ${process.env.NODE_ENV === 'development' ? `<pre>${error.stack}</pre>` : ''}
            </body>
            </html>
        `);
    }

    static send503(res) {
        res.writeHead(503, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>503 - Tjänst Otillgänglig</title></head>
            <body>
                <h1>503 - Tjänst Otillgänglig</h1>
                <p>Servern kan tillfälligt inte hantera förfrågan.</p>
            </body>
            </html>
        `);
    }
}
```

## Lägga till Auto-Reload (Hot Reload)

## Övningar

### Övning 1: Grundläggande Server
Skapa en server som svarar med olika meddelanden för olika rutter:
- `/` → "Välkommen till min server!"
- `/about` → "Detta är om oss-sidan"
- `/contact` → "Kontakta oss på example@email.com"

### Övning 2: Filserver
Bygg en filserver som kan servera vilken fil som helst från en `public`-mapp. Hantera åtminstone dessa filtyper:
- HTML-filer
- CSS-filer
- JavaScript-filer
- Bilder (PNG, JPG, GIF)

### Övning 3: API Endpoints
Skapa API-endpoints som returnerar JSON-data:
- `GET /api/users` → Returnera en lista över användare
- `GET /api/users/:id` → Returnera en specifik användare
- `POST /api/users` → Skapa en ny användare

### Övning 4: Live Reload
Implementera en grundläggande live reload-funktion som automatiskt uppdaterar webbläsaren när filer ändras.

### Övning 5: Felsidor
Skapa anpassade felsidor för:
- 404 (Inte Hittad)
- 500 (Serverfel)
- 403 (Förbjudet)

## Slutsats

Du har lärt dig hur man:
1. Skapar grundläggande HTTP-servrar med Node.js
2. Hanterar olika HTTP-metoder och rutter
3. Serverar statiska filer
4. Implementerar live reload-funktionalitet
5. Hanterar fel på ett elegant sätt
6. Övervakar filändringar

Denna kunskap bildar grunden för att bygga mer komplexa webbapplikationer och API:er med Node.js. Live server-exemplet visar hur verktyg som VS Code Live Server fungerar under huven.

## Nästa Steg

- Lär dig om Express.js för enklare serverutveckling
- Utforska WebSockets för realtidskommunikation
- Studera RESTful API-designprinciper
- Öva med databaser (MongoDB, PostgreSQL)
- Lär dig om autentisering och säkerhet

## Resurser

- [Node.js Officiell Dokumentation](https://nodejs.org/docs/)
- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [Express.js Framework](https://expressjs.com/)
- [Socket.io för Realtidskommunikation](https://socket.io/)
