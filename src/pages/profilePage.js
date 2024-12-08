// import React, { useEffect, useState } from 'react';
// import NavigationButton from '../components/navigationButton.js';
// import Header from '../components/header.js';
// import Divider from '../components/divider.js';
// import ProfileHeader from '../components/profileHeader.js';
// function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/userinfo', {
//       method: 'GET',
//       credentials: 'include', // Important for including cookies
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to fetch user info');
//       }
//       return response.json();
//     })
//     .then(data => {
//       setUser(data); // Update the state with the fetched user data
//       console.log('User Info:', data);
//     })
//     .catch(error => {
//       setError(error.message); // Set the error state if there's an issue
//       console.error('Error:', error);
//     });
//   }, []);

//   if (error) {
//     return (
//       <div>
//         <h2>Error</h2>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return <div>Loading user information...</div>;
//   }

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p>
//         <strong>First Name:</strong> {user.first_name}
//       </p>
//       <p>
//         <strong>Last Name:</strong> {user.last_name}
//       </p>
//       <p>
//         <strong>Email:</strong> {user.email}
//       </p>
//       <p>
//         <strong>Phone:</strong> {user.phone_number}
//       </p>
//     </div>
//   );
// }

// export default ProfilePage;








import React, { useEffect, useState } from 'react';
import NavigationButton from '../components/navigationButton.js';
import Header from '../components/header.js';
import Divider from '../components/divider.js';
import ProfileHeader from '../components/profileHeader.js';

