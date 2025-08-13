const express = require('express');
const app = express();
const PORT = 5000;

app.get('/test', (req, res) => {
  res.json({ message: 'Test server working' });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
