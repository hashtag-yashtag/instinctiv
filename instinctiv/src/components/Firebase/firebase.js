import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBvSjVcV8LNU63a5BKYuSRNh68G67Upbsk",
    authDomain: "project-instinctiv.firebaseapp.com",
    databaseURL: "https://project-instinctiv.firebaseio.com",
    projectId: "project-instinctiv",
    storageBucket: "project-instinctiv.appspot.com",
    messagingSenderId: "438722528457"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.firestore();
      //doCreateUserWithEmailAndPassword("shafayhaq123@hotmail.com", "ShafayHaq1");
      //doSignInWithEmailAndPassword("shafayhaq123@hotmail.com", "ShafayHaq1");
      
      this.googleProvider = new app.auth.GoogleAuthProvider();
    
    }

      // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
    
      
    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => {
      this.auth.signOut();
      alert("You Have Signed out.");
    }
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

  }
  
  export default Firebase;