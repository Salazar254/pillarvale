# 🔗 API Reference - Complete Endpoints Guide

## Base URL
```
http://localhost:3000/api
```

---

## Authentication Endpoints

### 1. Login User

**Endpoint:** `POST /api/login`

**Request:**
```json
{
  "email": "merchant@payflow.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "auth_1705330400000_a1b2c3d4e5f6",
  "merchantId": "test_merchant_123",
  "message": "Login successful"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Email and password required"
}
```

**HTTP Status Codes:**
- `200 OK` - Login successful
- `400 Bad Request` - Missing fields or invalid input
- `500 Server Error` - Server error

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "merchant@payflow.com",
    "password": "password123"
  }'
```

**Example JavaScript:**
```javascript
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'merchant@payflow.com',
    password: 'password123'
  })
});
const data = await response.json();
console.log(data.token);
```

---

### 2. Register New User

**Endpoint:** `POST /api/register`

**Request:**
```json
{
  "name": "John Doe",
  "business": "Tech Store Ltd",
  "email": "john@techstore.com",
  "phone": "+254712345678",
  "password": "SecurePass123!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "auth_1705330400001_b2c3d4e5f6g7",
  "merchantId": "merchant_1705330400001",
  "message": "Account created successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Password must contain a special character"
}
```

**Validation Rules:**
- All fields required
- Password: minimum 8 characters + special character
- Email: valid email format
- Phone: any format (validation can be added)

**HTTP Status Codes:**
- `200 OK` - Account created
- `400 Bad Request` - Validation failed
- `500 Server Error` - Server error

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "business": "Tech Store Ltd",
    "email": "john@techstore.com",
    "phone": "+254712345678",
    "password": "SecurePass123!"
  }'
```

**Example JavaScript:**
```javascript
const response = await fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    business: 'Tech Store Ltd',
    email: 'john@techstore.com',
    phone: '+254712345678',
    password: 'SecurePass123!'
  })
});
const data = await response.json();
if (data.success) {
  localStorage.setItem('authToken', data.token);
  window.location.href = '/dashboard/index.html';
}
```

---

### 3. Verify Token

**Endpoint:** `GET /api/verify`

**Headers Required:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Response (Valid):**
```json
{
  "success": true,
  "valid": true,
  "merchantId": "test_merchant_123"
}
```

**Response (Invalid):**
```json
{
  "success": false,
  "valid": false,
  "message": "Invalid token"
}
```

**Response (No Token):**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**HTTP Status Codes:**
- `200 OK` - Token valid
- `401 Unauthorized` - Token invalid or missing
- `500 Server Error` - Server error

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/verify \
  -H "Authorization: Bearer auth_1705330400000_a1b2c3d4e5f6" \
  -H "Content-Type: application/json"
```

**Example JavaScript:**
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('/api/verify', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
if (data.valid) {
  console.log('Token is valid!');
} else {
  // Redirect to login
  window.location.href = '/login.html';
}
```

---

## Payment Endpoints

### 4. Initiate Payment

**Endpoint:** `POST /api/payment/initiate`

**Request:**
```json
{
  "amount": 1000,
  "phone": "+254712345678",
  "merchantId": "test_merchant_123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "transactionId": "mock_1705330400000",
  "message": "STK Push sent (MOCKED)"
}
```

**HTTP Status Codes:**
- `200 OK` - Payment initiated
- `400 Bad Request` - Missing fields
- `500 Server Error` - Payment failed

**Example JavaScript:**
```javascript
const response = await fetch('/api/payment/initiate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 1000,
    phone: '+254712345678',
    merchantId: 'test_merchant_123'
  })
});
const data = await response.json();
console.log(data.transactionId);
```

---

### 5. Get Transactions

**Endpoint:** `GET /api/transactions/:merchantId`

**Parameters:**
- `merchantId` (URL) - Required. Merchant ID to get transactions for

**Response:**
```json
[
  {
    "id": "mock_1705330400000",
    "invoiceId": "inv_1705330400000",
    "amount": 1000,
    "phone": "+254712345678",
    "merchantId": "test_merchant_123",
    "status": "COMPLETE",
    "date": "2026-01-14T10:30:00Z"
  },
  {
    "id": "mock_1705330350000",
    "invoiceId": "inv_1705330350000",
    "amount": 5000,
    "phone": "+254712345679",
    "merchantId": "test_merchant_123",
    "status": "PENDING",
    "date": "2026-01-14T10:25:00Z"
  }
]
```

**HTTP Status Codes:**
- `200 OK` - Transactions returned
- `500 Server Error` - Server error

**Example cURL:**
```bash
curl http://localhost:3000/api/transactions/test_merchant_123
```

**Example JavaScript:**
```javascript
const response = await fetch('/api/transactions/test_merchant_123');
const transactions = await response.json();
transactions.forEach(txn => {
  console.log(`${txn.phone}: KES ${txn.amount} (${txn.status})`);
});
```

---

### 6. Webhook (Intasend Callback)

**Endpoint:** `POST /api/webhook`

**Request (from Intasend):**
```json
{
  "state": "COMPLETE",
  "invoice": {
    "id": "inv_1705330400000",
    "amount": 1000
  }
}
```

