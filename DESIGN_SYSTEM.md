# PayFlow Frontend - Quick Reference Guide

## 🎨 Visual Overview

### Color Palette
```
Primary Brand:
  • Blue (#2563eb) - Main CTA, interactive elements
  • Cyan (#0ea5e9) - Accents, highlights
  
Backgrounds:
  • Slate-950 (#020617) - Main background
  • Slate-900 (#0f172a) - Cards, panels
  • Slate-800 (#1e293b) - Input, elevated surfaces
  
Text:
  • Slate-100 (#f1f5f9) - Primary text
  • Slate-300 (#cbd5e1) - Secondary text
  • Slate-400 (#94a3b8) - Tertiary text
  • Slate-500 (#64748b) - Disabled, subtle text
```

---

## 📄 Page Overview

### 1. Landing Page (`index.html`)
**Purpose:** Marketing/informational landing page
**Key Sections:**
- Fixed Navigation Bar
- Hero Section with CTA
- Problem/Comparison Section
- Features Section
- Pricing Section
- Final CTA Section
- Footer

**Colors Used:**
- Blue gradient buttons (#2563eb → #1d4ed8)
- Dark backgrounds with glass effect
- Green checkmarks for benefits

---

### 2. Dashboard Login (`dashboard/index.html`)
**Purpose:** Simple merchant dashboard login
**Features:**
- Login form
- Email/password inputs
- Auto-login on success
- Mock transaction display

**Key Elements:**
- Blue-themed login overlay
- Styled form inputs
- Rounded buttons with shadow

---

### 3. React Frontend
**Location:** `frontend/` (Vite + React + TypeScript)

#### Login Component (`Login.tsx`)
- Blue-themed card design
- Icon header with brand logo
- Input validation
- Error display
- Loading state

#### Dashboard Component (`Dashboard.tsx`)
- Stat cards with colored backgrounds
  - Blue card: Total Transactions
  - Cyan card: Total Amount
  - Green card: Success Rate
- Transactions table
- Refresh and logout buttons
- Real-time data polling

---

### 4. Payment Test Page (`test/merchant-site.html`)
**Purpose:** Test the payment widget integration
**Product Display:**
- Image placeholder with gradient
- Product name and description
- Star rating
- Price display with KES currency
- "Pay with M-Pesa" button

**Design Features:**
- Dark theme with gradients
- Trust badges at bottom
- Security information
- Responsive layout

---

### 5. Payment Widget (`widget/payflow-widget.js`)
**Purpose:** Embeddable payment checkout modal

**Modal Structure:**
```
┌─────────────────────────────┐
│  Pay with M-Pesa        ✕   │
├─────────────────────────────┤
│       KES 1,000             │
├─────────────────────────────┤
│ M-Pesa Number               │
│ [254____________]           │
│                             │
│ [  Pay Now  ] [Spinner]     │
├─────────────────────────────┤
│ Success State (hidden):     │
│ ✓ Check your phone          │
│ [Close Button]              │
└─────────────────────────────┘
```

**Features:**
- Input validation (254 + 9 digits)
- Loading spinner
- Error messages
- Success state
- Auto-close after 5 seconds

---

## 🔄 User Flows

### 1. Landing Page Flow
```
User visits landing page
    ↓
Sees value proposition
    ↓
Clicks "Get Early Access" or "Log In"
    ↓
Joins waitlist or goes to dashboard
```

### 2. Payment Flow
```
User clicks "Pay with M-Pesa"
    ↓
Modal appears with amount
    ↓
User enters M-Pesa number (254712345678)
    ↓
Clicks "Pay Now"
    ↓
Validation checks format
    ↓
API sends STK push
    ↓
Success message shown
    ↓
Modal auto-closes after 5 seconds
```

### 3. Dashboard Flow
```
User logs in (API key: test_merchant_123)
    ↓
Dashboard loads
    ↓
Shows transaction stats
    ↓
Displays transaction history
    ↓
Can refresh to see new transactions
    ↓
Can logout to return to login
```

---

## 🎯 Component Styling Classes

### Buttons
```tailwind
/* Primary Button */
class="bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30"

/* Secondary Button */
class="border border-slate-600 bg-slate-800/50 hover:bg-slate-700/50"

/* Danger Button */
class="bg-red-600/20 hover:bg-red-600/30 text-red-400"
```

### Cards
```tailwind
/* Glass Panel */
class="bg-slate-900/50 backdrop-blur border border-slate-700/50 rounded-lg"

/* Stat Card Blue */
class="border-blue-500/30 bg-blue-500/10 backdrop-blur"

/* Stat Card Cyan */
class="border-cyan-500/30 bg-cyan-500/10 backdrop-blur"

/* Stat Card Green */
class="border-green-500/30 bg-green-500/10 backdrop-blur"
```

### Inputs
```tailwind
class="bg-slate-900/50 border border-slate-600 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
```

---

## 📐 Typography

**Font Family:** Inter (Google Fonts)

**Sizes Used:**
- H1: `text-4xl md:text-5xl lg:text-7xl` (Landing hero)
- H2: `text-3xl md:text-4xl` (Section headers)
- H3: `text-xl md:text-2xl` (Card headers)
- Body: `text-base md:text-lg` (Main text)
- Small: `text-sm` (Labels, secondary)
- Tiny: `text-xs` (Tertiary info)

**Weights:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800 (Hero title)

---

## 🎬 Animations

### Fade In
```css
animation: fadeIn 0.5s ease-out forwards;
```

### Slide Up
```css
animation: slideUp 0.5s ease-out forwards;
```

### Hover Glow (Buttons)
```css
transition: box-shadow 0.3s ease;
box-shadow: 0 0 30px rgba(37, 99, 235, 0.5);
```

### Loading Spinner
```css
animation: pf-spin 1s linear infinite;
@keyframes pf-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

---

## 🔗 Integration Guide

### Embedding Widget on External Site

```html
<!-- In your merchant's website -->
<script src="https://payflow.yoursite.com/widget/payflow-widget.js"></script>

<button onclick="PayFlow.checkout({
  amount: 5000,
  merchantId: 'merchant_xyz',
  reference: 'order_123'
})">
  Pay Now
