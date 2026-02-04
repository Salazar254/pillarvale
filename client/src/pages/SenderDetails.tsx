import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Phone, Landmark, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

const SenderDetails = () => {
    const navigate = useNavigate();
    const [source, setSource] = useState<'bank' | 'mpesa'>('bank');

    const handleNext = () => {
        navigate('/receiver-details');
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
                                <div key={i} className={`w-10 h-1.5 rounded-full transition-all duration-500 ${i <= 2 ? 'bg-primary shadow-[0_0_15px_rgba(10,36,99,0.5)]' : 'bg-white/10'}`}></div>
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hidden sm:block">Origin Verification</span>
                    </div>
                </div>
            </nav>

            <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
                <div className="space-y-16">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white leading-none">ORIGIN <span className="text-primary underline decoration-white/10 underline-offset-8">DETAILS</span></h1>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Identify the funding institution</p>
                    </div>

                    <div className="glass-panel p-12 md:p-16 space-y-12 relative overflow-hidden group shadow-2xl rounded-[3rem]">
                        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/10 blur-[120px] pointer-events-none group-hover:bg-secondary/15 transition-all duration-1000"></div>

                        <div className="space-y-12 relative z-10">
                            {/* Personal Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Depositor Legal Name</label>
                                    <input type="text" className="glass-input !h-16 !rounded-2xl !bg-white/[0.02] border-white/10 w-full px-6" placeholder="Johnathan Doe" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Verification Number</label>
                                    <input type="text" className="glass-input !h-16 !rounded-2xl !bg-white/[0.02] border-white/10 w-full px-6" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>

                            {/* Source Selection */}
                            <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 ml-2">Payment Infrastructure</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button
                                        onClick={() => setSource('bank')}
                                        className={`flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all text-left relative overflow-hidden ${source === 'bank' ? 'bg-white/5 border-primary shadow-2xl ring-1 ring-primary/20' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'}`}
                                    >
                                        <div className={`p-5 rounded-2xl ${source === 'bank' ? 'bg-primary/20 border border-primary/30' : 'bg-white/5'}`}>
                                            <Landmark className={source === 'bank' ? 'text-primary w-8 h-8' : 'text-gray-600 w-8 h-8'} />
                                        </div>
                                        <div>
                                            <p className={`font-black text-xs uppercase tracking-[0.3em] ${source === 'bank' ? 'text-white italic' : 'text-gray-500'}`}>Wire Transfer</p>
                                            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-1">SWIFT / ACH Routing</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setSource('mpesa')}
                                        className={`flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all text-left relative overflow-hidden ${source === 'mpesa' ? 'bg-white/5 border-secondary shadow-2xl ring-1 ring-secondary/20' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'}`}
                                    >
                                        <div className={`p-5 rounded-2xl ${source === 'mpesa' ? 'bg-secondary/20 border border-secondary/30' : 'bg-white/5'}`}>
                                            <Phone className={source === 'mpesa' ? 'text-secondary w-8 h-8' : 'text-gray-600 w-8 h-8'} />
                                        </div>
                                        <div>
                                            <p className={`font-black text-xs uppercase tracking-[0.3em] ${source === 'mpesa' ? 'text-white italic' : 'text-gray-500'}`}>M-PESA PUSH</p>
                                            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-1">Instant Direct Debit</p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {source === 'bank' ? (
                                <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 animate-fade-in">
                                    <div className="flex gap-6 items-start">
                                        <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black tracking-[0.3em] text-primary uppercase italic">Infrastructure Routing Node</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">System will generate unique virtual account details for your wire transfer upon authorization. Funds are held in Tier-1 institutional custodians.</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3 animate-fade-in group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">M-PESA Settlement Number</label>
                                    <input type="text" className="glass-input !h-16 !rounded-2xl !bg-white/[0.02] border-white/10 w-full px-6 transition-all focus:!border-secondary/40" placeholder="254712345678" />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 relative z-10 pt-6">
                            <Link to="/send" className="btn-secondary !py-6 flex-1 text-center font-black text-[10px] uppercase tracking-[0.4em] !rounded-[2rem]">Rollback</Link>
                            <button
                                onClick={handleNext}
                                className="btn-primary !py-6 flex-[2] !rounded-[2rem] shadow-2xl relative border-none group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <span className="relative z-10 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                                    Proceed to Receipt Node
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SenderDetails;
