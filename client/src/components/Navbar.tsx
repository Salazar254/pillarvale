import { Link } from 'react-router-dom';
import { Globe, ArrowRight } from 'lucide-react';

const Navbar = () => {
    return (
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

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex space-x-10 font-medium text-sm">
                        <li>
                            <Link to="/" className="text-white hover:text-secondary transition-colors">Home</Link>
                        </li>
                        <li>
                            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                        </li>
                        <li>
                            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
                        </li>
                    </ul>
                </div>

                <div className="flex md:order-2">
                    <Link to="/login" className="btn-primary text-sm py-2.5 px-6 shadow-[0_0_20px_rgba(10,36,99,0.3)]">
                        Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
