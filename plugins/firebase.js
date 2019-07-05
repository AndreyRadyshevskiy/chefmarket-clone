import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

if (!firebase.apps.length) {
  var firebaseConfig = {
    apiKey: 'AIzaSyB088LjzbZDiC9hSFSc1eGR63yVq5Kpvuw',
    authDomain: 'chefmarket-8b28c.firebaseapp.com',
    databaseURL: 'https://chefmarket-8b28c.firebaseio.com',
    projectId: 'chefmarket-8b28c',
    storageBucket: 'chefmarket-8b28c.appspot.com',
    messagingSenderId: '501145071081',
    appId: '1:501145071081:web:c52723f30c72ad66'
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

export default db
