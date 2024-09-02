const express = require('express');
const mongoose = require('mongoose');
const dashboardRoutes = require('./Dash-routes');
const cors = require('cors');
const { DB_URL, PORT } = require('./constants'); // Importing constants

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database is connected'))
.catch(err => console.log('Database connection error: ', err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api', dashboardRoutes);


app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`);
});
