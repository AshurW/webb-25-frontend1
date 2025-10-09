// ===========================
// UI-komponenter och rendering
// ===========================

import { Storage } from './storage.js';
import { Utils } from './utils.js';

export const UI = {
    /**
     * Skapa filmkort
     * @param {Object} movie - Filmobjekt
     */
    createMovieCard(movie) {
        const card = document.createElement('article');
        card.className = 'movie-card';
        card.setAttribute('data-movie-id', movie.id);
        
        // Lägg till favorit-klass om filmen är favorit
        if (Storage.isFavorite(movie.id)) {
            card.classList.add('is-favorite');
        }

        const isFavorite = Storage.isFavorite(movie.id);
        
        card.innerHTML = `
            <img 
                src="${movie.poster}" 
                alt="${movie.title} poster" 
                class="movie-poster"
                loading="lazy"
            >
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${movie.year}</span>
                    <span class="movie-rating">${movie.rating}</span>
                </div>
                <p class="movie-genre">${movie.genre}</p>
                <p class="movie-overview">
                    ${Utils.truncateText(movie.overview, 120)}
                </p>
                <div class="movie-actions">
                    <button 
                        class="favorite-btn ${isFavorite ? 'active' : ''}" 
                        data-movie-id="${movie.id}"
                        aria-label="${isFavorite ? 'Ta bort från favoriter' : 'Lägg till som favorit'}"
                    >
                        ${isFavorite ? '❤️ Favorit' : '🤍 Favorit'}
                    </button>
                    <a 
                        href="movie-details.html?id=${movie.id}" 
                        class="details-btn"
                        aria-label="Visa detaljer för ${movie.title}"
                    >
                        Mer info
                    </a>
                </div>
            </div>
        `;

        // Event listeners
        this.attachCardEvents(card, movie);

        return card;
    },

    /**
     * Bifoga event listeners till kort
     */
    attachCardEvents(card, movie) {
        // Favorit-knapp
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleFavoriteClick(movie, card);
        });

        // Hela kortet klickbart (navigerar till detaljsida)
        card.addEventListener('click', (e) => {
            // Om användaren klickade på favorit-knappen eller länken, ignorera
            if (e.target.closest('.favorite-btn') || e.target.closest('.details-btn')) {
                return;
            }
            // Annars navigera till detaljsidan
            window.location.href = `movie-details.html?id=${movie.id}`;
        });
    },

    /**
     * Hantera favorit-klick
     */
    handleFavoriteClick(movie, card) {
        const isFavorite = Storage.toggleFavorite(movie);
        
        // Uppdatera UI
        const btn = card.querySelector('.favorite-btn');
        if (isFavorite) {
            btn.textContent = '❤️ Favorit';
            btn.classList.add('active');
            card.classList.add('is-favorite');
            Utils.showToast('Tillagd i favoriter!', 'success');
        } else {
            btn.textContent = '🤍 Favorit';
            btn.classList.remove('active');
            card.classList.remove('is-favorite');
            Utils.showToast('Borttagen från favoriter', 'info');
        }

        this.updateFavoritesCount();
    },

    /**
     * Visa film i modal
     */
    showMovieModal(movie) {
        const modal = document.getElementById('movieModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <img 
                src="${movie.poster}" 
                alt="${movie.title} poster" 
                class="modal-poster"
            >
            <h2 class="modal-title">${movie.title}</h2>
            
            <div class="genre-chips">
                ${movie.genre.split(',').map(g => 
                    `<span class="genre-chip">${g.trim()}</span>`
                ).join('')}
            </div>
            
            <div class="modal-meta">
                <span class="modal-meta-item">⭐ ${movie.rating}/10</span>
                <span class="modal-meta-item">📅 ${movie.year}</span>
                <span class="modal-meta-item">⏱️ ${movie.runtime} min</span>
            </div>
            
            <h3>Handling</h3>
            <p class="modal-overview">${movie.overview}</p>
            
            <h3>Detaljer</h3>
            <p><strong>Regissör:</strong> ${movie.director}</p>
            <p><strong>Skådespelare:</strong> ${movie.cast.join(', ')}</p>
            <p><strong>Premiär:</strong> ${Utils.formatDate(movie.releaseDate)}</p>
            
            <div class="modal-actions">
                <button class="btn btn-primary favorite-modal-btn">
                    ${Storage.isFavorite(movie.id) ? '❤️ Favorit' : '🤍 Lägg till favorit'}
                </button>
            </div>
        `;

        // Favorit-knapp i modal
        const favoriteModalBtn = modalBody.querySelector('.favorite-modal-btn');
        favoriteModalBtn.addEventListener('click', () => {
            const isFavorite = Storage.toggleFavorite(movie);
            favoriteModalBtn.textContent = isFavorite ? '❤️ Favorit' : '🤍 Lägg till favorit';
            this.updateFavoritesCount();
            
            // Uppdatera kort om det finns
            const card = document.querySelector(`[data-movie-id="${movie.id}"]`);
            if (card) {
                const btn = card.querySelector('.favorite-btn');
                btn.textContent = isFavorite ? '❤️ Favorit' : '🤍 Favorit';
                btn.classList.toggle('active', isFavorite);
                card.classList.toggle('is-favorite', isFavorite);
            }
        });

        // Visa modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Förhindra scroll
    },

    /**
     * Stäng modal
     */
    closeModal() {
        const modal = document.getElementById('movieModal');
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Återställ scroll
    },

    /**
     * Rendera filmer till grid
     */
    renderMovies(movies, container) {
        container.innerHTML = '';
        
        if (!movies || movies.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <p class="empty-icon">🎬</p>
                    <h3>Inga filmer hittades</h3>
                    <p>Försök med en annan sökning eller filter</p>
                </div>
            `;
            return;
        }

        // Använd document fragment för bättre prestanda
        const fragment = document.createDocumentFragment();
        
        movies.forEach(movie => {
            const card = this.createMovieCard(movie);
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    },

    /**
     * Visa loading state
     */
    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.classList.add('active');
        }
    },

    /**
     * Göm loading state
     */
    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.classList.remove('active');
        }
    },

    /**
     * Visa felmeddelande
     */
    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.querySelector('.error-text').textContent = message;
            errorDiv.classList.add('active');
        }
    },

    /**
     * Göm felmeddelande
     */
    hideError() {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.classList.remove('active');
        }
    },

    /**
     * Uppdatera favoriter-räknare
     */
    updateFavoritesCount() {
        const favorites = Storage.getFavorites();
        const countElements = document.querySelectorAll('.favorites-count');
        countElements.forEach(el => {
            el.textContent = favorites.length;
        });
    }
};
