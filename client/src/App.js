import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div className="App">
      <Header/>
        <Auth/>
      <Footer/>
    </div>
  );
}

export default App;
