// ===========================
// API-hantering med klass
// ===========================

export class MovieAPI {
    constructor() {
        // Base URL för API (simulerad - du kan byta till riktigt API)
        this.baseURL = 'https://api.example.com/movies'; // Byt ut mot riktigt API
        this.currentPage = 1;
        this.totalPages = 0;
    }

    /**
     * Simulerad API-anrop (generera mockdata)
     * I produktion skulle detta vara en riktig fetch till backend
     */
    async fetchMovies(page = 1) {
        try {
            // Simulera nätverksfördröjning
            await this.delay(500);

            // Generera mockdata (i produktion: fetch från backend)
            const movies = this.generateMockMovies(page);
            
            this.currentPage = page;
            this.totalPages = 10; // Simulerat

            return {
                success: true,
                data: movies,
                page: this.currentPage,
                totalPages: this.totalPages
            };

        } catch (error) {
            console.error('Error fetching movies:', error);
            throw new Error('Kunde inte hämta filmer. Försök igen senare.');
        }
    }

    /**
     * Sök efter filmer
     * @param {string} query - Sökterm
     */
    async searchMovies(query) {
        try {
            await this.delay(300);

            // I produktion: fetch med query-parameter
            // const response = await fetch(`${this.baseURL}/search?q=${query}`);
            
            const allMovies = this.generateMockMovies(1, 50);
            const filtered = allMovies.filter(movie => 
                movie.title.toLowerCase().includes(query.toLowerCase()) ||
                movie.overview.toLowerCase().includes(query.toLowerCase())
            );

            return {
                success: true,
                data: filtered
            };

        } catch (error) {
            console.error('Error searching movies:', error);
            throw new Error('Sökningen misslyckades.');
        }
    }

    /**
     * Hämta film efter ID
     * @param {number} movieId - Film-ID
     */
    async getMovieById(movieId) {
        try {
            await this.delay(200);

            // I produktion: fetch med ID
            // const response = await fetch(`${this.baseURL}/${movieId}`);
            
            const movie = this.generateMockMovie(movieId);

            return {
                success: true,
                data: movie
            };

        } catch (error) {
            console.error('Error fetching movie:', error);
            throw new Error('Kunde inte hämta filmdetaljer.');
        }
    }

    /**
     * Filtrera filmer efter genre
     * @param {string} genre - Genre
     */
    async filterByGenre(genre) {
        try {
            await this.delay(300);

            const allMovies = this.generateMockMovies(1, 30);
            const filtered = genre 
                ? allMovies.filter(movie => 
                    movie.genre.toLowerCase().includes(genre.toLowerCase())
                  )
                : allMovies;

            return {
                success: true,
                data: filtered
            };

        } catch (error) {
            console.error('Error filtering movies:', error);
            throw new Error('Filtrering misslyckades.');
        }
    }

    // ===========================
    // Hjälpmetoder
    // ===========================

    /**
     * Simulera fördröjning (för mockdata)
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Generera mockfilmer
     */
    generateMockMovies(page = 1, count = 20) {
        const movies = [];
        const startId = (page - 1) * count + 1;

        const titles = [
            'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
            'Pulp Fiction', 'Forrest Gump', 'Inception', 'Fight Club',
            'The Matrix', 'Goodfellas', 'Se7en', 'Interstellar',
            'The Silence of the Lambs', 'Saving Private Ryan', 'The Green Mile',
            'Life is Beautiful', 'The Prestige', 'The Lion King',
            'Back to the Future', 'The Pianist', 'Gladiator',
            'Casablanca', 'Schindler\'s List', 'City of God',
            'The Departed', 'Whiplash', 'The Intouchables'
        ];

        const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];
        
        const overviews = [
            'En episk berättelse om hopp och vänskap.',
            'Ett mästerverk som definierade en generation.',
            'En intensiv thriller som håller dig på helspänn.',
            'En emotionell resa genom tid och rum.',
            'Ett visuellt spektakel med djup mening.'
        ];

        for (let i = 0; i < count; i++) {
            const id = startId + i;
            movies.push({
                id: id,
                title: titles[i % titles.length] + ` ${Math.floor(i / titles.length) + 1}`,
                year: 1990 + (i % 30),
                rating: (7 + Math.random() * 2).toFixed(1),
                genre: genres[i % genres.length],
                overview: overviews[i % overviews.length],
                poster: `assets/images/placeholder.svg`,
                director: 'Steven Spielberg',
                cast: ['Actor A', 'Actor B', 'Actor C'],
                runtime: 120 + (i % 60),
                releaseDate: `${1990 + (i % 30)}-${String((i % 12) + 1).padStart(2, '0')}-15`
            });
        }

        return movies;
    }

    /**
     * Generera enskild mockfilm
     */
    generateMockMovie(id) {
        const movies = this.generateMockMovies(1, 100);
        return movies.find(m => m.id === id) || movies[0];
    }
}
