const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

const app = express();
const port = 3000;

// Charger le fichier YAML OpenAPI
const swaggerDocument = yaml.load(fs.readFileSync('./exo2.yml', 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users', (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);

  if ((req.query.page && isNaN(page)) || (req.query.size && isNaN(size)) || page < 1 || size < 1) {
    return res.status(400).json({ error: "Bad types for provided query parameters" });
  }

  const allUsers = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 4, name: "Dave", email: "dave@example.com" },
    { id: 5, name: "Eva", email: "eva@example.com" }
  ];

  const currentPage = page || 1;
  const pageSize = size || 20;
  const start = (currentPage - 1) * pageSize;
  const paginatedUsers = allUsers.slice(start, start + pageSize);

  res.status(200).json(paginatedUsers);
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
