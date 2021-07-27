import * as lodash from 'lodash';
import { ParsedQs } from 'qs';

export function booleanOrDefault(
  value: string | string[] | ParsedQs | ParsedQs[] | undefined,
  defaultValue: boolean,
): boolean {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  return lodash.isString(value) && value.trim().toLowerCase() === 'true' ? true : defaultValue;
}

export function numberOrDefault(
  value: string | string[] | ParsedQs | ParsedQs[] | undefined,
  defaultValue = 0,
): number {
  if (!value) {
    return defaultValue;
  }
  try {
    return +value;
  } catch (error) {
    return defaultValue;
  }
}

export function floatOrDefault(value: string | string[] | ParsedQs | ParsedQs[], defaultValue = 0): number {
  if (!value) {
    return defaultValue;
  }
  try {
    return parseFloat(value as string);
  } catch (error) {
    return defaultValue;
  }
}

export function csvStringToArray(value: string | string[] | ParsedQs | ParsedQs[] | undefined): string[] {
  const arrayParam: string[] = [];

  if (!lodash.isEmpty(value) && typeof value === 'string') {
    value
      .split(',')
      .filter((l): boolean => l.trim() !== '')
      .map((l): string => l.trim())
      .forEach((l): number => arrayParam.push(l));
  }
  return lodash.uniq(arrayParam);
}
