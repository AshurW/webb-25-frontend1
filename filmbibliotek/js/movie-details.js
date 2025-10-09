// ===========================
// Detaljsida för enskild film
// ===========================

import { MovieAPI } from './api.js';
import { Storage } from './storage.js';
import { UI } from './ui.js';
import { Utils } from './utils.js';

class MovieDetails {
    constructor() {
        this.movieAPI = new MovieAPI();
        this.movieId = null;
        this.currentMovie = null;
        
        this.init();
    }

    /**
     * Initialisera detaljsidan
     */
    async init() {
        console.log('🎬 Detaljsida startar...');
        
        // Hämta film-ID från URL
        this.movieId = this.getMovieIdFromURL();
        
        if (!this.movieId) {
            this.showError('Inget film-ID angivet');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Uppdatera favoriter-räknare
        UI.updateFavoritesCount();
        
        // Ladda filmdetaljer
        await this.loadMovieDetails();
    }

    /**
     * Hämta film-ID från URL query parameter
     */
    getMovieIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        return id ? parseInt(id) : null;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Tillbaka-knapp
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                // Använd history.back() om möjligt, annars gå till startsidan
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = 'index.html';
                }
            });
        }

        // Favorit-knapp
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', () => {
                this.toggleFavorite();
            });
        }

        // Dela-knapp
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareMovie();
            });
        }
    }

    /**
     * Ladda filmdetaljer från API
     */
    async loadMovieDetails() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const errorMessage = document.getElementById('errorMessage');
        const movieDetails = document.getElementById('movieDetails');

        try {
            // Visa loading
            if (loadingSpinner) loadingSpinner.classList.add('active');
            if (errorMessage) errorMessage.classList.remove('active');
            if (movieDetails) movieDetails.classList.remove('active');

            // Hämta film från API
            const response = await this.movieAPI.getMovieById(this.movieId);

            if (response.success && response.data) {
                this.currentMovie = response.data;
                this.renderMovieDetails(this.currentMovie);
                
                // Uppdatera sidtitel
                document.title = `${this.currentMovie.title} - Filmbibliotek`;
            } else {
                throw new Error('Film hittades inte');
            }

        } catch (error) {
            console.error('Error loading movie details:', error);
            this.showError('Kunde inte ladda filmdetaljer');
        } finally {
            // Göm loading
            if (loadingSpinner) loadingSpinner.classList.remove('active');
        }
    }

    /**
     * Rendera filmdetaljer på sidan
     */
    renderMovieDetails(movie) {
        // Uppdatera poster
        const posterImg = document.getElementById('moviePoster');
        if (posterImg) {
            posterImg.src = movie.poster;
            posterImg.alt = `${movie.title} poster`;
        }

        // Uppdatera titel
        const titleEl = document.getElementById('movieTitle');
        if (titleEl) {
            titleEl.textContent = movie.title;
        }

        // Uppdatera meta-information
        const ratingEl = document.getElementById('movieRating');
        if (ratingEl) {
            ratingEl.innerHTML = `⭐ ${movie.rating}/10`;
        }

        const yearEl = document.getElementById('movieYear');
        if (yearEl) {
            yearEl.textContent = movie.year;
        }

        const runtimeEl = document.getElementById('movieRuntime');
        if (runtimeEl) {
            runtimeEl.textContent = `${movie.runtime} min`;
        }

        // Uppdatera genrer
        const genresEl = document.getElementById('movieGenres');
        if (genresEl) {
            genresEl.innerHTML = movie.genre
                .split(',')
                .map(g => `<span class="genre-chip">${g.trim()}</span>`)
                .join('');
        }

        // Uppdatera handling
        const overviewEl = document.getElementById('movieOverview');
        if (overviewEl) {
            overviewEl.textContent = movie.overview;
        }

        // Uppdatera detaljer
        const directorEl = document.getElementById('movieDirector');
        if (directorEl) {
            directorEl.textContent = movie.director;
        }

        const castEl = document.getElementById('movieCast');
        if (castEl) {
            castEl.textContent = movie.cast.join(', ');
        }

        const releaseDateEl = document.getElementById('movieReleaseDate');
        if (releaseDateEl) {
            releaseDateEl.textContent = Utils.formatDate(movie.releaseDate);
        }

        // Uppdatera favorit-knapp
        this.updateFavoriteButton();

        // Visa filmdetaljer
        const movieDetails = document.getElementById('movieDetails');
        if (movieDetails) {
            movieDetails.classList.add('active');
        }
    }

    /**
     * Uppdatera favorit-knapp baserat på status
     */
    updateFavoriteButton() {
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (!favoriteBtn || !this.currentMovie) return;

        const isFavorite = Storage.isFavorite(this.currentMovie.id);

        if (isFavorite) {
            favoriteBtn.innerHTML = '❤️ Favorit';
            favoriteBtn.classList.add('active');
        } else {
            favoriteBtn.innerHTML = '🤍 Lägg till favorit';
            favoriteBtn.classList.remove('active');
        }
    }

    /**
     * Toggla favorit-status
     */
    toggleFavorite() {
        if (!this.currentMovie) return;

        const isFavorite = Storage.toggleFavorite(this.currentMovie);
        
        if (isFavorite) {
            Utils.showToast('Tillagd i favoriter!', 'success');
        } else {
            Utils.showToast('Borttagen från favoriter', 'info');
        }

        // Uppdatera knapp och räknare
        this.updateFavoriteButton();
        UI.updateFavoritesCount();
    }

    /**
     * Dela film (Web Share API eller fallback)
     */
    async shareMovie() {
        if (!this.currentMovie) return;

        const shareData = {
            title: this.currentMovie.title,
            text: `Kolla in ${this.currentMovie.title} på Filmbibliotek!`,
            url: window.location.href
        };

        // Använd Web Share API om tillgängligt
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                Utils.showToast('Film delad!', 'success');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                }
            }
        } else {
            // Fallback: kopiera länk till clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                Utils.showToast('Länk kopierad till urklipp!', 'success');
            } catch (error) {
                console.error('Error copying to clipboard:', error);
                Utils.showToast('Kunde inte kopiera länk', 'error');
            }
        }
    }

    /**
     * Visa felmeddelande
     */
    showError(message) {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const errorMessage = document.getElementById('errorMessage');
        const movieDetails = document.getElementById('movieDetails');

        if (loadingSpinner) loadingSpinner.classList.remove('active');
        if (movieDetails) movieDetails.classList.remove('active');
        
        if (errorMessage) {
            const errorText = errorMessage.querySelector('.error-text');
            if (errorText) {
                errorText.textContent = message;
            }
            errorMessage.classList.add('active');
        }
    }
}

// ===========================
// Starta detaljsidan
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    new MovieDetails();
});
