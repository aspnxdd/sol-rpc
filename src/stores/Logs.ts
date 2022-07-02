import { defineStore } from 'pinia';

const useLogsStore = defineStore('logsStore', {
  state: () => ({
    logs: [] as string[],
  }),
  actions: {
    setLogs(newLog: string) {
      this.logs.push(newLog);
    },
    clearLogs() {
      this.logs = [];
    },
  },
});

export default useLogsStore;
