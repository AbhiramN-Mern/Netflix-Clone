import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc 
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB6-Ai6BRYyD2cRLjNszDdfsDeeRnBADU0",
  authDomain: "netflix-clone-982f7.firebaseapp.com",
  projectId: "netflix-clone-982f7",
  storageBucket: "netflix-clone-982f7.firebasestorage.app",
  messagingSenderId: "269561220274",
  appId: "1:269561220274:web:9fc299f7488e26badc0dab",
  measurementId: "G-8SECWNMV3Z"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // set the displayName on the Firebase Auth user so UI can read it via user.displayName
    try{
      await updateProfile(user, { displayName: name });
    }catch(e){
      console.warn('updateProfile failed', e);
    }

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return true;
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].replace(/-/g, " "));
    throw error;
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].replace(/-/g, " "));
    throw error;
  }
};

const logout = async () => {
  await signOut(auth);
};

export { auth, db, signup, login, logout };
