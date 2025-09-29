import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqZ6a0AvIW1eWS_YKVwf95AwRNZ4j1OP0",
  authDomain: "app-fcbf2.firebaseapp.com",
  projectId: "app-fcbf2",
  storageBucket: "app-fcbf2.firebasestorage.app",
  messagingSenderId: "683436888710",
  appId: "1:683436888710:web:23252286ba9ecef6fa7707",
  databaseURL:"https://app-fcbf2-default-rtdb.firebaseio.com/"
};


const app = initializeApp(firebaseConfig);

export default app