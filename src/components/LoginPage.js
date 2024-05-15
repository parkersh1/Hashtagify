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
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}
