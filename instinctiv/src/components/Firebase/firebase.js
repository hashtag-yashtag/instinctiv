import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    
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
    

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.db
          .collection('Users')
          .doc(authUser.uid)
          .onSnapshot(docSnapshot => {
            const dbUser = docSnapshot.data();

            // default empty roles
            if (dbUser && !dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
    
  }
  
  export default Firebase;
