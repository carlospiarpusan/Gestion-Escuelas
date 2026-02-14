// Simple obfuscation/encryption wrapper for localStorage
// In a real production app, consider using Web Crypto API for actual encryption if sensitive data is stored on client (avoid if possible).
// This prevents casual reading of session data in DevTools.

const SECRET_KEY_PREFIX = 'school_os_sec_';

const secureStorage = {
    setItem: (key, value) => {
        try {
            const stringValue = JSON.stringify(value);
            // Simple Base64 encoding as obfuscation (Replace with AES for higher security if needed)
            const encodedValue = btoa(unescape(encodeURIComponent(stringValue)));
            localStorage.setItem(`${SECRET_KEY_PREFIX}${key}`, encodedValue);
        } catch (e) {
            console.error('Error encrypting storage', e);
        }
    },

    getItem: (key) => {
        try {
            const item = localStorage.getItem(`${SECRET_KEY_PREFIX}${key}`);
            if (!item) return null;

            const decodedValue = decodeURIComponent(escape(atob(item)));
            return JSON.parse(decodedValue);
        } catch (e) {
            console.error('Error decrypting storage', e);
            return null;
        }
    },

    removeItem: (key) => {
        localStorage.removeItem(`${SECRET_KEY_PREFIX}${key}`);
    },

    clear: () => {
        localStorage.clear();
    }
};

export default secureStorage;
