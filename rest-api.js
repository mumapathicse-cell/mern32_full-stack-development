const http = require('http');

const users = [
  { id: 1, name: 'Alice', age: 22 },
  { id: 2, name: 'Bob', age: 25 },
];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Welcome to my REST API' }));
    return;
  }

  if (req.method === 'GET' && url.pathname === '/users') {
    res.writeHead(200);
    res.end(JSON.stringify(users));
    return;
  }

  if (req.method === 'GET' && url.pathname.startsWith('/users/')) {
    const id = Number(url.pathname.split('/')[2]);
    const user = users.find((u) => u.id === id);

    if (!user) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'User not found' }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(user));
    return;
  }

  if (req.method === 'POST' && url.pathname === '/users') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');

        const newUser = {
          id: users.length ? users[users.length - 1].id + 1 : 1,
          name: data.name || 'Unknown',
          age: data.age || 0,
        };

        users.push(newUser);

        res.writeHead(201);
        res.end(JSON.stringify({ message: 'User created', user: newUser }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Route not found' }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`REST API running on http://localhost:${PORT}`);
});
