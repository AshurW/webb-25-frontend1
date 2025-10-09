// ===========================
// LocalStorage-hantering
// ===========================

export const Storage = {
    // Keys för localStorage
    KEYS: {
        FAVORITES: 'moviedb_favorites',
        THEME: 'moviedb_theme',
        RECENT_SEARCHES: 'moviedb_recent_searches'
    },

    /**
     * Spara data till localStorage
     * @param {string} key - Nyckel
     * @param {*} data - Data att spara
     */
    set(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    /**
     * Hämta data från localStorage
     * @param {string} key - Nyckel
     */
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    /**
     * Ta bort data från localStorage
     * @param {string} key - Nyckel
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    /**
     * Rensa all data
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    // ===========================
    // Favoriter
    // ===========================

    /**
     * Hämta alla favoritfilmer
     */
    getFavorites() {
        return this.get(this.KEYS.FAVORITES) || [];
    },

    /**
     * Lägg till film till favoriter
     * @param {Object} movie - Filmobjekt
     */
    addFavorite(movie) {
        const favorites = this.getFavorites();
        
        // Kontrollera om filmen redan finns
        const exists = favorites.some(fav => fav.id === movie.id);
        if (exists) {
            return false;
        }

        favorites.push(movie);
        this.set(this.KEYS.FAVORITES, favorites);
        return true;
    },

    /**
     * Ta bort film från favoriter
     * @param {number} movieId - Film-ID
     */
    removeFavorite(movieId) {
        const favorites = this.getFavorites();
        const filtered = favorites.filter(movie => movie.id !== movieId);
        this.set(this.KEYS.FAVORITES, filtered);
        return true;
    },

    /**
     * Kontrollera om film är favorit
     * @param {number} movieId - Film-ID
     */
    isFavorite(movieId) {
        const favorites = this.getFavorites();
        return favorites.some(movie => movie.id === movieId);
    },

    /**
     * Toggla favorit-status
     * @param {Object} movie - Filmobjekt
     */
    toggleFavorite(movie) {
        if (this.isFavorite(movie.id)) {
            this.removeFavorite(movie.id);
            return false; // Inte längre favorit
        } else {
            this.addFavorite(movie);
            return true; // Nu favorit
        }
    },

    // ===========================
    // Senaste sökningar
    // ===========================

    /**
     * Hämta senaste sökningar
     */
    getRecentSearches() {
        return this.get(this.KEYS.RECENT_SEARCHES) || [];
    },

    /**
     * Lägg till sökning
     * @param {string} searchTerm - Sökterm
     */
    addRecentSearch(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') return;

        let searches = this.getRecentSearches();
        
        // Ta bort om den redan finns
        searches = searches.filter(term => term !== searchTerm);
        
        // Lägg till i början
        searches.unshift(searchTerm);
        
        // Behåll bara de 10 senaste
        searches = searches.slice(0, 10);
        
        this.set(this.KEYS.RECENT_SEARCHES, searches);
    },

    /**
     * Rensa senaste sökningar
     */
    clearRecentSearches() {
        this.remove(this.KEYS.RECENT_SEARCHES);
    }
};
