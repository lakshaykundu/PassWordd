import Navbar from "./component/Navbar";
import Manager from "./component/Manager";
import Footer from "./component/Footer";
function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[87vh] absolute inset-0 -z-10 h-full w-full bg-green-100 ">
        <Manager />
      </div>

      <Footer />
    </>
  );
}

export default App;
