import app from 'firebase/app';

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
    }
  }
  
  export default Firebase;