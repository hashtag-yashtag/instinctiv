import app from 'firebase/app';
import 'firebase/auth';

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
      //doCreateUserWithEmailAndPassword("shafayhaq123@hotmail.com", "ShafayHaq1");
      //doSignInWithEmailAndPassword("shafayhaq123@hotmail.com", "ShafayHaq1");
    }

      // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
    
      
    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

  }
  
  export default Firebase;