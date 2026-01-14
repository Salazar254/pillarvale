# 🐛 Debugging Guide & Login/Signup Page

## What's New ✨

### 1. **Standalone Login Page** (`login.html`)
A complete, modern login and signup page with:
- ✅ Beautiful dark theme with blue/cyan accents
- ✅ Email/password login form
- ✅ Full registration form with validation
- ✅ Password strength checker
- ✅ Social login buttons (styled)
- ✅ Remember me option
- ✅ Responsive design
- ✅ Loading states and error messages
- ✅ Smooth form transitions

### 2. **API Endpoints Added** (`api/server.js`)
New authentication endpoints:
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/verify` - Token verification

### 3. **Dashboard Integration**
Dashboard now:
- ✅ Links to login page
- ✅ Uses localStorage for auth tokens
- ✅ Proper logout functionality
- ✅ Session persistence

---

## 🚀 Quick Start

### Step 1: Start the API Server
```bash
cd api
npm install
node server.js
```

Expected output:
```
PayFlow API running on port 3000
```

### Step 2: Open Login Page
```
http://localhost:5173/login.html
# OR if running static files:
file:///C:/Users/Admin/paylow/payflow/login.html
```

### Step 3: Test Login
**Demo Credentials (pre-filled):**
```
Email:    merchant@payflow.com
Password: password123
```

---

## 🔍 Debugging Checklist

### Issue: Login button doesn't work
**Check:**
1. Open DevTools (F12) → Console tab
2. Look for JavaScript errors
3. Check Network tab for failed API calls
4. Verify API server is running on port 3000
5. Check CORS is enabled in API

**Fix:**
```bash
# Restart API server
cd api
npm install  # Install dependencies if missing
node server.js
```

### Issue: "Cannot load output.css"
**Check:**
1. File exists: `dist/output.css`
2. Run Tailwind build:
   ```bash
   npm run tailwind:build
   ```

### Issue: Form submission fails silently
**Debug:**
1. Open DevTools → Console
2. Look for fetch errors
3. Check Network tab for API responses
4. Verify localhost:3000 is accessible

**Test API manually:**
```bash
# Test login endpoint
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 📋 Login Page Features

### Form Validation
- ✅ Email format validation
- ✅ Password strength check (8+ chars, special char)
- ✅ Required field validation
- ✅ Real-time password strength feedback

### Security Features
- ✅ Password visibility toggle
- ✅ No credentials in URL
- ✅ Token-based authentication (localStorage)
- ✅ HTTPS-ready

### User Experience
- ✅ Loading spinners during submission
- ✅ Success/error messages
- ✅ Smooth form transitions
- ✅ Responsive on mobile/tablet
- ✅ Keyboard navigation support

---

## 🔐 Authentication Flow

### Login Flow
```
User inputs email/password
           ↓
Form validates input
           ↓
POST /api/login
           ↓
API returns token
           ↓
Save token to localStorage
           ↓
Redirect to dashboard
```

### Signup Flow
```
User fills registration form
           ↓
Validate password strength
           ↓
POST /api/register
           ↓
API creates account, returns token
           ↓
Save token to localStorage
           ↓
Redirect to dashboard
```

### Dashboard Auth Check
```
Page loads
           ↓
Check localStorage for authToken
           ↓
If found: Show dashboard
If not:   Show login overlay
           ↓
On logout: Clear token, reload page
```

---

## 💾 LocalStorage Keys

After login, these values are stored:
```javascript
localStorage.authToken    // Authentication token
localStorage.userEmail    // User's email
localStorage.userName     // User's full name
localStorage.merchantId   // Merchant account ID
```

**Clear session:**
```javascript
localStorage.clear()
```

---

## 🧪 Testing Scenarios

### Test 1: Successful Login
1. Open `login.html`
2. Email: `merchant@payflow.com`
3. Password: `password123`
4. Click "Sign In"
5. Should redirect to dashboard

**Expected:** Dashboard loads with transaction data

### Test 2: New Account Registration
1. Click "Sign Up" tab
2. Fill all fields:
   - Name: `John Doe`
   - Business: `Tech Store`
   - Email: `john@techstore.com`
   - Phone: `+254712345678`
   - Password: `SecurePass123!`
3. Click "Create Account"

**Expected:** Account created, redirected to dashboard

### Test 3: Password Strength
1. Click "Sign Up" tab
2. Type in password field
3. Watch indicators update in real-time
4. Verify "✓" marks appear when criteria met

