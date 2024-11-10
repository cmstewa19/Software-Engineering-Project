import React, { useState } from 'react';

// Login Page Component


// Sign Up Page Component
function SignUp({onNavigate}) {
  return(
    <div>
      <h1>Sign Up Page</h1>
      <button onClick={() => onNavigate('login')}>Go back to Login</button>
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
      {page === 'login' && <Login onNavigate={navigateTo} />}
      {page === 'home' && <Home onNavigate={navigateTo} />}
      {page === 'signup' && <SignUp onNavigate={navigateTo} />}
    </div>
  );
}

export default App;