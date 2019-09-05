import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBTC7YOAkzD5rFj6npN2uHHhtOtgjjM5Yo",
  authDomain: "test-4d722.firebaseapp.com",
  databaseURL: "https://test-4d722.firebaseio.com",
  projectId: "test-4d722",
  storageBucket: "test-4d722.appspot.com",
  messagingSenderId: "392763780837",
  appId: "1:392763780837:web:e3a6c43baacb30ee"
};
/*const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};*/

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();

    // user = uid => this.db.ref(`users/${uid}`);

    // users = () => this.db.ref('users');

    // vente = uid => this.db.ref(`ventes/${uid}`);

    // ventes = () => this.db.ref('ventes');
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    users = () => this.db.ref('users');

    // Custom

  addTable = (table, data) => this.db.ref(`${table}`).push(data);
  getTable = (table, uid) => (uid) ? this.db.ref(`${table}/${uid}`) : this.db.ref(`${table}`)


  addUser = data => this.addTable('users', data);
  getUsers = uid => this.getTable('users', uid);
  addTicket = data => this.addTable('tickets', data);
  getTickets = uid => this.getTable('tickets', uid);
  setTicket = (data) => {
      const ref = this.getTable('tickets', data.idTicket);
      ref.once('value', snapshot => {
          let ticket = this.reformatage(snapshot);
          if (!ticket[0].comments) {
              ticket[0].comments = [];
          }
          ticket[0].comments.push(data);
          return ref.set(ticket[0]);
      });
  };


  reformatage = snapshot => {
    let data = [];
    if (snapshot.ref.path.pieces_.length === 1) {
        snapshot.forEach((k) => {
          let val = k.val();
          val.id = k.ref.path.pieces_[1];
          data.push(val);
      });
    } else {
      data.push(snapshot.val());
    }
    return data;
  }
}

export default Firebase;
