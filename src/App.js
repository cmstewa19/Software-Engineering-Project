import React, { useState } from 'react';
import Login from './pages/loginPage';
import SignUp from './pages/signupPage';
import Home from './pages/homePage';

// App Component - Manages Navigation
function App() {
  const [page, setPage] = useState('login'); // Track current page (login or home)

  // Function to navigate between pages
  const navigateTo = (pageName) => {
    setPage(pageName);
  };

  return (
    <div>
      {page === 'login' && <Login onNavigate={navigateTo} />}
      {page === 'home' && <Home onNavigate={navigateTo} />}
      {page === 'signup' && <SignUp onNavigate={navigateTo} />}
    </div>
  );
}

export default App;