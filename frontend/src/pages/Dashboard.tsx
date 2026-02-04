import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, LogOut, TrendingUp, Wallet, History, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
            navigate('/login');
            return;
        }
        
        setUser(JSON.parse(userData));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <Globe className="text-primary w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-white">PILLAR<span className="text-primary">VALE</span></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300">{user.email}</span>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400 mb-8">Welcome back, {user.name || user.email}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="glass-card p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-primary/20 p-3 rounded-lg">
                                    <Wallet className="text-primary w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Total Locked</p>
                                    <p className="text-2xl font-bold text-white">$0.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-secondary/20 p-3 rounded-lg">
                                    <TrendingUp className="text-secondary w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Savings This Month</p>
                                    <p className="text-2xl font-bold text-white">$0.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-accent/20 p-3 rounded-lg">
                                    <History className="text-accent w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Active Locks</p>
                                    <p className="text-2xl font-bold text-white">0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-card p-6 mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/trade" className="glass-button inline-flex items-center gap-2">
                                Start New Trade <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                        <p className="text-gray-400">No recent activity. Start your first trade to see it here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
