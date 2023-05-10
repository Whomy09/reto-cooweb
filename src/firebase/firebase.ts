import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAqyXwZicBbjEWbkhwoMsrHoXlNPbbIsNU',
  authDomain: 'reto-cooweb.firebaseapp.com',
  projectId: 'reto-cooweb',
  storageBucket: 'reto-cooweb.appspot.com',
  messagingSenderId: '726007358054',
  appId: '1:726007358054:web:6d69e4121115bb3dd283a7',
  measurementId: 'G-BQV6JQFSLF'
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

const DB = firebase.firestore();

export { DB }
