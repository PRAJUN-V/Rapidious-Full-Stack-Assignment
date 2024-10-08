import React from 'react';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';

export const About = () => {
    return (
        <>
            <Header />

            {/* About Us Section */}
            <section className="py-16 bg-blue-50 text-center">
                <h2 className="text-4xl font-bold mb-6 text-brown-700">About EpiRecipes</h2>
                <p className="max-w-4xl mx-auto text-lg text-brown-600">
                    Welcome to EpiRecipes, your ultimate source for delicious and easy-to-follow recipes from around the world. Whether you're a beginner or a seasoned cook, our platform is designed to inspire and guide you in creating amazing meals.
                </p>
            </section>

            {/* Our Services Section */}
            <section className="py-16 bg-white text-center">
                <h2 className="text-4xl font-bold mb-6 text-brown-700">Our Services</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-blue-200 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-brown-700">Recipe Collections</h3>
                        <p className="text-brown-600">Explore a diverse collection of recipes, from quick weeknight dinners to gourmet dishes, all curated by top chefs and home cooks alike.</p>
                    </div>
                    <div className="p-6 bg-blue-200 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-brown-700">Culinary Tips & Tricks</h3>
                        <p className="text-brown-600">Learn from expert chefs and food enthusiasts with our library of cooking tips, kitchen hacks, and step-by-step guides.</p>
                    </div>
                    <div className="p-6 bg-blue-200 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-brown-700">Meal Planning</h3>
                        <p className="text-brown-600">Plan your meals with ease by saving your favorite recipes and creating personalized recipe collections.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default About;
