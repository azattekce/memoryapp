// localStorageService.js

const localStorageService = {
    // Veriyi okuma
    get(key) {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error getting data from localStorage', error);
        return null;
      }
    },
  
    // Veriyi kaydetme
    set(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error setting data to localStorage', error);
      }
    },
  
    // Veriyi silme
    remove(key) {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing data from localStorage', error);
      }
    }
  };
  
  export default localStorageService;
  