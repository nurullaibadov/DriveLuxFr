import express from 'express';
import cors from 'cors';
import { db } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

const PORT = 3000;

// Auth Routes
app.post('/api/auth/signup', (req, res) => {
    const { email, password } = req.body;
    const existing = db.users.findByEmail(email);
    if (existing) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    const user = {
        id: 'user_' + Date.now(),
        email,
        password // In production, hash this!
    };
    db.users.create(user);
    res.json({ user: { id: user.id, email: user.email } });
});

app.post('/api/auth/signin', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.findByEmail(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ user: { id: user.id, email: user.email } });
});

// Cars Routes
app.get('/api/cars', (req, res) => {
    res.json(db.cars.findAll());
});

// Bookings Routes
app.get('/api/bookings', (req, res) => {
    const { userId } = req.query;
    if (userId) {
        res.json(db.bookings.findByUser(userId));
    } else {
        res.json([]);
    }
});

app.post('/api/bookings', (req, res) => {
    const booking = {
        id: 'bk_' + Date.now(),
        created_at: new Date().toISOString(),
        tracking_code: 'LXD-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        status: 'pending', // pending, confirmed, active, completed, cancelled
        gps: { lat: 40.7128, lng: -74.0060 }, // Default NY coordinates
        ...req.body
    };
    db.bookings.create(booking);
    res.json(booking);
});

app.post('/api/bookings/:id/cancel', (req, res) => {
    const { id } = req.params;
    const updated = db.bookings.update(id, { status: 'cancelled' });
    if (!updated) return res.status(404).json({ error: 'Booking not found' });
    res.json(updated);
});

// Tracking Route
app.get('/api/bookings/track/:code', (req, res) => {
    const { code } = req.params;
    const booking = db.bookings.findByTrackingCode(code);
    if (!booking) {
        return res.status(404).json({ error: 'Tracking code not found' });
    }

    // Simulate live GPS movement if active
    if (booking.status === 'active') {
        // Add small random variation to simulate movement
        const latVariation = (Math.random() - 0.5) * 0.01;
        const lngVariation = (Math.random() - 0.5) * 0.01;
        booking.gps = {
            lat: 40.7128 + latVariation,
            lng: -74.0060 + lngVariation
        };
    }

    res.json(booking);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
