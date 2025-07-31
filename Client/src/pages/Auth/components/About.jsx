import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Clock, Shield, Star, Users, X } from "lucide-react";


const AboutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">About Grabit</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 rounded-full size-25">
                                <img src="/logo.png" alt="" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800">Fast Bites, Homely Delights</h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Bringing you the comfort of home-cooked meals with the convenience of modern food delivery.
                            Experience authentic flavors delivered fresh to your doorstep.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-yellow-50 rounded-lg">
                            <Clock className="h-10 w-10 text-yellow-600 mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2">Quick Delivery</h4>
                            <p className="text-gray-600">Fresh meals delivered in 30 minutes or less, guaranteed hot and delicious.</p>
                        </div>

                        <div className="text-center p-6 bg-yellow-50 rounded-lg">
                            <Shield className="h-10 w-10 text-yellow-600 mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2">Quality Assured</h4>
                            <p className="text-gray-600">Every meal prepared with fresh ingredients and following strict hygiene standards.</p>
                        </div>

                        <div className="text-center p-6 bg-yellow-50 rounded-lg">
                            <Users className="h-10 w-10 text-yellow-600 mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2">Community Focused</h4>
                            <p className="text-gray-600">Supporting local chefs and home cooks to bring you authentic regional cuisines.</p>
                        </div>
                    </div>

                    {/* What We Offer */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-center text-gray-800">What We Offer</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                                    <div>
                                        <h5 className="font-semibold">Home-Style Cooking</h5>
                                        <p className="text-gray-600 text-sm">Authentic recipes passed down through generations</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                                    <div>
                                        <h5 className="font-semibold">Regional Specialties</h5>
                                        <p className="text-gray-600 text-sm">Diverse menu featuring cuisines from across the country</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                                    <div>
                                        <h5 className="font-semibold">Fresh Ingredients</h5>
                                        <p className="text-gray-600 text-sm">Sourced daily from local markets and farms</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                                    <div>
                                        <h5 className="font-semibold">Customizable Meals</h5>
                                        <p className="text-gray-600 text-sm">Adjust spice levels and ingredients to your preference</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                                    <div>
                                        <h5 className="font-semibold">Affordable Pricing</h5>
                                        <p className="text-gray-600 text-sm">Quality meals that won't break the bank</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                                    <div>
                                        <h5 className="font-semibold">24/7 Support</h5>
                                        <p className="text-gray-600 text-sm">Always here to help with your orders and queries</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission Statement */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            At Grabit, we believe that great food brings people together. Our mission is to bridge the gap between
                            the convenience of modern life and the warmth of traditional home cooking. We partner with talented
                            home chefs and local restaurants to deliver not just meals, but experiences that remind you of the
                            comfort and joy of sharing food with loved ones.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Button onClick={onClose} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3">
                            Start Your Food Journey
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutModal