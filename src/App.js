import React, { useState } from 'react';

// Login Page Component
function Login({ onNavigate }) {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => onNavigate('home')}>Go to Home Page</button>
    </div>
  );
}

// Home Page Component
function Home({ onNavigate }) {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => onNavigate('login')}>Go back to Login</button>
    </div>
  );
}

// App Component - Manages Navigation
function App() {
  const [page, setPage] = useState('login'); // Track current page (login or home)

  // Function to navigate between pages
  const navigateTo = (pageName) => {
    setPage(pageName);
  };

  return (
    <div>
      {page === 'login' ? <Login onNavigate={navigateTo} /> : <Home onNavigate={navigateTo} />}
    </div>
  );
}

export default App;
