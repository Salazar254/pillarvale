# PayFlow Global 🌍💸

A modern cross-border B2B payment platform for Kenyan importers and exporters, offering better rates and faster settlement than traditional banks.

## 🚀 Features

- **Instant FX Quotes**: Real-time exchange rates with transparent 2% markup
- **Fast Settlement**: 24-hour settlement vs 3-7 days with banks
- **Lower Fees**: 2% all-in vs 5-10% bank fees
- **Glassmorphic UI**: Premium dark-mode design with modern aesthetics
- **Secure Authentication**: JWT-based auth with bcrypt password hashing

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS v4** with custom glassmorphic design system
- **React Router** for navigation
- **Framer Motion** for animations

### Backend
- **Node.js** + **Express**
- **Prisma ORM** (configured for PostgreSQL)
- **Mock In-Memory Database** (for development without DB setup)
- **JWT** authentication
- **Zod** for validation

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Salazar254/payflow.git
   cd payflow
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Environment Configuration (Optional)**
   
   The app runs in **Mock Mode** by default (no database required).
   
   For production with PostgreSQL:
   ```bash
   cd server
   cp .env.example .env
   # Edit .env and add your DATABASE_URL
   ```

## 🚀 Running the Application

### Development Mode (Mock DB)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm run build
```

## 🎨 Design System

The application uses a custom glassmorphic design system with:
- Dark navy background (`#0F172A`)
- Glass cards with backdrop blur
- Primary blue (`#2563EB`)
- Accent green (`#10B981`)

## 📁 Project Structure

```
payflow/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── index.css      # Tailwind + custom styles
│   │   └── App.tsx        # Main app component
│   └── vite.config.ts
│
├── server/                # Backend (Node + Express)
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth middleware
│   │   ├── db/           # Mock database
│   │   └── index.ts      # Server entry point
│   └── prisma/
│       └── schema.prisma  # Database schema
│
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### FX Quotes
- `GET /api/fx/rates` - Get current exchange rates
- `POST /api/fx/quote` - Get quote for specific amount

### Payments
- `POST /api/payments` - Create new payment
- `GET /api/payments` - Get payment history (protected)

### Beneficiaries
- `POST /api/beneficiaries` - Add beneficiary (protected)
- `GET /api/beneficiaries` - List beneficiaries (protected)

## 🧪 Testing

Currently running in **Mock Mode** with in-memory database for easy testing.

**Test Credentials:**
- Email: `demo@example.com`
- Password: `demo123`

## 🚧 Roadmap

- [ ] Real PostgreSQL integration
- [ ] KYC verification flow
- [ ] Real-time FX API integration
- [ ] Payment gateway integration (M-Pesa, Bank transfers)
- [ ] Transaction notifications
- [ ] Admin dashboard
- [ ] Multi-currency wallet support

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ for Kenyan businesses

---

**Note:** This is currently in development mode with a mock database. For production deployment, configure a PostgreSQL database and update the environment variables.