**Response:**
```json
{
  "received": true
}
```

---

## Complete Request/Response Examples

### Example 1: Full Login Flow

```javascript
// Step 1: User submits login form
async function handleLogin(email, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Step 2: Save token
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('merchantId', data.merchantId);
    
    // Step 3: Redirect to dashboard
    window.location.href = '/dashboard/index.html';
  } else {
    console.error(data.message);
  }
}

// Step 4: On dashboard load, verify token
window.addEventListener('load', async () => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch('/api/verify', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  
  if (!data.valid) {
    window.location.href = '/login.html';
  }
});
```

### Example 2: Full Signup Flow

```javascript
async function handleSignup(name, business, email, phone, password) {
  // Validation
  if (password.length < 8) {
    showError('Password must be at least 8 characters');
    return;
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    showError('Password must contain a special character');
    return;
  }
  
  // Register
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, business, email, phone, password })
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Save token and redirect
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('merchantId', data.merchantId);
    localStorage.setItem('userName', name);
    
    showSuccess('Account created! Redirecting...');
    setTimeout(() => {
      window.location.href = '/dashboard/index.html';
    }, 1500);
  } else {
    showError(data.message);
  }
}
```

### Example 3: Payment Flow

```javascript
async function initializePayment(amount, phone, merchantId) {
  const response = await fetch('/api/payment/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, phone, merchantId })
  });
  
  const data = await response.json();
  
  if (data.success) {
    console.log(`Transaction initiated: ${data.transactionId}`);
    
    // Poll for transaction status
    pollTransactionStatus(merchantId);
  } else {
    console.error('Payment failed');
  }
}

function pollTransactionStatus(merchantId) {
  const interval = setInterval(async () => {
    const response = await fetch(`/api/transactions/${merchantId}`);
    const transactions = await response.json();
    
    const pending = transactions.find(t => t.status === 'PENDING');
    if (!pending) {
      clearInterval(interval);
      location.reload(); // Refresh dashboard
    }
  }, 5000); // Check every 5 seconds
}
```

---

## Error Handling Best Practices

### Always Check Response Status

```javascript
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
});

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}

const data = await response.json();
```

### Handle Network Errors

```javascript
try {
  const response = await fetch('/api/login', { /* ... */ });
  const data = await response.json();
  // Process data
} catch (error) {
  console.error('Network error:', error);
  showError('Connection failed. Please try again.');
}
```

### Validate Response Data

```javascript
const data = await response.json();

if (typeof data.success !== 'boolean') {
  throw new Error('Invalid response format');
}

if (!data.success && !data.message) {
  console.warn('No error message provided');
}
```

---

## Rate Limiting & Security Notes

### Current Implementation
- ✅ CORS enabled
- ✅ Input validation
- ✅ Password strength validation
- ⚠️ No rate limiting (implement in production)
- ⚠️ No password hashing (use bcrypt in production)
- ⚠️ No JWT expiration (implement in production)

### Production Recommendations

1. **Password Security**
   ```javascript
   // Use bcrypt to hash passwords
   const bcrypt = require('bcrypt');
   const hash = await bcrypt.hash(password, 10);
   ```

2. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   const loginLimiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 5 // 5 attempts per 15 minutes
   });
   app.post('/api/login', loginLimiter, handleLogin);
   ```

3. **JWT Tokens**
   ```javascript
   const jwt = require('jsonwebtoken');
   const token = jwt.sign(
     { userId, merchantId },
     process.env.JWT_SECRET,
     { expiresIn: '24h' }
   );
   ```

---

## Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Register new account
- [ ] Register with weak password
- [ ] Register with existing email
- [ ] Verify token with valid token
- [ ] Verify token with invalid token
- [ ] Get transactions for valid merchant
- [ ] Initiate payment
- [ ] Check webhook receives updates

---

## Postman Collection

Import this into Postman for easy API testing:

```json
{
  "info": {
    "name": "PayFlow API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/login",
        "body": {
          "email": "merchant@payflow.com",
          "password": "password123"
        }
      }
    },
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/register",
        "body": {
          "name": "John Doe",
          "business": "Tech Store",
          "email": "john@example.com",
          "phone": "+254712345678",
          "password": "SecurePass123!"
        }
      }
    },
    {
      "name": "Verify Token",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/verify",
        "headers": {
          "Authorization": "Bearer auth_token_here"
        }
      }
    },
    {
      "name": "Get Transactions",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/transactions/test_merchant_123"
      }
    }
  ]
}
```

---

## Status Codes Reference

| Code | Meaning | Common Reasons |
|------|---------|-----------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Missing/invalid fields |
| 401 | Unauthorized | Invalid/missing token |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Endpoint doesn't exist |
| 500 | Server Error | Server exception |

---

## Quick Copy-Paste Examples

### Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"merchant@payflow.com","password":"password123"}'
```

### Register
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","business":"Store","email":"john@example.com","phone":"+254712345678","password":"Pass123!"}'
```

### Verify
```bash
curl -X GET http://localhost:3000/api/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Transactions
```bash
curl http://localhost:3000/api/transactions/test_merchant_123
```

---

*API Reference v1.0*
*Last Updated: January 14, 2026*
