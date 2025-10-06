// simple-live-server.js
// A simple live server similar to VS Code Live Server extension
// Run with: node simple-live-server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

class SimpleLiveServer {
    constructor(port = 3000, publicDir = 'public') {
        this.port = port;
        this.publicDir = publicDir;
        this.clients = new Set();
    }

    // MIME types for different file extensions
    getMimeType(extname) {
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8',
            '.css': 'text/css; charset=utf-8',
            '.js': 'text/javascript; charset=utf-8',
            '.json': 'application/json; charset=utf-8',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
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

    // Inject live reload script into HTML
    injectLiveReload(content) {
        const liveReloadScript = `
            <script>
                (function() {
                    console.log('🔄 Live reload enabled');
                    const eventSource = new EventSource('/live-reload');
                    eventSource.onmessage = function(event) {
                        if (event.data === 'reload') {
                            console.log('🔄 Reloading page...');
                            window.location.reload();
                        }
                    };
                    eventSource.onerror = function(event) {
                        console.log('❌ Live reload connection error');
                    };
                })();
            </script>
        `;
        
        // Insert before closing body tag, or at the end if no body tag
        if (content.includes('</body>')) {
            return content.replace('</body>', liveReloadScript + '</body>');
        } else {
            return content + liveReloadScript;
        }
    }

    // Handle live reload endpoint
    handleLiveReload(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Cache-Control'
        });

        // Store client connection
        this.clients.add(res);
        
        // Send initial connection message
        res.write('data: connected\n\n');

        // Handle client disconnect
        req.on('close', () => {
            this.clients.delete(res);
        });
    }

    // Notify all clients to reload
    notifyReload() {
        console.log(`🔄 Notifying ${this.clients.size} client(s) to reload`);
        this.clients.forEach(client => {
            try {
                client.write('data: reload\n\n');
            } catch (error) {
                this.clients.delete(client);
            }
        });
    }

    // Send 404 response
    send404(res) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>404 - Not Found</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        text-align: center; 
                        padding: 50px; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        min-height: 100vh;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    h1 { font-size: 4rem; margin: 0; }
                    p { font-size: 1.2rem; margin: 20px 0; }
                    a { 
                        color: #ffd700; 
                        text-decoration: none; 
                        font-weight: bold;
                        padding: 10px 20px;
                        border: 2px solid #ffd700;
                        border-radius: 5px;
                        display: inline-block;
                        margin-top: 20px;
                    }
                    a:hover { background: #ffd700; color: #333; }
                </style>
            </head>
            <body>
                <h1>404</h1>
                <p>The requested file could not be found.</p>
                <a href="/">🏠 Go Home</a>
            </body>
            </html>
        `);
    }

    // Send 500 response
    send500(res, error) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>500 - Server Error</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        text-align: center; 
                        padding: 50px; 
                        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
                        color: white;
                        min-height: 100vh;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    h1 { font-size: 4rem; margin: 0; }
                    p { font-size: 1.2rem; margin: 20px 0; }
                </style>
            </head>
            <body>
                <h1>500</h1>
                <p>An error occurred: ${error.message}</p>
            </body>
            </html>
        `);
    }

    // Main request handler
    handleRequest(req, res) {
        const url = req.url.split('?')[0];
        
        // Handle live reload endpoint
        if (url === '/live-reload') {
            this.handleLiveReload(req, res);
            return;
        }

        // Determine file path
        let filePath = url === '/' ? '/index.html' : url;
        filePath = path.join(__dirname, this.publicDir, filePath);

        // Security: prevent directory traversal
        const publicPath = path.join(__dirname, this.publicDir);
        if (!filePath.startsWith(publicPath)) {
            this.send404(res);
            return;
        }

        // Check if file exists and serve it
        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                this.send404(res);
                return;
            }

            const extname = path.extname(filePath).toLowerCase();
            
            if (extname === '.html') {
                // For HTML files, inject live reload script
                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        this.send500(res, error);
                        return;
                    }
                    
                    const modifiedContent = this.injectLiveReload(content.toString());
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(modifiedContent);
                });
            } else {
                // For other files, serve normally
                const contentType = this.getMimeType(extname);
                
                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        this.send500(res, error);
                        return;
                    }
                    
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                });
            }
        });
    }

    // Watch for file changes
    watchFiles() {
        const watchPath = path.join(__dirname, this.publicDir);
        
        console.log(`👀 Watching for changes in: ${watchPath}`);
        
        fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
            if (filename && (filename.endsWith('.html') || filename.endsWith('.css') || filename.endsWith('.js'))) {
                console.log(`📝 File changed: ${filename}`);
                this.notifyReload();
            }
        });
    }

    // Start the server
    start() {
        // Create public directory if it doesn't exist
        const publicPath = path.join(__dirname, this.publicDir);
        if (!fs.existsSync(publicPath)) {
            fs.mkdirSync(publicPath, { recursive: true });
            console.log(`📁 Created public directory: ${publicPath}`);
        }

        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(this.port, () => {
            console.log(`🚀 Simple Live Server running at http://localhost:${this.port}`);
            console.log(`📁 Serving files from: ${publicPath}`);
            console.log(`🔄 Live reload enabled`);
            console.log(`Press Ctrl+C to stop the server`);
            console.log(`\n💡 Tip: Create an index.html file in the public folder to get started!`);
        });

        // Watch for file changes
        this.watchFiles();
    }
}

// Start the live server
const liveServer = new SimpleLiveServer(3000, 'public');
liveServer.start();
