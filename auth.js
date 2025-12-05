// ========== СИСТЕМА АВТОРИЗАЦИИ И РЕГИСТРАЦИИ ==========

let authMode = 'login'; // 'login' или 'register'

// Добавляем стили для модального окна
const style = document.createElement('style');
style.textContent = `
    #authModal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

function checkAuth() {
    const username = localStorage.getItem('username');
    const authSection = document.getElementById('authSection');
    
    if (username) {
        authSection.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: #1976d2; font-weight: 600;">👤 ${username}</span>
                <button onclick="logout()" class="back-btn" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Выйти</button>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <button onclick="showAuthModal()" class="back-btn">👤 Войти</button>
        `;
    }
}

function showAuthModal() {
    authMode = 'login';
    renderAuthModal();
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function switchAuthMode(mode) {
    authMode = mode;
    renderAuthModal();
}

function renderAuthModal() {
    const modal = document.getElementById('authModal');
    const isLogin = authMode === 'login';
    
    modal.innerHTML = `
        <div style="background: #1a1a1a; padding: 2rem; border-radius: 12px; max-width: 400px; width: 90%; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #fff; margin-bottom: 1.5rem; text-align: center;">${isLogin ? 'Вход' : 'Регистрация'}</h2>
            
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
                <button onclick="switchAuthMode('login')" style="flex: 1; padding: 0.6rem; background: ${isLogin ? '#1976d2' : 'rgba(255,255,255,0.05)'}; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.9rem;">Вход</button>
                <button onclick="switchAuthMode('register')" style="flex: 1; padding: 0.6rem; background: ${!isLogin ? '#1976d2' : 'rgba(255,255,255,0.05)'}; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.9rem;">Регистрация</button>
            </div>
            
            <input type="text" id="usernameInput" placeholder="Имя пользователя" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; font-size: 1rem;">
            
            <input type="password" id="passwordInput" placeholder="Пароль" style="width: 100%; padding: 0.8rem; margin-bottom: ${isLogin ? '1rem' : '1rem'}; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; font-size: 1rem;">
            
            ${!isLogin ? `
                <input type="password" id="confirmPasswordInput" placeholder="Подтвердите пароль" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; font-size: 1rem;">
            ` : ''}
            
            <div id="authError" style="color: #ff6b6b; font-size: 0.9rem; margin-bottom: 1rem; min-height: 20px;"></div>
            
            <div style="display: flex; gap: 1rem;">
                <button onclick="${isLogin ? 'login()' : 'register()'}" style="flex: 1; padding: 0.8rem; background: #1976d2; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">${isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                <button onclick="closeAuthModal()" style="flex: 1; padding: 0.8rem; background: rgba(255,255,255,0.1); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem;">Отмена</button>
            </div>
        </div>
    `;
}

function showError(message) {
    const errorDiv = document.getElementById('authError');
    if (errorDiv) {
        errorDiv.textContent = message;
        setTimeout(() => {
            errorDiv.textContent = '';
        }, 3000);
    }
}

function register() {
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const confirmPassword = document.getElementById('confirmPasswordInput').value;
    
    // Валидация
    if (!username) {
        showError('Введите имя пользователя');
        return;
    }
    
    if (username.length < 3) {
        showError('Имя должно быть не менее 3 символов');
        return;
    }
    
    if (!password) {
        showError('Введите пароль');
        return;
    }
    
    if (password.length < 6) {
        showError('Пароль должен быть не менее 6 символов');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Пароли не совпадают');
        return;
    }
    
    // Проверка существования пользователя
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
        showError('Пользователь с таким именем уже существует');
        return;
    }
    
    // Регистрация
    users[username] = {
        password: btoa(password), // Простое кодирование (в реальном проекте используйте хеширование!)
        registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('username', username);
    
    closeAuthModal();
    checkAuth();
    
    // Показываем уведомление
    alert('✅ Регистрация успешна! Добро пожаловать, ' + username + '!');
    location.reload();
}

function login() {
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    
    // Валидация
    if (!username) {
        showError('Введите имя пользователя');
        return;
    }
    
    if (!password) {
        showError('Введите пароль');
        return;
    }
    
    // Проверка учетных данных
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (!users[username]) {
        showError('Пользователь не найден');
        return;
    }
    
    if (users[username].password !== btoa(password)) {
        showError('Неверный пароль');
        return;
    }
    
    // Вход
    localStorage.setItem('username', username);
    closeAuthModal();
    checkAuth();
    
    alert('✅ Вход выполнен! Добро пожаловать, ' + username + '!');
    location.reload();
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('username');
        checkAuth();
        location.reload();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем модальное окно если его нет
    if (!document.getElementById('authModal')) {
        const modal = document.createElement('div');
        modal.id = 'authModal';
        modal.style.display = 'none';
        document.body.appendChild(modal);
    }
    
    checkAuth();
});
