const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
  fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading products.');
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
