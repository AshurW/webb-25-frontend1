# Node.js Server Basics - A Complete Guide

## Table of Contents
1. [Introduction](#introduction)
2. [What is Node.js?](#what-is-nodejs)
3. [Setting Up Node.js](#setting-up-nodejs)
4. [Creating Your First Server](#creating-your-first-server)
5. [Understanding HTTP Methods](#understanding-http-methods)
6. [Serving Static Files](#serving-static-files)
7. [Creating a Live Server (VS Code Live Server Alternative)](#creating-a-live-server-vs-code-live-server-alternative)
8. [Handling Different File Types](#handling-different-file-types)
9. [Error Handling](#error-handling)
10. [Adding Auto-Reload (Hot Reload)](#adding-auto-reload-hot-reload)
11. [Exercises](#exercises)

## Introduction

This guide will teach you how to create web servers using Node.js. By the end, you'll understand how to build a simple server that can serve static files, similar to VS Code's Live Server extension.

## What is Node.js?

Node.js is a JavaScript runtime that allows you to run JavaScript on the server-side (outside of web browsers). It's built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model.

### Key Features:
- **Server-side JavaScript**: Run JavaScript on the server
- **Event-driven**: Responds to events as they happen
- **Non-blocking**: Can handle multiple requests simultaneously
- **NPM**: Package manager with thousands of libraries

## Setting Up Node.js

### 1. Installation
Download and install Node.js from [nodejs.org](https://nodejs.org/). Choose the LTS (Long Term Support) version.

### 2. Verify Installation
Open your terminal/command prompt and run:
```bash
node --version
npm --version
```

### 3. Initialize a Project
Create a new folder for your project and initialize it:
```bash
mkdir my-server
cd my-server
npm init -y
```

## Creating Your First Server

Let's start with the simplest possible server:

### Basic Server Example
```javascript
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello World from Node.js!</h1>');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

### Running the Server
```bash
node server.js
```

Visit `http://localhost:3000` in your browser to see the result.

### Understanding the Code

1. **`require('http')`**: Imports Node.js's built-in HTTP module
2. **`http.createServer()`**: Creates a new HTTP server
3. **`(req, res) => {}`**: Callback function that handles each request
   - `req`: Request object (contains info about the incoming request)
   - `res`: Response object (used to send data back to the client)
4. **`res.writeHead()`**: Sets the status code and headers
5. **`res.end()`**: Sends the response and closes the connection
6. **`server.listen()`**: Starts the server on the specified port

## Understanding HTTP Methods

### Handling Different Routes
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
                res.end('<h1>Home Page</h1><p>Welcome to our server!</p>');
                break;
            case '/about':
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>About Page</h1><p>This is the about page.</p>');
                break;
            case '/api/data':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Hello from API!', timestamp: new Date() }));
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Page Not Found</h1>');
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
    console.log(`Server running at http://localhost:${PORT}`);
});
```

## Serving Static Files

Now let's create a server that serves static files like HTML, CSS, and JavaScript files:

### File Structure
```
my-server/
├── server.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── package.json
```

### Static File Server
```javascript
// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Remove query string and decode URL
    let filePath = req.url.split('?')[0];
    if (filePath === '/') filePath = '/index.html';
    
    // Security: prevent directory traversal
    filePath = path.join(__dirname, 'public', filePath);
    
    // Get file extension
    const extname = path.extname(filePath).toLowerCase();
    
    // Set content type based on file extension
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
    
    // Read and serve the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>');
            } else {
                // Server error
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Serving files from: ${path.join(__dirname, 'public')}`);
});
```

### Sample HTML File
```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Node.js Server</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to My Server!</h1>
    <p>This page is being served by our Node.js server.</p>
    <button id="btn">Click me!</button>
    <script src="script.js"></script>
</body>
</html>
```

### Sample CSS File
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

### Sample JavaScript File
```javascript
// public/script.js
document.getElementById('btn').addEventListener('click', function() {
    alert('Hello from the client-side JavaScript!');
});
```

## Creating a Live Server (VS Code Live Server Alternative)

Let's enhance our server to include live reload functionality:

### Enhanced Live Server
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

    // MIME types for different file extensions
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

    // Serve static files
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

    // Inject live reload script into HTML
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
        
        // Insert before closing body tag
        return content.replace('</body>', liveReloadScript + '</body>');
    }

    // Handle live reload endpoint
    handleLiveReload(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
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
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>404 - Not Found</title></head>
            <body>
                <h1>404 - File Not Found</h1>
                <p>The requested file could not be found.</p>
            </body>
            </html>
        `);
    }

    // Send 500 response
    send500(res, error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>500 - Server Error</title></head>
            <body>
                <h1>500 - Server Error</h1>
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
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(modifiedContent);
                });
            } else {
                // For other files, serve normally
                this.serveFile(filePath, res);
            }
        });
    }

    // Start the server
    start() {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(this.port, () => {
            console.log(`🚀 Live Server running at http://localhost:${this.port}`);
            console.log(`📁 Serving files from: ${path.join(__dirname, this.publicDir)}`);
            console.log(`🔄 Live reload enabled`);
            console.log(`Press Ctrl+C to stop the server`);
        });

        // Watch for file changes
        this.watchFiles();
    }

    // Watch for file changes and reload
    watchFiles() {
        const watchPath = path.join(__dirname, this.publicDir);
        
        fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
            if (filename && (filename.endsWith('.html') || filename.endsWith('.css') || filename.endsWith('.js'))) {
                console.log(`📝 File changed: ${filename}`);
                this.notifyReload();
            }
        });
    }
}

// Start the live server
const liveServer = new LiveServer(3000, 'public');
liveServer.start();
```

## Handling Different File Types

### Advanced MIME Type Handling
```javascript
// Enhanced MIME type detection
const mimeTypes = {
    // Text files
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    
    // Images
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    
    // Fonts
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    
    // Archives
    '.zip': 'application/zip',
    '.tar': 'application/x-tar',
    '.gz': 'application/gzip',
    
    // Documents
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};
```

## Error Handling

### Comprehensive Error Handling
```javascript
// error-handler.js
class ErrorHandler {
    static handleError(error, req, res) {
        console.error('Error:', error);
        
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
                <title>404 - Not Found</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    h1 { color: #e74c3c; }
                </style>
            </head>
            <body>
                <h1>404 - Page Not Found</h1>
                <p>The requested resource could not be found.</p>
                <a href="/">Go Home</a>
            </body>
            </html>
        `);
    }

    static send403(res) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>403 - Forbidden</title></head>
            <body>
                <h1>403 - Access Forbidden</h1>
                <p>You don't have permission to access this resource.</p>
            </body>
            </html>
        `);
    }

    static send500(res, error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>500 - Server Error</title></head>
            <body>
                <h1>500 - Internal Server Error</h1>
                <p>Something went wrong on our end.</p>
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
            <head><title>503 - Service Unavailable</title></head>
            <body>
                <h1>503 - Service Unavailable</h1>
                <p>The server is temporarily unable to handle the request.</p>
            </body>
            </html>
        `);
    }
}
```

## Adding Auto-Reload (Hot Reload)

## Exercises

### Exercise 1: Basic Server
Create a server that responds with different messages for different routes:
- `/` → "Welcome to my server!"
- `/about` → "This is the about page"
- `/contact` → "Contact us at example@email.com"

### Exercise 2: File Server
Build a file server that can serve any file from a `public` directory. Handle at least these file types:
- HTML files
- CSS files
- JavaScript files
- Images (PNG, JPG, GIF)

### Exercise 3: API Endpoints
Create API endpoints that return JSON data:
- `GET /api/users` → Return a list of users
- `GET /api/users/:id` → Return a specific user
- `POST /api/users` → Create a new user

### Exercise 4: Live Reload
Implement a basic live reload feature that automatically refreshes the browser when files change.

### Exercise 5: Error Pages
Create custom error pages for:
- 404 (Not Found)
- 500 (Server Error)
- 403 (Forbidden)

## Conclusion

You've learned how to:
1. Create basic HTTP servers with Node.js
2. Handle different HTTP methods and routes
3. Serve static files
4. Implement live reload functionality
5. Handle errors gracefully
6. Watch for file changes

This knowledge forms the foundation for building more complex web applications and APIs with Node.js. The live server example demonstrates how tools like VS Code Live Server work under the hood.

## Next Steps

- Learn about Express.js for easier server development
- Explore WebSockets for real-time communication
- Study RESTful API design principles
- Practice with databases (MongoDB, PostgreSQL)
- Learn about authentication and security

## Resources

- [Node.js Official Documentation](https://nodejs.org/docs/)
- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [Express.js Framework](https://expressjs.com/)
- [Socket.io for Real-time Communication](https://socket.io/)
