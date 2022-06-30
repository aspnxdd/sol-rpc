const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;
export function getParamNames(func: Function) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, "");
  var result = fnStr
    .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
    .match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function castToDesiredType<Expected, O>(
  toBeDetermined: Expected | O
): toBeDetermined is Expected {
  if (toBeDetermined as Expected) {
    return true;
  }
  return false;
}

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) {
  let timer: number | NodeJS.Timeout;
  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
}

export function parseTime(numberOfHours: number) {
  const days = Math.floor(numberOfHours / 24);
  const reminder = numberOfHours % 24;
  const hours = Math.floor(reminder);
  const minutes = Math.floor(60 * (reminder - hours));
  return `${days}d ${hours}h ${minutes}m`;
}
