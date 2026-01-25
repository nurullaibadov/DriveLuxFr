const API_URL = 'http://localhost:3000/api';

export const api = {
    get: async (endpoint: string) => {
        try {
            const res = await fetch(`${API_URL}${endpoint}`);
            if (!res.ok) {
                try {
                    const error = await res.json();
                    throw new Error(error.error || 'Request failed');
                } catch (e) {
                    throw new Error(`Request failed: ${res.statusText}`);
                }
            }
            return res.json();
        } catch (error: any) {
            console.error('API GET Error:', error);
            throw error;
        }
    },
    post: async (endpoint: string, body: any) => {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                try {
                    const error = await res.json();
                    throw new Error(error.error || 'Request failed');
                } catch (e) {
                    throw new Error(`Request failed: ${res.statusText}`);
                }
            }
            return res.json();
        } catch (error: any) {
            console.error('API POST Error:', error);
            throw error;
        }
    }
};
