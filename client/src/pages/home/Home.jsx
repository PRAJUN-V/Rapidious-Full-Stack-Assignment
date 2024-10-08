import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

function Home() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <HeroSection />
                    {/* <Dashboard /> */}
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Home;