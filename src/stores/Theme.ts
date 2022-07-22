import { defineStore } from 'pinia';



const useThemeStore = defineStore('themeStore', {
  state: () => ({
    theme: false
  }),
  actions: {
    setTheme(t: boolean) {
      this.theme = t;
    },
   
  },
});

export default useThemeStore;
