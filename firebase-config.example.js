// ========== ПРИМЕР КОНФИГУРАЦИИ FIREBASE ==========
// Скопируйте этот файл в firebase-config.js и замените данные на свои

const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
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
