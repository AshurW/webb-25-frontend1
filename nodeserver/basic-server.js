// basic-server.js
// A simple Node.js HTTP server example
// Run with: node basic-server.js

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    console.log(req.url)
    console.log(parsedUrl)
    const path = parsedUrl.pathname;
    const method = req.method;
    const query = parsedUrl.query;

    // Log the request
    console.log(`${new Date().toISOString()} - ${method} ${path}`);

    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Route handling
    if (method === 'GET') {
        switch (path) {
            case '/':
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Basic Node.js Server</title>
                        <style>
                            body { 
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                max-width: 800px; 
                                margin: 0 auto; 
                                padding: 20px; 
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: white;
                                min-height: 100vh;
                            }
                            .container { 
                                background: rgba(255,255,255,0.1); 
                                padding: 40px; 
                                border-radius: 15px; 
                                backdrop-filter: blur(10px);
                            }
                            h1 { text-align: center; margin-bottom: 30px; }
                            .endpoint { 
                                background: rgba(255,255,255,0.2); 
                                padding: 15px; 
                                margin: 10px 0; 
                                border-radius: 8px; 
                                border-left: 4px solid #ffd700;
                            }
                            .method { 
                                background: #4CAF50; 
                                color: white; 
                                padding: 4px 8px; 
                                border-radius: 4px; 
                                font-size: 12px; 
                                font-weight: bold;
                            }
                            a { color: #ffd700; text-decoration: none; }
                            a:hover { text-decoration: underline; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>🚀 Basic Node.js Server</h1>
                            <p>Welcome to your first Node.js server! Here are the available endpoints:</p>
                            
                            <div class="endpoint">
                                <span class="method">GET</span> <strong>/</strong> - This page
                            </div>
                            
                            <div class="endpoint">
                                <span class="method">GET</span> <strong>/hello</strong> - Simple greeting
                            </div>
                            
                            <div class="endpoint">
                                <span class="method">GET</span> <strong>/time</strong> - Current server time
                            </div>
                            
                            <div class="endpoint">
                                <span class="method">GET</span> <strong>/api/users</strong> - Sample user data
                            </div>
                            
                            <div class="endpoint">
                                <span class="method">GET</span> <strong>/api/users/:id</strong> - Get specific user
                            </div>
                            
                            <div class="endpoint">
                                <span class="method">POST</span> <strong>/api/users</strong> - Create new user
                            </div>
                            
                            <p style="margin-top: 30px;">
                                <strong>Try these links:</strong><br>
                                <a href="/hello">Hello World</a> | 
                                <a href="/time">Server Time</a> | 
                                <a href="/api/users">Users API</a>
                            </p>
                        </div>
                    </body>
                    </html>
                `);
                break;

            case '/hello':
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head><title>Hello World</title></head>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                        <h1>Hello World from Node.js! 👋</h1>
                        <p>This is a simple GET request response.</p>
                        <a href="/">← Back to Home</a>
                    </body>
                    </html>
                `);
                break;

            case '/time':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    timestamp: new Date().toISOString(),
                    unix: Date.now(),
                    readable: new Date().toLocaleString()
                }, null, 2));
                break;

            case '/api/users':
                const users = [
                    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
                    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
                    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user' },
                    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'moderator' }
                ];
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    data: users,
                    count: users.length,
                    timestamp: new Date().toISOString()
                }, null, 2));
                break;

            default:
                // Check if it's a user ID request
                const userMatch = path.match(/^\/api\/users\/(\d+)$/);
                if (userMatch) {
                    const userId = parseInt(userMatch[1]);
                    const users = [
                        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
                        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
                        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user' },
                        { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'moderator' }
                    ];
                    
                    const user = users.find(u => u.id === userId);
                    
                    if (user) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            success: true,
                            data: user,
                            timestamp: new Date().toISOString()
                        }, null, 2));
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            success: false,
                            error: 'User not found',
                            timestamp: new Date().toISOString()
                        }, null, 2));
                    }
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(`
                        <!DOCTYPE html>
                        <html>
                        <head><title>404 - Not Found</title></head>
                        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                            <h1>404 - Page Not Found</h1>
                            <p>The requested resource could not be found.</p>
                            <a href="/">← Back to Home</a>
                        </body>
                        </html>
                    `);
                }
        }
    } else if (method === 'POST') {
        if (path === '/api/users') {
            let body = '';
            
            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            req.on('end', () => {
                try {
                    const userData = JSON.parse(body);
                    
                    // Simple validation
                    if (!userData.name || !userData.email) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            success: false,
                            error: 'Name and email are required',
                            timestamp: new Date().toISOString()
                        }, null, 2));
                        return;
                    }
                    
                    // Simulate creating a new user
                    const newUser = {
                        id: Math.floor(Math.random() * 1000) + 100,
                        name: userData.name,
                        email: userData.email,
                        role: userData.role || 'user',
                        createdAt: new Date().toISOString()
                    };
                    
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: true,
                        message: 'User created successfully',
                        data: newUser,
                        timestamp: new Date().toISOString()
                    }, null, 2));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        error: 'Invalid JSON data',
                        timestamp: new Date().toISOString()
                    }, null, 2));
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                error: 'Endpoint not found',
                timestamp: new Date().toISOString()
            }, null, 2));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            error: 'Method not allowed',
            timestamp: new Date().toISOString()
        }, null, 2));
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 Basic Node.js Server running at http://localhost:${PORT}`);
    console.log(`📝 Available endpoints:`);
    console.log(`   GET  / - Home page`);
    console.log(`   GET  /hello - Hello world`);
    console.log(`   GET  /time - Server time`);
    console.log(`   GET  /api/users - List users`);
    console.log(`   GET  /api/users/:id - Get user by ID`);
    console.log(`   POST /api/users - Create user`);
    console.log(`\nPress Ctrl+C to stop the server`);
});

