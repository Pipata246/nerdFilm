// ========== КОНФИГУРАЦИЯ FIREBASE ==========
// ВАЖНО: Замените эти данные на свои после регистрации на https://firebase.google.com/

const firebaseConfig = {
  apiKey: "AIzaSyCLAXietWK-l8ZB5TDvKSOD57GnCSvmINA",
  authDomain: "nerdfilm-ecab5.firebaseapp.com",
  projectId: "nerdfilm-ecab5",
  storageBucket: "nerdfilm-ecab5.firebasestorage.app",
  messagingSenderId: "804671672598",
  appId: "1:804671672598:web:02938e5cb55d7ddc024037"
};
// Инициализация Firebase
let db = null;

try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  console.log('✅ Firebase подключен успешно!');
} catch (error) {
  console.error('❌ Ошибка подключения Firebase:', error);
  console.log('⚠️ Используется локальное хранилище (localStorage)');
}

// Проверка доступности Firebase
function isFirebaseAvailable() {
  return db !== null;
}
