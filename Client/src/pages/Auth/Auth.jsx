import { useState } from "react";
import { Clock, Shield, Users, Star, ChefHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Form from "./components/Form";

const GrabitLanding = () => {
    const [showAuthForm, setShowAuthForm] = useState(false);

    return (
        <>
            <div className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 bg-orange-300 rounded-full"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full"></div>
                    <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-orange-400 rounded-full"></div>
                </div>


                {!showAuthForm && <Button
                    onClick={() => setShowAuthForm(true)}
                    className="fixed top-6 right-6 z-50 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 shadow-lg"
                >
                    Sign In / Sign Up
                </Button>}

                {/* Header */}
                <header className="relative z-10 p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img src="/logo.png" alt="Grabit" className="w-10 h-10" />
                        <span className="text-2xl font-bold text-gray-800">Grabit</span>
                    </div>
                    <div className="w-32"></div> {/* Spacer for fixed button */}
                </header>

                {/* Hero Section */}
                <div className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-100px)] px-6">
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

                        <div className="hidden grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl md:grid">
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

                    {/* Right side with auth form */}
                    <div className="flex-1 flex items-center justify-center lg:justify-end">
                        {showAuthForm ? (
                            <Form />
                        ) : (
                            <div className="text-center space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <div className="flex justify-center mb-4">
                                    <div className="p-4 rounded-full">
                                        <img src="/logo.png" alt="Grabit Logo" className="w-16 h-16" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Ready to Order?</h3>
                                <p className="text-gray-600">
                                    Join thousands of food lovers who trust Grabit for their daily meals
                                </p>
                                <Button
                                    onClick={() => setShowAuthForm(true)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 w-full"
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Services Grid */}
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Why Choose Grabit?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Bringing you the comfort of home-cooked meals with the convenience of modern food delivery.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center p-6 bg-yellow-50 rounded-lg hover:shadow-lg transition-shadow">
                            <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                            <h4 className="font-semibold text-xl mb-2">Quick Delivery</h4>
                            <p className="text-gray-600">Fresh meals delivered in 30 minutes or less, guaranteed hot and delicious.</p>
                        </div>

                        <div className="text-center p-6 bg-yellow-50 rounded-lg hover:shadow-lg transition-shadow">
                            <Shield className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                            <h4 className="font-semibold text-xl mb-2">Quality Assured</h4>
                            <p className="text-gray-600">Every meal prepared with fresh ingredients and following strict hygiene standards.</p>
                        </div>

                        <div className="text-center p-6 bg-yellow-50 rounded-lg hover:shadow-lg transition-shadow">
                            <Users className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                            <h4 className="font-semibold text-xl mb-2">Community Focused</h4>
                            <p className="text-gray-600">Supporting local chefs and home cooks to bring you authentic regional cuisines.</p>
                        </div>
                    </div>

                    {/* What We Offer */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-center text-gray-800">What We Offer</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1">Home-Style Cooking</h5>
                                        <p className="text-gray-600">Authentic recipes passed down through generations</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1">Regional Specialties</h5>
                                        <p className="text-gray-600">Diverse menu featuring cuisines from across the country</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1">Fresh Ingredients</h5>
                                        <p className="text-gray-600">Sourced daily from local markets and farms</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1">Customizable Meals</h5>
                                        <p className="text-gray-600">Adjust spice levels and ingredients to your preference</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1">Affordable Pricing</h5>
                                        <p className="text-gray-600">Quality meals that won't break the bank</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1">24/7 Support</h5>
                                        <p className="text-gray-600">Always here to help with your orders and queries</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        At Grabit, we believe that great food brings people together. Our mission is to bridge the gap between
                        the convenience of modern life and the warmth of traditional home cooking. We partner with talented
                        home chefs and local restaurants to deliver not just meals, but experiences that remind you of the
                        comfort and joy of sharing food with loved ones.
                    </p>
                    <Button
                        onClick={() => setShowAuthForm(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 text-lg"
                    >
                        Start Your Food Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default GrabitLanding;