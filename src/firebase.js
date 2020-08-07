import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyBXswiLJEoviZBuYIpTnIUGxVrNP5h9YIU",
  authDomain: "social-media-57e75.firebaseapp.com",
  databaseURL: "https://social-media-57e75.firebaseio.com",
  projectId: "social-media-57e75",
  storageBucket: "social-media-57e75.appspot.com",
  messagingSenderId: "297462533566",
  appId: "1:297462533566:web:0982109dee9b48e1e5bdef",
  measurementId: "G-W5WDNG1X96",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  getTime() {
    return this.db.FieldValue.ServerTimestamp();
  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUserName() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  getData() {
    return this.db.collection("messages");
  }
}

export default new Firebase();
