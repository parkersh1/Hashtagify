import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');  // Redirect to the main page if user is already logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // User signed in
        navigate('/home');  // Redirect to the main page after successful login
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-header">Login to Your Account</h1>
        <button onClick={handleGoogleSignIn} className="google-signin-btn">
          <img src="/img/google-icon.png" alt="Google logo" className="google-logo" />
          Sign in with Google
        </button>
        <p className="login-footer">Sign in to access personalized features</p>
      </div>
    </div>
  );
}