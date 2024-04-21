
import './App.css';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, app } from './firebase';
import { useState, useEffect } from 'react';


function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const db = getFirestore(app);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
    return unsubscribe;
  }, [db]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp()
    });
    setNewMessage("");
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      console.log('Login is successful');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='box'>
      {user ? (
        <div>
          <div>Logged in as {user.displayName}</div>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button  onClick={sendMessage}>Send Message</button>
          <button  onClick={() => auth.signOut()}>Logout</button>

          <div>
            {messages.map(msg => (
              <div key={msg.id}>
                <div className='message'>
                  <img  src={msg.data.photoURL} alt={msg.data.displayName} />
                  <p className='message_text'>{msg.data.text}</p>
                </div>
                
              </div>
            ))}
            <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
            <button  onClick={sendMessage}>Send Message</button>
          </div>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default App;




