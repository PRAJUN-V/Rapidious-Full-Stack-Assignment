import Header from "./components/Header";
import Footer from "./components/Footer";

function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Your main content goes here */}
            </main>
            <Footer />
        </div>
    )
}

export default Home;