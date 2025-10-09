// ===========================
// Hjälpfunktioner
// ===========================

export const Utils = {
    /**
     * Debounce-funktion för att begränsa funktionsanrop
     * @param {Function} func - Funktion att debounce
     * @param {number} delay - Fördröjning i millisekunder
     */
    debounce(func, delay = 300) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Formatera datum till läsbart format
     * @param {string} dateString - Datum som sträng
     */
    formatDate(dateString) {
        if (!dateString) return 'Okänt';
        
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('sv-SE', options);
    },

    /**
     * Trunkera text till viss längd
     * @param {string} text - Text att trunkera
     * @param {number} maxLength - Max längd
     */
    truncateText(text, maxLength = 150) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    /**
     * Generera slumpmässig ID
     */
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Validera om ett värde är tomt
     */
    isEmpty(value) {
        return value === null || value === undefined || value === '';
    },

    /**
     * Visa toast-meddelande
     * @param {string} message - Meddelande att visa
     * @param {string} type - success, error, info
     */
    showToast(message, type = 'info') {
        // Skapa toast-element om det inte finns
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        // Sätt innehåll och typ
        toast.textContent = message;
        toast.className = `toast toast-${type} active`;

        // Ta bort efter 3 sekunder
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
};

// Lägg till toast-styling dynamiskt
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: #333;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 9999;
    }
    
    .toast.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-success { background-color: #10b981; }
    .toast-error { background-color: #ef4444; }
    .toast-info { background-color: #3b82f6; }
`;
document.head.appendChild(toastStyle);
