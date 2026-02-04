import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Zap, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

const SendMoney = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('1000');
    const [sendCurrency] = useState('USD');
    const [receiveCurrency] = useState('KES');

    const handleNext = () => {
        navigate('/sender-details');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                    <Logo />
                    <div className="flex items-center gap-6">
                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`w-10 h-1.5 rounded-full transition-all duration-500 ${i === 1 ? 'bg-primary shadow-[0_0_15px_rgba(10,36,99,0.5)]' : 'bg-white/10'}`}></div>
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hidden sm:block">Transaction Initialization</span>
                    </div>
                </div>
            </nav>

            <div className="pt-40 pb-20 px-6 max-w-3xl mx-auto">
                <div className="space-y-16">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white leading-none">INITIALIZE <span className="text-primary underline decoration-white/10 underline-offset-8">TRANSFER</span></h1>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Real-time blockchain settlement rails</p>
                    </div>

                    <div className="glass-panel p-12 md:p-16 space-y-12 relative overflow-hidden group shadow-2xl rounded-[3rem]">
                        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 blur-[120px] pointer-events-none group-hover:bg-primary/20 transition-all duration-1000"></div>

                        <div className="space-y-8 relative z-10">
                            {/* Send Section */}
                            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 focus-within:border-primary/40 focus-within:bg-white/[0.04] transition-all">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-6 ml-2">Debit Infrastructure</p>
                                <div className="flex items-center justify-between gap-6">
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="bg-transparent border-none text-6xl md:text-7xl font-black text-white focus:outline-none w-full placeholder:text-white/10 tracking-tighter"
                                        placeholder="0.00"
                                    />
                                    <button className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 px-6 rounded-2xl border border-white/10 transition-all active:scale-95 group">
                                        <span className="font-black text-xl italic">{sendCurrency}</span>
                                        <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                                    </button>
                                </div>
                            </div>

                            {/* Divider with Swap Icon */}
                            <div className="flex justify-center -my-14 relative z-20">
                                <div className="bg-[#020617] p-4 rounded-full border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] group hover:scale-110 transition-transform">
                                    <Zap className="w-8 h-8 text-secondary fill-secondary/20 animate-pulse" />
                                </div>
                            </div>

                            {/* Receive Section */}
                            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-6 ml-2">Hedged Credit</p>
                                <div className="flex items-center justify-between gap-6">
                                    <span className="text-6xl md:text-7xl font-black text-accent-green tracking-tighter">
                                        {(parseFloat(amount || '0') * 127).toLocaleString()}
                                    </span>
                                    <button className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 px-6 rounded-2xl border border-white/10 transition-all">
                                        <span className="font-black text-xl italic">{receiveCurrency}</span>
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* FX Details */}
                        <div className="space-y-4 px-4">
                            <div className="flex justify-between text-[10px] font-black tracking-[0.3em] uppercase">
                                <span className="text-gray-600 italic">Blockchain Liquidity Index</span>
                                <span className="text-white">1 USD = 127.00 KES</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-black tracking-[0.3em] uppercase">
                                <span className="text-gray-600 italic">Gas & Network Fee</span>
                                <span className="text-accent-green italic underline decoration-accent-green/30 underline-offset-4">$0.00 SUBSIDIZED</span>
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full btn-primary !py-7 !rounded-[2rem] shadow-[0_30px_70px_rgba(10,36,99,0.4)] group overflow-hidden relative border-none"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative z-10 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                                Construct Payload Details
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                    </div>

                    {/* Trust Indicator */}
                    <div className="flex flex-col items-center gap-6 py-12 border-t border-white/5">
                        <div className="flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.02] border border-white/5">
                            <ShieldCheck className="w-5 h-5 text-accent-green" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">End-to-end encrypted settlement</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMoney;
