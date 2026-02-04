import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Globe, Phone, Wallet, Landmark, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';

const ReceiverDetails = () => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState<'bank' | 'alipay' | 'paypal' | 'mpesa'>('bank');

    const handleFinish = () => {
        alert("Transaction Initialized Successfully!");
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                    <Logo />
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={'w-10 h-1.5 rounded-full bg-primary shadow-[0_0_15px_rgba(10,36,99,0.5)]'}></div>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
                <div className="space-y-16">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white leading-none">RECIPIENT <span className="text-primary underline decoration-white/10 underline-offset-8">NODE</span></h1>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Define the settlement destination</p>
                    </div>

                    <div className="glass-panel p-12 md:p-16 space-y-12 relative overflow-hidden group shadow-2xl rounded-[3rem]">
                        <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-green/10 blur-[120px] pointer-events-none group-hover:bg-accent-green/20 transition-all duration-1000"></div>

                        <div className="space-y-12 relative z-10">
                            {/* Destination Selection */}
                            <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 ml-2">Settlement Interface</label>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { id: 'bank', icon: Landmark, label: 'BANK' },
                                        { id: 'alipay', icon: Globe, label: 'ALIPAY' },
                                        { id: 'paypal', icon: Wallet, label: 'PAYPAL' },
                                        { id: 'mpesa', icon: Phone, label: 'M-PESA' },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setDestination(item.id as any)}
                                            className={`flex flex-col items-center justify-center gap-4 p-8 rounded-[2.5rem] border transition-all relative overflow-hidden group/btn ${destination === item.id ? 'bg-white/5 border-primary shadow-2xl scale-[1.05]' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'}`}
                                        >
                                            <item.icon className={`w-8 h-8 transition-transform group-hover/btn:rotate-12 ${destination === item.id ? 'text-primary' : 'text-gray-600'}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${destination === item.id ? 'text-white italic' : 'text-gray-500'}`}>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recipient Details */}
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Legal Beneficiary Name</label>
                                    <input type="text" className="glass-input !h-16 !rounded-2xl !bg-white/[0.02] border-white/10 w-full px-6" placeholder="Individual or Corporate Entity" />
                                </div>

                                <div className="animate-fade-in">
                                    {destination === 'bank' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">F.I. Identifer</label>
                                                <input type="text" className="glass-input !h-16 !rounded-2xl !bg-white/[0.02] border-white/10 w-full px-6" placeholder="Institution Name / SWIFT" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Account Index</label>
                                                <input type="text" className="glass-input !h-16 !rounded-2xl !bg-white/[0.02] border-white/10 w-full px-6" placeholder="0123456789" />
                                            </div>
                                        </div>
                                    )}

                                    {destination === 'alipay' && (
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Alipay Protocol ID</label>
                                            <input type="text" className="glass-input !h-16 !rounded-2xl !bg-white/[0.02] border-white/10 w-full px-6" placeholder="+86 Primary Identifier" />
                                        </div>
                                    )}

                                    {destination === 'paypal' && (
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">PayPal Settlement Email</label>
                                            <input type="email" className="glass-input !h-16 !rounded-2xl !bg-white/[0.02] border-white/10 w-full px-6" placeholder="identity@paypal.net" />
                                        </div>
                                    )}

                                    {destination === 'mpesa' && (
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">M-PESA Endpoint</label>
                                            <input type="text" className="glass-input !h-16 !rounded-2xl !bg-white/[0.02] border-white/10 w-full px-6" placeholder="2547XXXXXXXX" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 relative z-10 pt-6">
                            <Link to="/sender-details" className="btn-secondary !py-6 flex-1 text-center font-black text-[10px] uppercase tracking-[0.4em] !rounded-[2rem]">Previous Node</Link>
                            <button
                                onClick={handleFinish}
                                className="btn-primary !py-6 flex-[2] !rounded-[2rem] shadow-2xl relative border-none group overflow-hidden !bg-accent-green hover:!bg-green-700"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <span className="relative z-10 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                                    Execute Settlement
                                    <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center p-12 bg-white/[0.01] rounded-[3.5rem] border border-white/5 shadow-2xl">
                        <div className="text-center space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 italic">Network latency SLA</p>
                            <p className="text-3xl font-black italic text-white tracking-widest underline decoration-accent-green decoration-2 underline-offset-8">UNDER 15 MINUTES</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiverDetails;
