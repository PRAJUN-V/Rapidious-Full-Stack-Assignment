import Header from "../home/components/Header";
import Footer from "../home/components/Footer";

function Favorite() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {/* <HeroSection /> */}
                    {/* <Dashboard /> */}
                </main>
            </div>
            <Footer />
        </>
    )

}

export default Favorite;