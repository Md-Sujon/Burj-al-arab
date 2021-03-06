import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../Firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


firebase.initializeApp(firebaseConfig);


const Login = () => {

    var provider = new firebase.auth.GoogleAuthProvider();
   const [loggedInUser,setLoggedInUser]=useContext(UserContext);
   const history=useHistory();
   const location=useLocation();
   let { from } = location.state || { from: { pathname: "/" } };

   const handleGoogleSingIn =()=>{
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    // console.log(result);
      const {displayName,email}=result.user;
      const singedInUser={name:displayName,email}
    setLoggedInUser(singedInUser)
    history.replace(from)
    
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    
  });

}

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSingIn}>Google Singin</button>
        </div>
    );
};

export default Login;