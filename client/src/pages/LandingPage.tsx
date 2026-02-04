import { useState } from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [quoteAmount, setQuoteAmount] = useState('5000');
    const rate = 127.00;
    const sourceAmount = parseFloat(quoteAmount) || 0;
    const received = sourceAmount * rate;

    return (
        <div className="min-h-screen bg-slate-900 bg-hero-pattern bg-cover bg-fixed">
            <div className="absolute inset-0 bg-slate-900/90"></div>
            <div className="relative z-10">
                <Navbar />
                <section className="pt-32 pb-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Bridge the Gap in <span className="text-primary">Global Trade</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Secure, transparent, and efficient trade finance for the modern economy.
                        </p>
                        <Link to="/login" className="glass-button text-lg px-8 py-4 inline-flex items-center gap-2">
                            Start Saving Now <ArrowRight />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;
