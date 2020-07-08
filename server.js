const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Init Middleware to use req.body
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get('/', (req, res) => res.send('API running'));

//Define routes
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER started on Port ${PORT}`));
