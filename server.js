const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, './public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