// Profile Page Component
function Profile() {
  // cadence
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // my stuff
  const [showUser, setShowUser] = useState(false);
  const [showSavedPayments, setShowSavedPayments] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  const toggleUserInfo = () => {
    setShowUser((prevState) => !prevState);
    setShowSavedPayments(false);
    setShowSecurity(false);
    setShowTicketHistory(false);
  };

  const toggleSavedPayments = () => {
    setShowSavedPayments((prevState) => !prevState);
    setShowUser(false);
    setShowSecurity(false);
    setShowTicketHistory(false);
  };

  const toggleSecurity = () => {
    setShowSecurity((prevState) => !prevState);
    setShowUser(false);
    setShowSavedPayments(false);
    setShowTicketHistory(false);
  };


  // cadence
  useEffect(() => {
    fetch('http://localhost:3000/api/userinfo', {
      method: 'GET',
      credentials: 'include', // Important for including cookies
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      return response.json();
    })
    .then(data => {
      setUser(data); // Update the state with the fetched user data
      console.log('User Info:', data);
    })
    .catch(error => {
      setError(error.message); // Set the error state if there's an issue
      console.error('Error:', error);
    });
  }, []);
  // cadence
  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }
  // cadence
  if (!user) {
    return <div>Loading user information...</div>;
  }


  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header isLoggedIn = {true}/>

      {/* My Profile header for the top of the page */}
      <div
        style={{
          position: 'absolute',
          top: '90px',
          left: '65px',
          marginTop: '20px',
          fontSize: '50px',
          fontWeight: 'bold',
        }}
      >My Profile</div>

      {/* Flex container for the main content */}
      <div
        className="container-fluid"
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'stretch',
          marginTop: '100px',
        }}>

        <div
          className="row"
          style={{
            display: 'flex',
            flexGrow: 1,
          }}>

          {/* Left Column & All Info Held Within It */}
          <div
            className="col-md-6 d-flex flex-column align-items-center me-3"
            style={{
              padding: '20px',
              border: '2px solid #40826D',
              borderRadius: '10px',
              marginRight: '20px',
              minWidth: '300px',
            }}
          >
            {/* Button that toggles the basic user information */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={toggleUserInfo}
                style={{
                  backgroundColor: '#40826D',
                  color: 'white',
                  border: '1px solid #40826D',
                  padding: '10px 0',
                  marginTop: '20px',
                  borderRadius: '5px',
                  width: '100%',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}>User Info</button>

              {/* Button that toggles the saved payments */}
              <button
                onClick={toggleSavedPayments}
                style={{
                  backgroundColor: '#40826D',
                  color: 'white',
                  border: '1px solid #40826D',
                  padding: '10px 0',
                  marginTop: '20px',
                  borderRadius: '5px',
                  width: '100%',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}>Payment Info</button>


              {/* Button that toggles the security page */}
              <button
                onClick={toggleSecurity}
                style={{
                  backgroundColor: '#40826D',
                  color: 'white',
                  border: '1px solid #40826D',
                  padding: '10px 0',
                  marginTop: '20px',
                  borderRadius: '5px',
                  width: '100%',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}>Security</button>

            </div>
          </div>

          {/* Right Column */}
          <div
            className="col-md-6 d-flex flex-column align-items-start ms-3"
            style={{
              backgroundColor: '#E3E3E3',
              padding: '20px',
              width: 'calc(100% - 20px)',
              flexGrow: 1,
            }}
          >
            <div style={{ textAlign: 'left', width: '100%' }}>

              {/* Overarching header w/ basic user information */}
              {showUser && (<ProfileHeader />)}

              {/* Shows all the user information in the bottom box */}
              {showUser && (
                <div
                  style={{
                    height: '430px',
                    width: '100%',
                    marginTop: '20px',
                    border: '2px solid #40826D',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#FFF',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      marginTop: '20px',
                      fontSize: '30px',
                      fontWeight: 'bold',
                      fontFamily: 'Arial',
                    }}
                  >
                    Personal Information
                  </div>

                  {/* Flex container for divider */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    <Divider />
                  </div>

                  {/* Smaller Box & Two-column layout for personal information */}
                  <div style={{
                    height: '250px',
                    width: '100%',
                    marginTop: '20px',
                    border: '2px solid #40826D',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#FFF',
                    boxSizing: 'border-box',
                  }}><div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '20px'}}>

                        {/* Left column */}
                        <div style={{ flex: 1 }}>
                        
                          {/* <h1>User Profile</h1> */}
                          <p><strong>First Name:</strong> {user.first_name}</p>
                          <p><strong>Last Name:</strong> {user.last_name}</p>
                          <p><strong>Email:</strong> {user.email}</p>
                          <p><strong>Phone:</strong> {user.phone_number}</p>
                      
                          {/* <h3 style={{ fontFamily: 'Arial' }}>First Name:</h3>
                          <h4 style={{ fontFamily: 'Arial' }}>(Insert User's First Name)</h4>
                          <h3 style={{ fontFamily: 'Arial' }}>Last Name:</h3>
                          <h4 style={{ fontFamily: 'Arial' }}>(Insert User's Last Name)</h4> */}
                        </div>

                        {/* Right column */}
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontFamily: 'Arial' }}>Email:</h3>
                          <h4 style={{ fontFamily: 'Arial' }}>(xxx@outlook.com)</h4>
                          <h3 style={{ fontFamily: 'Arial' }}>Phone Number:</h3>
                          <h4 style={{ fontFamily: 'Arial' }}>(000-000-0000)</h4>
                        </div>
                      </div>
                  </div>
                </div>
              )}

              {/* Overarching header w/ basic user information */}
              {showSavedPayments && (<ProfileHeader />)}

              {/* Shows all the information in the second box in the Payment Info section */}
              {showSavedPayments && (
                <div
                  style={{
                    height: '430px',
                    width: '100%',
                    marginTop: '20px',
                    border: '2px solid #40826D',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#FFF',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      marginTop: '20px',
                      fontSize: '30px',
                      fontWeight: 'bold',
                      fontFamily: 'Arial',
                    }}>Saved Cards</div>

                  {/* Flex container for divider and buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    {/* Divider */}
                    <Divider />

                    {/* Buttons that go alongside the divider (add and delete payment) */}
                    <div>
                      <button
                        style={{
                          backgroundColor: '#40826D',
                          color: 'white',
                          border: '1px solid #40826D',
                          padding: '10px 20px',
                          marginRight: '10px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}>Add Card</button>

                      <button
                        style={{
                          backgroundColor: '#40826D',
                          color: 'white',
                          border: '1px solid #40826D',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}>Delete Card</button>
                    </div>
                  </div>

                  {/* Holds all of the saved card information */}
                  <div
                  style={{
                    height: '250px',
                    width: '100%',
                    marginTop: '20px',
                    border: '2px solid #40826D',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#FFF',
                    boxSizing: 'border-box',
                  }}>Insert Saved Card Information Here</div>
                </div>
              )}

              {/* Overarching header w/ basic user information */}
              {showSecurity && (<ProfileHeader />)}

              {/* Shows all the information in the bottom box in the security section */}
              {showSecurity && (
                <div
                  style={{
                    height: '430px',
                    width: '100%',
                    marginTop: '20px',
                    border: '2px solid #40826D',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#FFF',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      marginTop: '20px',
                      fontSize: '30px',
                      fontWeight: 'bold',
                      fontFamily: 'Arial',
                    }}>Security</div>

                  {/* Flex container for divider */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    {/* Divider */}
                    <Divider />
                  </div>

                  {/* Smaller Box & Two-column layout for personal information */}
                  <div style={{
                    height: '250px',
                    width: '100%',
                    marginTop: '20px',
                    border: '2px solid #40826D',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#FFF',
                    boxSizing: 'border-box',
                  }}><div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '20px'}}>

                        {/* Left column */}
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontFamily: 'Arial' }}>Email:</h3>
                          <h4 style={{ fontFamily: 'Arial' }}>(xxx@outlook.com)</h4>
                        </div>

                        {/* Right column */}
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        
                        {/* Change Password Button, links off to the page */}
                        <NavigationButton
                          text="Change Password"
                          path="/changepassword"
                          style={{
                            padding: '10px 20px',
                            fontSize: '18px',
                            margin: '10px',
                            color: 'white',
                            backgroundColor: '#40826D',
                            border: '1px solid #40826D'
                          }}/>
                        </div>
                      </div>
                    </div>
                </div>
              )}

            {/* 
              If no pages are selected, then the default page shown is the "user info" page. 
              I dont know if it's better to do this or to have a default message shown instead like
              "Press a button in the left hand column to view its contents". This way shown seems more 
              straightforward but I'm open to other options.
            */}
            {!showUser && !showSavedPayments && !showSecurity && !showTicketHistory && (
              <>
                {setShowUser(true)}
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
