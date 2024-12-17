const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect('mongodb+srv://losdelfondodaw:dyQSKnyAuiyFANLx@shinggang.lbsia.mongodb.net/?retryWrites=true&w=majority&appName=ShingGang', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const Receipt = require('./models/Receipt');

app.get('/receipts', async (req, res) => {
    try {
        const receipts = await Receipt.find();
        res.json(receipts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/receipts', async (req, res) => {
    const { name, price } = req.body;

    try {
        const newReceipt = new Receipt({ name, price });
        await newReceipt.save();
        res.status(201).json(newReceipt);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/receipts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Receipt.findByIdAndDelete(id);
        res.json({ message: 'Receipt deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
