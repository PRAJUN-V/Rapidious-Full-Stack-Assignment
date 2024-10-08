import React from 'react'
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import Dashboard from './Dashboard';

function Search() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Dashboard />
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Search;
