# Node.js Server Examples

This directory contains examples and exercises for learning Node.js server development. Perfect for students who want to understand how web servers work and how to build their own.

## 📚 What You'll Learn

- How to create HTTP servers with Node.js
- Handling different HTTP methods (GET, POST, etc.)
- Serving static files (HTML, CSS, JavaScript, images)
- Building a live reload server (like VS Code Live Server)
- Error handling and security basics
- API development fundamentals

## 🚀 Quick Start

### Prerequisites
- Node.js installed (version 14 or higher)
- Basic knowledge of JavaScript
- A text editor (VS Code recommended)

### Installation
1. Navigate to this directory:
   ```bash
   cd node
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start exploring!

## 📁 Files Overview

### Documentation
- `nodejs-server-guide.md` - Complete tutorial and reference guide
- `README.md` - This file

### Server Examples
- `basic-server.js` - Simple HTTP server with API endpoints
- `simple-live-server.js` - Live reload server (VS Code Live Server alternative)

### Sample Files
- `public/index.html` - Demo page for the live server
- `public/style.css` - Styles for the demo page
- `public/script.js` - JavaScript for the demo page

### Configuration
- `package.json` - Project configuration and scripts

## 🎯 Getting Started

### 1. Basic Server
Start with the basic server to understand HTTP fundamentals:

```bash
npm run basic
# or
node basic-server.js
```

Visit `http://localhost:3000` to see the server in action.

**What you'll see:**
- Home page with available endpoints
- API endpoints that return JSON data
- Different HTTP methods in action

### 2. Live Server
Try the live reload server for development:

```bash
npm start
# or
node simple-live-server.js
```

Visit `http://localhost:3000` and try editing the files in the `public/` folder. Watch the page automatically reload!

**Features:**
- Serves static files (HTML, CSS, JS, images)
- Live reload when files change
- Proper MIME type detection
- Security features (directory traversal protection)

## 🛠️ Available Scripts

```bash
npm start          # Start the live server
npm run basic      # Start the basic server
npm run dev        # Alias for start
```

## 📖 Learning Path

### Beginner Level
1. **Read the guide**: Start with `nodejs-server-guide.md`
2. **Run basic server**: Understand HTTP basics
3. **Explore endpoints**: Try different URLs and methods
4. **Modify responses**: Edit the server code and restart

### Intermediate Level
1. **Live server**: Understand file serving and live reload
2. **Add new endpoints**: Extend the basic server
3. **Handle POST requests**: Learn about request bodies
4. **Error handling**: Implement proper error responses

### Advanced Level
1. **File watching**: Understand how live reload works
2. **Security**: Learn about directory traversal and CORS
3. **Performance**: Optimize file serving
4. **Real-time features**: Explore WebSockets

## 🎮 Interactive Examples

### Basic Server Endpoints
- `GET /` - Home page with navigation
- `GET /hello` - Simple greeting
- `GET /time` - Current server time (JSON)
- `GET /api/users` - List all users (JSON)
- `GET /api/users/:id` - Get specific user (JSON)
- `POST /api/users` - Create new user (JSON)

### Testing with curl
```bash
# Get all users
curl http://localhost:3000/api/users

# Get specific user
curl http://localhost:3000/api/users/1

# Create new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Testing with JavaScript (in browser console)
```javascript
// Fetch users
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));

// Create user
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Jane Doe', email: 'jane@example.com' })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🔧 Customization

### Adding New Endpoints
Edit `basic-server.js` and add new cases in the switch statement:

```javascript
case '/my-endpoint':
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from my endpoint!' }));
    break;
```

### Adding New File Types
Edit `simple-live-server.js` and add MIME types:

```javascript
const mimeTypes = {
    // ... existing types
    '.md': 'text/markdown',
    '.txt': 'text/plain'
};
```

### Changing Port
Set the PORT environment variable:
```bash
PORT=8080 node basic-server.js
```

## 🐛 Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" error:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=8080 node basic-server.js
```

### Permission Denied
On some systems, you might need to use a different port:
```bash
PORT=8080 node simple-live-server.js
```

### File Not Found
Make sure you're in the correct directory and the `public/` folder exists:
```bash
ls -la public/
```

## 📚 Additional Resources

- [Node.js Official Documentation](https://nodejs.org/docs/)
- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [Express.js Framework](https://expressjs.com/) (next step after mastering basics)
- [Socket.io for Real-time Communication](https://socket.io/)

## 🤝 Contributing

Found a bug or want to add an example? Feel free to:
1. Create an issue
2. Fork the repository
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

---

**Happy coding! 🚀**

Remember: The best way to learn is by doing. Start with the basic server, then experiment with the live server. Try modifying the code and see what happens!
