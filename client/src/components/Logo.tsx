import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
    className?: string;
    iconSize?: number;
    textSize?: string;
}

const Logo = ({ className = "", iconSize = 28, textSize = "text-2xl" }: LogoProps) => {
    return (
        <Link to="/" className={`flex items-center gap-3 group ${className}`}>
            <div className="relative">
                <div className="absolute -inset-1.5 bg-secondary/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-secondary/15 p-2 rounded-xl border border-secondary/20 shadow-[0_0_15px_rgba(244,161,39,0.1)] transition-transform group-hover:scale-105">
                    <Globe
                        size={iconSize}
                        className="text-secondary transition-transform group-hover:rotate-12 duration-500"
                    />
                </div>
            </div>
            <span className={`${textSize} font-black tracking-tighter text-white uppercase italic`}>
                PILLAR<span className="text-secondary not-italic">VALE</span>
            </span>
        </Link>
    );
};

export default Logo;
