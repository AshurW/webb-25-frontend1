// ===========================
// Enkel HTTP-server för Filmbibliotek
// ===========================

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

// MIME-typer för olika filändelser
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Hantera root-path
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Ta bort query parameters
    filePath = filePath.split('?')[0];
    
    // Skapa fullständig sökväg
    const fullPath = path.join(__dirname, filePath);
    
    // Kontrollera om filen finns
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            // 404 - Filen hittades inte
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <!DOCTYPE html>
                <html lang="sv">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>404 - Fil hittades inte</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            text-align: center; 
                            padding: 50px;
                            background-color: #141414;
                            color: white;
                        }
                        h1 { color: #e50914; }
                        a { color: #e50914; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <h1>404 - Fil hittades inte</h1>
                    <p>Den begärda filen kunde inte hittas.</p>
                    <a href="/">← Tillbaka till startsidan</a>
                </body>
                </html>
            `);
            return;
        }
        
        // Läs filen
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
                return;
            }
            
            // Bestäm MIME-typ baserat på filändelse
            const ext = path.extname(fullPath).toLowerCase();
            const contentType = mimeTypes[ext] || 'text/plain';
            
            // Sätt headers
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log('🎬 Filmbibliotek Server');
    console.log('========================');
    console.log(`Server körs på: http://localhost:${PORT}`);
    console.log('Tryck Ctrl+C för att stoppa servern');
    console.log('');
    console.log('📁 Projektstruktur:');
    console.log('├── index.html (Huvudsida)');
    console.log('├── favorites.html (Favoriter)');
    console.log('├── movie-details.html (Filmdetaljer)');
    console.log('├── css/ (Stilar)');
    console.log('├── js/ (JavaScript-moduler)');
    console.log('└── assets/ (Bilder)');
    console.log('');
    console.log('🚀 Öppna http://localhost:8000 i din webbläsare!');
});

// Hantera avslutning
process.on('SIGINT', () => {
    console.log('\n👋 Stänger servern...');
    server.close(() => {
        console.log('✅ Server stängd');
        process.exit(0);
    });
});
