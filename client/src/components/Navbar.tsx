import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4 px-6 md:px-8">
                <Logo />

                <div className="items-center justify-between hidden w-full md:flex md:order-1 ml-12">
                    <ul className="flex space-x-10 font-bold text-[10px] uppercase tracking-[0.2em]">
                        <li>
                            <Link to="/" className="text-white hover:text-secondary transition-colors underline decoration-secondary decoration-2 underline-offset-8">Overview</Link>
                        </li>
                        <li>
                            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Infrastructure</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Solutions</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Company</a>
                        </li>
                    </ul>
                </div>

                <div className="flex md:order-2 gap-6 items-center">
                    <Link to="/login" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors hidden sm:block">
                        Login
                    </Link>
                    <Link to="/register" className="btn-primary !text-[10px] py-3 px-8 shadow-[0_10px_30px_rgba(10,36,99,0.3)] !rounded-full">
                        Get Started <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
