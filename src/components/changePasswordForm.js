import { useNavigate } from "react-router-dom";
import NavigationButton from "../components/navigationButton";

const ChangePasswordForm = () => {
    const navigate = useNavigate();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const badPasswordText = "Password must have at least 1 Upper, 1 lower, 1 number, 1 special char, and +8 length";

    const onClick = () => {
        const password = document.getElementById('forgotPass-password-field').value;
        const confirmPassword = document.getElementById('forgotPass-confirm-password-field').value;
        const errorMessage = document.getElementById("error-message");

        console.log(password);
        console.log(confirmPassword);

        if(!(password === confirmPassword)) {
            errorMessage.textContent = "Passwords Don't Match";
            errorMessage.style.visibility = "visible";
            return;
        }
        if(!passwordRegex.test(password)) {
            errorMessage.textContent = badPasswordText;
            errorMessage.style.visibility = "visible";
            return;
        }

        //Update database once connected
        navigate("/");
    }

    return(
        <div 
        className="bg-light border border-light rounded d-flex flex-column align-items-center"
        id = "change-password-container"
        style={{ 
            width: '100%', 
            maxWidth: '400px', 
            padding: '40px', 
            boxSizing: 'border-box',
            textAlign: 'center',
            border: '2px solid #40826D',
            borderRadius: '10px',
        }}
        >
        {/* Welcome Message */}
        <h2 style={{ fontFamily: 'Courier', fontSize: '2rem', marginBottom: '20px' }}>
            Welcome!
        </h2>

        {/* Username Input with placeholder */}
        <input
            type="password"
            id="forgotPass-password-field"
            placeholder="New Password"
            style={{
            width: '100%',
            maxWidth: '300px',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px',
            marginTop: '40px',
            marginBottom: '20px',
            }}
        />

        {/* Password Input with placeholder */}
        <input
            type="password"
            id="forgotPass-confirm-password-field"
            placeholder="Confirm Password"
            style={{
            width: '100%',
            maxWidth: '300px',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px',
            marginBottom: '20px',
            }}
        />

        {/* Login Button */}
        <NavigationButton
            text="Change Password"
            path="/home" 
            onClick={onClick}
            style={{
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            marginBottom: '20px',
            padding: '10px',
            }}
        />
        <p2 id="error-message" style={{color:"red", visibility:"hidden"}}>Error</p2>
        </div>
    );
}

export default ChangePasswordForm;