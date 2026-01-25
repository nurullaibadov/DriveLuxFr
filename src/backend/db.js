import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data.json');

// Helper to read DB
export const readDB = () => {
    if (!fs.existsSync(DB_PATH)) {
        return { users: [], bookings: [], cars: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
};

// Helper to write DB
export const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

export const db = {
    users: {
        findAll: () => readDB().users,
        findByEmail: (email) => readDB().users.find(u => u.email === email),
        create: (user) => {
            const data = readDB();
            data.users.push(user);
            writeDB(data);
            return user;
        }
    },
    bookings: {
        findAll: () => readDB().bookings,
        findById: (id) => readDB().bookings.find(b => b.id === id),
        findByUser: (userId) => readDB().bookings.filter(b => b.user_id === userId),
        findByTrackingCode: (code) => readDB().bookings.find(b => b.tracking_code === code),
        create: (booking) => {
            const data = readDB();
            data.bookings.push(booking);
            writeDB(data);
            return booking;
        },
        update: (id, updates) => {
            const data = readDB();
            const index = data.bookings.findIndex(b => b.id === id);
            if (index !== -1) {
                data.bookings[index] = { ...data.bookings[index], ...updates };
                writeDB(data);
                return data.bookings[index];
            }
            return null;
        }
    },
    cars: {
        findAll: () => readDB().cars
    }
};
