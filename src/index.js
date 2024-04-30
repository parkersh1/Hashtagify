import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { getDatabase, ref, onValue } from 'firebase/database';

function Root() {
  const [concertData, setConcertData] = useState(null);


  useEffect(() => {
    const db = getDatabase();
    const concertsRef = ref(db, 'events');
    onValue(concertsRef, (snapshot) => {
      const data = snapshot.val();
      const temp = [];
      for (var key in data) {
        temp.push(data[key]);
      }
      setConcertData(temp);
    });
  }, []);

  return (
    <React.StrictMode>
      {concertData && <App concertData={concertData} />}
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
