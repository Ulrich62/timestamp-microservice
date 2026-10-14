const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Empty date parameter handler
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Date parameter handler
app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Check if date is numeric (Unix timestamp in ms)
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam, 10));
  } else {
    date = new Date(dateParam);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Timestamp Microservice listening on port ${PORT}`);
  });
}

module.exports = app;
