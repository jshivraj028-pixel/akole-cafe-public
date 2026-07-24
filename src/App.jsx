import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
