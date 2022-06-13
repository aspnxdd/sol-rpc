import { reactive } from "vue";

interface Logs {
  logs: Record<string, any>;
  setLogs: (logs: Record<string, any>) => void;
  clearLogs: () => void;
}

export const logsStore: Logs = reactive({
  logs: new Array<Record<string, any>>(),
  setLogs(newLog: Record<string, any>) {
    this.logs.push(newLog);
  },
  clearLogs() {
    this.logs = new Array<Record<string, string>>();
  },
});
