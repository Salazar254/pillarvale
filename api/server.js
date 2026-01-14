require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Simple file-based database
const DB_FILE = path.join(__dirname, 'transactions.json');

// Initialize DB
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

const getTransactions = () => JSON.parse(fs.readFileSync(DB_FILE));
const saveTransaction = (txn) => {
    const txns = getTransactions();
    txns.unshift(txn); // Add to top
    fs.writeFileSync(DB_FILE, JSON.stringify(txns, null, 2));
};
const updateTransactionStatus = (invoiceId, status, extraData = {}) => {
    let txns = getTransactions();
    const idx = txns.findIndex(t => t.invoiceId === invoiceId);
    if (idx !== -1) {
        txns[idx] = { ...txns[idx], status, ...extraData };
        fs.writeFileSync(DB_FILE, JSON.stringify(txns, null, 2));
    }
};

// IntaSend Config
const INTASEND_PUB_KEY = process.env.INTASEND_PUBLIC_KEY;
const INTASEND_SEC_KEY = process.env.INTASEND_SECRET_KEY;
const IS_SANDBOX = true;
const BASE_URL = IS_SANDBOX ? 'https://sandbox.intasend.com/api/v1' : 'https://payment.intasend.com/api/v1';

// 1. Initiate Payment (STK Push)
app.post('/api/payment/initiate', async (req, res) => {
    try {
        const { amount, phone, merchantId } = req.body;

        // Basic validation
        if (!amount || !phone) return res.status(400).json({ success: false, message: 'Missing fields' });

        console.log(`Initiating payment for ${phone} of KES ${amount}`);

        // If keys are missing, mock the success for testing UI
        if (!INTASEND_PUB_KEY) {
            console.log('No API Keys found. Simulating success.');
            const mockTxn = {
                id: 'mock_' + Date.now(),
                invoiceId: 'inv_' + Date.now(),
                amount,
                phone,
                merchantId,
                status: 'PENDING',
                date: new Date().toISOString()
            };
            saveTransaction(mockTxn);

            // Simulate webhook callback after 5 seconds
            setTimeout(() => {
                updateTransactionStatus(mockTxn.invoiceId, 'COMPLETE');
                console.log('Simulated Webhook: Payment Completed');
            }, 5000);

            return res.json({
                success: true,
                transactionId: mockTxn.id,
                message: "STK Push sent (MOCKED)"
            });
        }

        // Real IntaSend Call
        const payload = {
            first_name: 'Customer',
            last_name: 'PayFlow',
            email: 'customer@test.com',
            phone_number: phone,
            host: 'https://payflow-mvp.com',
            amount: amount,
            api_ref: `order_${Date.now()}`,
            currency: 'KES'
        };

        const response = await axios.post(`${BASE_URL}/payment/mpesa-stk-push/`, payload, {
            headers: { 'Authorization': `Bearer ${INTASEND_PUB_KEY}` }
        });

        const invoiceId = response.data.invoice.invoice_id; // Check actual response structure

        const txn = {
            id: response.data.id || 'txn_' + Date.now(),
            invoiceId: invoiceId,
            amount,
            phone,
            merchantId,
            status: 'PENDING',
            date: new Date().toISOString(),
            raw_response: response.data
        };
        saveTransaction(txn);

        res.json({
            success: true,
            transactionId: txn.id,
            message: "STK Push sent successfully"
        });

    } catch (error) {
        console.error('Payment Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: error.response?.data?.errors?.join(' ') || 'Payment failed'
        });
    }
});

// 2. Authentication (Simple API Key Check)
app.post('/api/auth/login', (req, res) => {
    const { apiKey } = req.body;

    // Simple validation - in production, check against database
    const validKeys = ['test_merchant_123', 'merchant_demo'];

    if (validKeys.includes(apiKey)) {
        res.json({
            success: true,
            message: 'Login successful',
            merchantId: apiKey
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid API key'
        });
    }
});

// 3. Get All Transactions (with API Key auth)
app.get('/api/transactions', (req, res) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ success: false, message: 'API key required' });
    }

    const allTxns = getTransactions();

    // Transform to match frontend interface
    const transactions = allTxns.map(t => ({
        id: t.id,
        amount: t.amount,
        phone: t.phone,
        status: t.status.toLowerCase() === 'complete' ? 'completed' : t.status.toLowerCase(),
        timestamp: t.date
    }));

    res.json({
        success: true,
        transactions
    });
});

// 4. Webhook
app.post('/api/webhook/intasend', (req, res) => {
    const data = req.body;
    console.log('Webhook Received:', JSON.stringify(data, null, 2));

    // IntaSend webhook structure validation needed
    // Assuming data.invoice_id and data.state or similar. 
    // For now, accept generic structure and find by invoice_id if possible.

    // Example: { invoice_id: "...", state: "COMPLETE", ... }
    const invoiceId = data.invoice_id || data.invoice?.invoice_id;
    const status = data.state || data.invoice?.state;

    if (invoiceId && status) {
        updateTransactionStatus(invoiceId, status, { webhook_data: data });
        console.log(`Updated invoice ${invoiceId} to ${status}`);
    }

    res.json({ received: true });
});

// 5. Get Transactions by Merchant ID
app.get('/api/transactions/:merchantId', (req, res) => {
    const { merchantId } = req.params;
    const allTxns = getTransactions();
    // Filter by merchantId (mocking 'all' for now if ID matches or plain filter)
    const merchantTxns = allTxns.filter(t => t.merchantId === merchantId);
    res.json(merchantTxns);
});

// 6. User Login
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password required' });
        }

        // Mock authentication (replace with real DB lookup)
        console.log(`Login attempt for ${email}`);

        // For demo: accept any email/password
        const token = 'auth_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        res.json({
            success: true,
            token,
            merchantId: 'test_merchant_123',
            message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 7. User Registration
app.post('/api/register', (req, res) => {
    try {
        const { name, business, email, phone, password } = req.body;

        if (!name || !business || !email || !phone || !password) {
            return res.status(400).json({ success: false, message: 'All fields required' });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({ success: false, message: 'Password must contain a special character' });
        }

        console.log(`New registration: ${name} (${business}) - ${email}`);

        // Mock user creation (replace with real DB insert)
        const token = 'auth_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const merchantId = 'merchant_' + Date.now();

        res.json({
            success: true,
            token,
            merchantId,
            message: 'Account created successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 8. Verify Token
app.get('/api/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Mock token verification
    if (token.startsWith('auth_')) {
        res.json({
            success: true,
            valid: true,
            merchantId: 'test_merchant_123'
        });
    } else {
        res.status(401).json({ success: false, valid: false, message: 'Invalid token' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`PayFlow API running on port ${PORT}`));
