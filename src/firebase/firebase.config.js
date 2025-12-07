import { initializeApp } from "firebase/app";
// getAuth এখানে ইমপোর্ট করার দরকার নেই

const firebaseConfig = {
  apiKey: "AIzaSyDJ6LoQdqD9yKaIDXC3ri50GWcI1572Biw",
  authDomain: "digital-life-sessions.firebaseapp.com",
  projectId: "digital-life-sessions",
  storageBucket: "digital-life-sessions.firebasestorage.app",
  messagingSenderId: "610078974654",
  appId: "1:610078974654:web:658cbfe14fab0d066db4ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ভুল ছিল: export default auth;
// সঠিক হবে: export default app;
export default app;