</button>
```

### Webhook Handling
```javascript
// API will POST to your webhook URL with:
{
  invoice_id: "inv_12345",
  state: "COMPLETE",
  amount: 5000,
  phone: "254712345678"
}
```

---

## 📱 Responsive Breakpoints

Using Tailwind CSS breakpoints:
- **sm:** 640px (small devices)
- **md:** 768px (tablets)
- **lg:** 1024px (small laptops)
- **xl:** 1280px (desktops)

Example:
```tailwind
text-2xl md:text-3xl lg:text-4xl
/* Scales from 1.5rem → 1.875rem → 2.25rem */
```

---

## ✅ Testing Checklist

- [ ] Landing page loads correctly
- [ ] All colors match blue theme
- [ ] Navigation links work
- [ ] Responsive on mobile
- [ ] Dashboard login form appears
- [ ] React frontend loads (if running Vite)
- [ ] Login accepts `test_merchant_123`
- [ ] Dashboard displays mock transactions
- [ ] Payment widget opens on button click
- [ ] Widget styling looks correct
- [ ] Payment validation works
- [ ] Error messages display properly
- [ ] Success state shows after payment
- [ ] Modal auto-closes after success
- [ ] No console errors

---

## 🚀 Performance Tips

1. **Caching:** Widget is cached after first load
2. **Lazy Loading:** Modal only renders when needed
3. **Minimal Dependencies:** Widget has zero external dependencies
4. **CDN:** Tailwind CSS loaded from CDN for instant availability

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Widget doesn't appear | Check API server is running, check console for errors |
| Colors look wrong | Clear cache (Ctrl+Shift+Delete), hard refresh (Ctrl+F5) |
| Payment validation fails | Check phone format: 254 + 9 digits |
| API connection error | Ensure server running on localhost:3000 |
| Mobile looks broken | Check viewport meta tag in HTML head |

---

Generated: January 2026
PayFlow Frontend Enhancement Complete ✨
