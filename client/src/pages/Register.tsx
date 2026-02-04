import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

const Register = () => {
    return (
        <div className="min-h-screen bg-slate-900 bg-hero-pattern bg-cover bg-fixed flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/90"></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-3 mb-8">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <Globe className="text-primary w-8 h-8" />
                    </div>
                    <span className="text-3xl font-bold text-white">
                        PILLAR<span className="text-primary">VALE</span>
                    </span>
                </Link>

                <div className="flex justify-center">
                    <SignUp
                        appearance={{
                            elements: {
                                card: "bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl",
                                headerTitle: "text-white",
                                headerSubtitle: "text-gray-400",
                                socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
                                formFieldLabel: "text-gray-300",
                                formFieldInput: "bg-black/20 border-white/10 text-white",
                                footerActionText: "text-gray-400",
                                footerActionLink: "text-primary hover:text-primary/80"
                            }
                        }}
                        signInUrl="/login"
                    />
                </div>

                {/* Trust Badge */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>🔒 Your data is encrypted and secure</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
