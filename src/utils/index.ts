export const openInNewTab = (url : string) => {
  window.open(url, '_blank');
};

export const mapSelectOptions = <T> (data: Array<T>, label: string, value: string) : Array<{label: string; value: string | number}> => {
  return data.map((el : {[key:string] : any}) => {
    return {label: el[label], value: el[value]};
  });
};

export const typedKeys = <T>(o: T): (keyof T)[] => {
  return Object.keys(o) as (keyof T)[];
};

export const sumMinutesToHours = (hour : string, minutes : string | number) : string => {
  minutes = Number(minutes);
  if (minutes === 0) return hour;
  const v = hour.split(':').map(el => Number(el));
  v[1] = v[1] + Number(minutes);
  if (v[1] >= 60) {
    v[0] += Math.floor(v[1] / 60);
    v[1] = v[1] % 60;
  }
  return `${v[0] >= 10 ? v[0] : `0${v[0]}`}:${v[1] >= 10 ? v[1] : `0${v[1]}`}`;
};

export const fillWithZeros = (word: string | number, size : number = 2) : string => {
  let formatted = String(word);
  while (formatted.length < size) {
    formatted = `0${formatted}`;
  }
  return formatted;
};