**Expected:**
- ✓ Length check when 8+ chars
- ✓ Special char check when added

### Test 4: Form Validation
1. Try logging in with blank fields
2. Try registering with weak password
3. Try email without @ symbol

**Expected:** Error messages appear, form blocks submission

### Test 5: Session Persistence
1. Login successfully
2. Refresh page (F5)
3. Check if dashboard stays visible

**Expected:** Dashboard stays visible (token in localStorage)

### Test 6: Logout
1. Click logout button
2. Verify redirected to login
3. Refresh page

**Expected:** Login form shows, no dashboard access

---

## 🔧 API Testing

### Test Login Endpoint
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Expected response:
```json
{
  "success": true,
  "token": "auth_1705...",
  "merchantId": "test_merchant_123",
  "message": "Login successful"
}
```

### Test Register Endpoint
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "business":"Tech Store",
    "email":"john@example.com",
    "phone":"+254712345678",
    "password":"SecurePass123!"
  }'
```

Expected response:
```json
{
  "success": true,
  "token": "auth_1705...",
  "merchantId": "merchant_1705...",
  "message": "Account created successfully"
}
```

### Test Transactions Endpoint
```bash
curl http://localhost:3000/api/transactions/test_merchant_123
```

Expected response:
```json
[
  {
    "id": "txn_123",
    "amount": 1000,
    "phone": "+254712345678",
    "status": "COMPLETE",
    "date": "2026-01-14T10:30:00Z"
  }
]
```

---

## 📊 Console Debugging

### Enable Debug Logging
Add to `login.html` in script section:
```javascript
// Enable verbose logging
window.DEBUG = true;

// In form handlers, add:
if (window.DEBUG) console.log('Action:', data);
```

### View Auth Token
```javascript
// In DevTools console:
console.log(localStorage.getItem('authToken'))
```

### Check All LocalStorage
```javascript
// In DevTools console:
console.log(localStorage)
```

---

## ⚠️ Common Issues

### Issue: "CORS error"
**Cause:** API not running or wrong port
**Fix:**
1. Start API: `node api/server.js`
2. Verify running on port 3000
3. Check CORS is enabled in server

### Issue: "Cannot GET /dist/output.css"
**Cause:** CSS not compiled
**Fix:**
```bash
npm run tailwind:build
```

### Issue: Form redirect doesn't work
**Cause:** Window location change blocked by browser
**Fix:**
1. Check browser console for errors
2. Verify no popup blockers active
3. Check localStorage is enabled
4. Try clicking "Sign In" again

### Issue: Password toggle doesn't show/hide
**Cause:** JavaScript not running
**Fix:**
1. Check DevTools for JS errors
2. Verify script tags are correct
3. Check that HTML loaded properly

---

## 🎯 Next Steps

### For Development
1. ✅ API endpoints created
2. ✅ Login page ready
3. 📋 Add user database (MongoDB/PostgreSQL)
4. 📋 Add email verification
5. 📋 Add password reset flow
6. 📋 Add 2FA/MFA support

### For Production
1. ✅ Production-ready CSS (Tailwind CLI)
2. ✅ Authentication system
3. 📋 HTTPS/SSL certificate
4. 📋 Rate limiting on auth endpoints
5. 📋 Password hashing (bcrypt)
6. 📋 JWT token expiration
7. 📋 Refresh token rotation

---

## 📞 Support

### Can't login?
1. Check API is running: `node api/server.js`
2. Open DevTools → Network tab
3. Attempt login
4. Check request/response details
5. Look for error message

### Form not submitting?
1. Open DevTools → Console
2. Check for JavaScript errors
3. Verify form HTML is valid
4. Check form IDs match script

### Styling issues?
1. Verify `/dist/output.css` exists
2. Run: `npm run tailwind:build`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard refresh page (Ctrl+F5)

---

## 🎉 Summary

**What was added:**
- ✅ Professional login/signup page
- ✅ API endpoints for authentication
- ✅ Session management with localStorage
- ✅ Form validation and feedback
- ✅ Error handling and user messages

**What's working:**
- ✅ Login form with validation
- ✅ Signup form with password strength check
- ✅ Dashboard integration
- ✅ Logout functionality
- ✅ Responsive design

**Ready to test:** Yes! Start API and open `login.html`

---

*Last Updated: January 14, 2026*
*All systems ready for testing! 🚀*
