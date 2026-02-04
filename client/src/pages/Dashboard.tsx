import { useUser, useClerk } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, LogOut, TrendingUp, Wallet, History, ArrowRight, AlertTriangle, Zap } from 'lucide-react';
import { useEffect } from 'react';

const Dashboard = () => {
    const isConfigured = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();

    useEffect(() => {
        if (isConfigured && isLoaded && !isSignedIn) {
            navigate('/login');
        }
    }, [isConfigured, isLoaded, isSignedIn, navigate]);

    if (!isConfigured) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
                <div className="glass-panel p-10 text-center max-w-md w-full">
                    <AlertTriangle className="w-16 h-16 text-secondary mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">Auth Config Required</h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">
                        The Clerk authentication key is missing. Please add <code className="text-primary bg-primary/10 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code> to your environment variables to access the dashboard.
                    </p>
                    <Link to="/" className="btn-secondary w-full">Return to Home</Link>
                </div>
            </div>
        );
    }

    if (!isLoaded || !isSignedIn) return null;

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 px-6 md:px-8">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="bg-secondary/15 p-2 rounded-xl border border-secondary/20 shadow-[0_0_15px_rgba(244,161,39,0.1)]">
                            <Globe className="text-secondary w-7 h-7" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            PILLAR<span className="text-secondary">VALE</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:block text-right">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Authenticated as</p>
                            <p className="text-sm font-medium text-gray-300">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-all font-bold text-sm uppercase tracking-widest group">
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-5xl font-black tracking-tight text-white mb-2 italic">DASHBOARD</h1>
                        <p className="text-gray-400 text-lg font-medium">Welcome back, <span className="text-white">{user?.firstName || user?.username || 'User'}</span></p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="glass-card group hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="bg-primary/20 p-4 rounded-2xl border border-primary/30 group-hover:bg-primary/30 transition-colors shadow-[0_0_20px_rgba(10,36,99,0.1)]">
                                    <Wallet className="text-primary w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">Total Locked</p>
                                    <p className="text-3xl font-black text-white">$0.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card group hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="bg-secondary/20 p-4 rounded-2xl border border-secondary/30 group-hover:bg-secondary/30 transition-colors shadow-[0_0_20px_rgba(244,161,39,0.15)]">
                                    <TrendingUp className="text-secondary w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">Savings</p>
                                    <p className="text-3xl font-black text-white">$0.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card group hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="bg-accent-green/20 p-4 rounded-2xl border border-accent-green/30 group-hover:bg-accent-green/30 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                                    <History className="text-accent-green w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">Active Locks</p>
                                    <p className="text-3xl font-black text-white">0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quick Actions */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="glass-card p-8">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-secondary fill-secondary/20" />
                                    Quick Actions
                                </h2>
                                <div className="space-y-4">
                                    <Link to="/trade" className="btn-primary w-full !py-4 group">
                                        Start New Trade
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <button className="btn-secondary w-full !py-4">
                                        View History
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent activity */}
                        <div className="lg:col-span-2">
                            <div className="glass-card p-8 h-full min-h-[400px]">
                                <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                                <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4 opacity-50">
                                    <div className="bg-white/5 p-6 rounded-full border border-white/5">
                                        <History className="w-12 h-12 text-gray-500" />
                                    </div>
                                    <p className="text-gray-400 font-medium max-w-xs">No recent activity. Start your first trade to see it here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
