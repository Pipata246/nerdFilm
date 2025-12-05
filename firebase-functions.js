// ========== ФУНКЦИИ ДЛЯ РАБОТЫ С FIREBASE ==========

// ========== КОММЕНТАРИИ ==========

// Получить комментарии для фильма
async function getCommentsFromFirebase(imdbId) {
    if (!isFirebaseAvailable()) {
        // Fallback на localStorage
        return getCommentsFromLocalStorage(imdbId);
    }
    
    try {
        const snapshot = await db.collection('comments')
            .where('imdbId', '==', imdbId)
            .orderBy('timestamp', 'desc')
            .get();
        
        const comments = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            comments.push({
                id: doc.id,
                username: data.username,
                text: data.text,
                date: data.date ? new Date(data.date).toLocaleString('ru-RU') : 'Недавно',
                timestamp: data.timestamp
            });
        });
        
        return comments;
    } catch (error) {
        console.error('Ошибка загрузки комментариев:', error);
        return getCommentsFromLocalStorage(imdbId);
    }
}

// Добавить комментарий
async function addCommentToFirebase(imdbId, username, text) {
    if (!isFirebaseAvailable()) {
        // Fallback на localStorage
        return addCommentToLocalStorage(imdbId, username, text);
    }
    
    try {
        await db.collection('comments').add({
            imdbId: imdbId,
            username: username,
            text: text,
            date: new Date().toISOString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return true;
    } catch (error) {
        console.error('Ошибка добавления комментария:', error);
        return addCommentToLocalStorage(imdbId, username, text);
    }
}

// Удалить комментарий
async function deleteCommentFromFirebase(commentId, imdbId) {
    if (!isFirebaseAvailable()) {
        // Fallback на localStorage
        return deleteCommentFromLocalStorage(imdbId, commentId);
    }
    
    try {
        await db.collection('comments').doc(commentId).delete();
        return true;
    } catch (error) {
        console.error('Ошибка удаления комментария:', error);
        return deleteCommentFromLocalStorage(imdbId, commentId);
    }
}

// ========== ОЦЕНКИ ==========

// Получить оценку пользователя
async function getUserRatingFromFirebase(imdbId, username) {
    if (!isFirebaseAvailable()) {
        return getUserRatingFromLocalStorage(imdbId, username);
    }
    
    try {
        const doc = await db.collection('ratings').doc(`${username}_${imdbId}`).get();
        return doc.exists ? doc.data().rating : 0;
    } catch (error) {
        console.error('Ошибка загрузки оценки:', error);
        return getUserRatingFromLocalStorage(imdbId, username);
    }
}

// Получить среднюю оценку
async function getAverageRatingFromFirebase(imdbId) {
    if (!isFirebaseAvailable()) {
        return getAverageRatingFromLocalStorage(imdbId);
    }
    
    try {
        const snapshot = await db.collection('ratings')
            .where('imdbId', '==', imdbId)
            .get();
        
        if (snapshot.empty) {
            return { avg: 0, count: 0 };
        }
        
        let sum = 0;
        let count = 0;
        
        snapshot.forEach((doc) => {
            sum += doc.data().rating;
            count++;
        });
        
        return {
            avg: sum / count,
            count: count
        };
    } catch (error) {
        console.error('Ошибка загрузки средней оценки:', error);
        return getAverageRatingFromLocalStorage(imdbId);
    }
}

// Сохранить оценку
async function saveRatingToFirebase(imdbId, username, rating) {
    if (!isFirebaseAvailable()) {
        return saveRatingToLocalStorage(imdbId, username, rating);
    }
    
    try {
        await db.collection('ratings').doc(`${username}_${imdbId}`).set({
            imdbId: imdbId,
            username: username,
            rating: rating,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return true;
    } catch (error) {
        console.error('Ошибка сохранения оценки:', error);
        return saveRatingToLocalStorage(imdbId, username, rating);
    }
}

// ========== FALLBACK ФУНКЦИИ (localStorage) ==========

function getCommentsFromLocalStorage(imdbId) {
    const comments = JSON.parse(localStorage.getItem('comments') || '{}');
    return comments[imdbId] || [];
}

function addCommentToLocalStorage(imdbId, username, text) {
    const comments = JSON.parse(localStorage.getItem('comments') || '{}');
    if (!comments[imdbId]) comments[imdbId] = [];
    
    comments[imdbId].unshift({
        id: Date.now(),
        username: username,
        text: text,
        date: new Date().toLocaleString('ru-RU')
    });
    
    localStorage.setItem('comments', JSON.stringify(comments));
    return true;
}

function deleteCommentFromLocalStorage(imdbId, commentId) {
    const comments = JSON.parse(localStorage.getItem('comments') || '{}');
    comments[imdbId] = comments[imdbId].filter(c => c.id !== commentId);
    localStorage.setItem('comments', JSON.stringify(comments));
    return true;
}

function getUserRatingFromLocalStorage(imdbId, username) {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    return ratings[`${username}_${imdbId}`] || 0;
}

function getAverageRatingFromLocalStorage(imdbId) {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    const movieRatings = Object.entries(ratings)
        .filter(([key]) => key.endsWith(`_${imdbId}`))
        .map(([, value]) => value);
    
    if (movieRatings.length === 0) return { avg: 0, count: 0 };
    
    const sum = movieRatings.reduce((a, b) => a + b, 0);
    return {
        avg: sum / movieRatings.length,
        count: movieRatings.length
    };
}

function saveRatingToLocalStorage(imdbId, username, rating) {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    ratings[`${username}_${imdbId}`] = rating;
    localStorage.setItem('ratings', JSON.stringify(ratings));
    return true;
}
