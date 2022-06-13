import { reactive } from "vue";

interface Logs {
  logs: string[];
  setLogs: (newLog: string) => void;
  clearLogs: () => void;
}

export const logsStore: Logs = reactive({
  logs: new Array<string>(),
  setLogs(newLog: string) {
    this.logs.push(newLog);
  },
  clearLogs() {
    this.logs = [];
  },
});
