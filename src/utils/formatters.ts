import {fillWithZeros} from './';

export const formatLink = (link : string) : string => {
  let formatted = link.replace('https://', '');
  formatted = formatted.replace('http://', '');
  formatted = formatted.replace('www.', '');
  return formatted;
};

export const formatAmount = (amount: number | string, currency : string = 'R$') : string => {
  return `${currency} ` + Number(amount).toFixed(2).toString().replace('.', ',');
};

export const formatDate = (date: string) => {
  const parts = date.split('-');
  return `${fillWithZeros(parts[2], 2)}/${fillWithZeros(parts[1], 2)}/${parts[0]}`;
};