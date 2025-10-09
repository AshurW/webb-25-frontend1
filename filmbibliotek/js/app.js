// ===========================
// Huvudapplikation
// ===========================

import { MovieAPI } from './api.js';
import { Storage } from './storage.js';
import { UI } from './ui.js';
import { Utils } from './utils.js';

class App {
    constructor() {
        this.movieAPI = new MovieAPI();
        this.currentMovies = [];
        this.currentPage = 1;
        this.isLoading = false;
        this.currentFilter = '';
        this.currentSearch = '';
        
        this.init();
    }

    /**
     * Initialisera applikationen
     */
    async init() {
        console.log('🎬 Filmbibliotek startar...');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Uppdatera favoriter-räknare
        UI.updateFavoritesCount();
        
        // Ladda initiala filmer
        await this.loadMovies();
    }

    /**
     * Setup alla event listeners
     */
    setupEventListeners() {
        // Sökformulär
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        
        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSearch(searchInput.value);
            });

            // Debounced search on input
            searchInput.addEventListener('input', Utils.debounce((e) => {
                if (e.target.value.length >= 3 || e.target.value.length === 0) {
                    this.handleSearch(e.target.value);
                }
            }, 500));
        }

        // Genre-filter
        const genreFilter = document.getElementById('genreFilter');
        if (genreFilter) {
            genreFilter.addEventListener('change', (e) => {
                this.handleGenreFilter(e.target.value);
            });
        }

        // Load more-knapp
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreMovies();
            });
        }

        // Modal-stängning
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => UI.closeModal());
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => UI.closeModal());
        }

        // ESC-tangent för att stänga modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                UI.closeModal();
            }
        });

        // Retry-knapp
        const retryBtn = document.getElementById('retryBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                UI.hideError();
                this.loadMovies();
            });
        }

        // Infinite scroll (optional)
        // window.addEventListener('scroll', Utils.debounce(() => {
        //     if (this.isNearBottom() && !this.isLoading) {
        //         this.loadMoreMovies();
        //     }
        // }, 300));
    }

    /**
     * Ladda filmer
     */
    async loadMovies(page = 1) {
        if (this.isLoading) return;

        this.isLoading = true;
        UI.showLoading();
        UI.hideError();

        try {
            const response = await this.movieAPI.fetchMovies(page);
            
            if (response.success) {
                this.currentMovies = response.data;
                this.currentPage = response.page;
                
                const grid = document.getElementById('moviesGrid');
                UI.renderMovies(this.currentMovies, grid);
            }

        } catch (error) {
            console.error('Error loading movies:', error);
            UI.showError(error.message || 'Kunde inte ladda filmer');
        } finally {
            this.isLoading = false;
            UI.hideLoading();
        }
    }

    /**
     * Ladda fler filmer
     */
    async loadMoreMovies() {
        if (this.isLoading) return;

        this.isLoading = true;
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Laddar...';
            loadMoreBtn.disabled = true;
        }

        try {
            const nextPage = this.currentPage + 1;
            const response = await this.movieAPI.fetchMovies(nextPage);
            
            if (response.success) {
                this.currentMovies = [...this.currentMovies, ...response.data];
                this.currentPage = response.page;
                
                const grid = document.getElementById('moviesGrid');
                
                // Lägg till nya kort utan att rensa befintliga
                const fragment = document.createDocumentFragment();
                response.data.forEach(movie => {
                    const card = UI.createMovieCard(movie);
                    fragment.appendChild(card);
                });
                grid.appendChild(fragment);
                
                Utils.showToast('Fler filmer laddade!', 'success');
            }

        } catch (error) {
            console.error('Error loading more movies:', error);
            Utils.showToast('Kunde inte ladda fler filmer', 'error');
        } finally {
            this.isLoading = false;
            
            if (loadMoreBtn) {
                loadMoreBtn.textContent = 'Ladda fler filmer';
                loadMoreBtn.disabled = false;
            }
        }
    }

    /**
     * Hantera sökning
     */
    async handleSearch(query) {
        this.currentSearch = query.trim();

        // Om sökningen är tom, ladda alla filmer igen
        if (this.currentSearch === '') {
            await this.loadMovies();
            return;
        }

        // Spara sökning
        Storage.addRecentSearch(this.currentSearch);

        UI.showLoading();
        UI.hideError();

        try {
            const response = await this.movieAPI.searchMovies(this.currentSearch);
            
            if (response.success) {
                this.currentMovies = response.data;
                const grid = document.getElementById('moviesGrid');
                UI.renderMovies(this.currentMovies, grid);
                
                if (response.data.length > 0) {
                    Utils.showToast(`Hittade ${response.data.length} filmer`, 'success');
                }
            }

        } catch (error) {
            console.error('Error searching movies:', error);
            UI.showError(error.message || 'Sökningen misslyckades');
        } finally {
            UI.hideLoading();
        }
    }

    /**
     * Hantera genre-filter
     */
    async handleGenreFilter(genre) {
        this.currentFilter = genre;

        UI.showLoading();
        UI.hideError();

        try {
            const response = await this.movieAPI.filterByGenre(genre);
            
            if (response.success) {
                this.currentMovies = response.data;
                const grid = document.getElementById('moviesGrid');
                UI.renderMovies(this.currentMovies, grid);
            }

        } catch (error) {
            console.error('Error filtering movies:', error);
            UI.showError(error.message || 'Filtrering misslyckades');
        } finally {
            UI.hideLoading();
        }
    }

    /**
     * Kontrollera om användaren är nära botten (för infinite scroll)
     */
    isNearBottom() {
        const threshold = 200;
        const position = window.scrollY + window.innerHeight;
        const height = document.documentElement.scrollHeight;
        return position >= height - threshold;
    }
}

// ===========================
// Starta applikationen
// ===========================

// Vänta tills DOM är laddad
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
