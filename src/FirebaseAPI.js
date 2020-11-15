import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

// Database instance
export const database = Firebase.firestore()

// Create API
export const FirebaseAPI = {
  currentBatches() {
    return database.collection('batches')
  },

  getBatchById(id) {
    database.collection('batches').doc(id)
  },
}