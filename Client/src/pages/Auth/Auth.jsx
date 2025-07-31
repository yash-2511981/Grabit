import { useState } from "react";
import Form from "./components/Form"
import { Clock, Info, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import AboutModal from "./components/About";
import Logo from "@/components/ui/logo";



const Auth = () => {
    const [showAbout, setShowAbout] = useState(false);

    return (
        <>
            <div className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 bg-orange-300 rounded-full"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full"></div>
                    <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-orange-400 rounded-full"></div>
                </div>

                <header className="relative z-10 p-6 flex justify-between items-center">
                    <Logo onOpen={setShowAbout} />
                    <Button
                        variant="outline"
                        onClick={() => setShowAbout(true)}
                        className="bg-white/80 backdrop-blur-sm hover:bg-white border-yellow-300 text-gray-700"
                    >
                        <Info className="h-4 w-4 mr-2" />
                        About Us
                    </Button>
                </header>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-100px)] px-6">
                    {/* Left Side - Hero Section */}
                    <div className="flex-1 flex flex-col justify-center space-y-8 lg:pr-12">
                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight">
                                Grabit
                            </h1>
                            <p className="text-2xl lg:text-3xl text-gray-700 font-medium">
                                Fast Bites, Homely Delights.
                            </p>
                            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Experience the perfect blend of convenience and comfort. From traditional home-cooked meals
                                to modern favorites, we bring authentic flavors straight to your doorstep.
                            </p>
                        </div>

                        <div className="hidden grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl  md:grid">
                            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                                <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                                <h3 className="font-semibold text-gray-800">30 Min Delivery</h3>
                            </div>
                            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                                <Shield className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                                <h3 className="font-semibold text-gray-800">Quality Assured</h3>
                            </div>
                            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                                <Users className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                                <h3 className="font-semibold text-gray-800">Local Chefs</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center lg:justify-end py-8">
                        <Form />
                    </div>
                </div>
            </div>

            <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
        </>
    );
};

export default Auth;
