import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import CategoryProducts from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import ScrollToTop from './components/ScrollTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F5F1EC] flex flex-col text-[#2B1E14]">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:slug" element={<CategoryProducts />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        <footer className="p-4 text-center border-t bg-white font-bold">
          <p>Email: vendas3@dellabruna.com.br</p>
        </footer>

        {/* <FloatingWhatsApp /> */}
      </div>
    </Router>
  );
}

export default App;