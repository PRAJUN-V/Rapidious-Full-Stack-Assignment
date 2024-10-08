import React from 'react'
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import RecipeSearch from './Dashboard';

function Search() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <RecipeSearch />
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Search;
