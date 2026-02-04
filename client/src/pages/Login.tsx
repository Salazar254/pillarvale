import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User, Building2 } from 'lucide-react';
import Logo from '../components/Logo';

const Login = () => {
    const [loginType, setLoginType] = useState<'personal' | 'business'>('personal');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#020617] relative flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Architectural Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617] to-black"></div>

            <div className="relative z-10 w-full max-w-lg mb-8 flex flex-col items-center animate-fade-in-down">
                <Logo iconSize={36} textSize="text-4xl" className="mb-12 shadow-[0_0_50px_rgba(244,161,39,0.1)] p-4 rounded-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md animate-fade-in">
                <div className="glass-panel p-10 w-full border border-white/10 relative overflow-hidden shadow-2xl rounded-[3rem]">
                    <div className={`absolute -top-24 -right-24 w-64 h-64 blur-[120px] transition-all duration-700 ${loginType === 'business' ? 'bg-primary/30' : 'bg-secondary/20'}`}></div>

                    <div className="mb-10 text-center relative z-10">
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-3">Welcome Back</h2>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-[0.2em]">Select your account type</p>
                    </div>

                    {/* Portal Switcher */}
                    <div className="flex p-1.5 bg-white/5 rounded-3xl border border-white/10 mb-10 relative z-10">
                        <button
                            onClick={() => setLoginType('personal')}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em] ${loginType === 'personal' ? 'bg-secondary text-white shadow-xl shadow-secondary/20 scale-[1.02]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <User className="w-4 h-4" />
                            Personal
                        </button>
                        <button
                            onClick={() => setLoginType('business')}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em] ${loginType === 'business' ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <Building2 className="w-4 h-4" />
                            Business
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Secure Identifier</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="email"
                                    required
                                    className="glass-input w-full pl-14 h-16 !rounded-2xl !bg-white/[0.02] border-white/5 focus:!border-white/20 transition-all text-sm font-bold"
                                    placeholder={loginType === 'business' ? 'corporate@domain.com' : 'personal@email.com'}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Access Key</label>
                                <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="password"
                                    required
                                    className="glass-input w-full pl-14 h-16 !rounded-2xl !bg-white/[0.02] border-white/5 focus:!border-white/20 transition-all text-sm font-bold"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-5 rounded-3xl text-white font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 ${loginType === 'business' ? 'bg-primary hover:bg-primary/80 shadow-primary/30 border-none' : 'bg-secondary hover:bg-secondary/80 shadow-secondary/30 border-none'}`}
                        >
                            Authorize Access <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="mt-12 text-center relative z-10 border-t border-white/5 pt-8">
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                            New to the infrastructure? <Link to="/register" className="text-white hover:text-primary transition-colors font-black border-b-2 border-primary/20 hover:border-primary">Create Account</Link>
                        </p>
                    </div>
                </div>

                {/* Secure Trust Badge */}
                <div className="mt-10 flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
                    <p className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">Trusted by Global Institutions</p>
                    <div className="flex gap-10 grayscale opacity-50">
                        <div className="font-serif italic font-bold">Goldman</div>
                        <div className="font-serif italic font-bold">Standard</div>
                        <div className="font-serif italic font-bold">Barclays</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
