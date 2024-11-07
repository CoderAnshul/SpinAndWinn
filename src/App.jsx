import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './Game';
import PaymentMethodsPage from './PaymentMethodsPage'; // Import the Payment Methods Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />  {/* Main game route */}
        <Route path="/payment-methods" element={<PaymentMethodsPage />} />  {/* Payment Methods page route */}
      </Routes>
    </Router>
  );
}

export default App;
