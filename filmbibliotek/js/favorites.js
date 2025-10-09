// ===========================
// Favoritsida
// ===========================

import { Storage } from './storage.js';
import { UI } from './ui.js';

// Ladda och visa favoriter
document.addEventListener('DOMContentLoaded', () => {
    const favorites = Storage.getFavorites();
    const grid = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (favorites.length === 0) {
        emptyState.style.display = 'block';
        grid.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        grid.style.display = 'grid';
        favorites.forEach(movie => {
            const card = UI.createMovieCard(movie);
            grid.appendChild(card);
        });
    }
    
    UI.updateFavoritesCount();
});
