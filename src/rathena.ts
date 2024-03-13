'use strict';

const raHeaderList: string[] = [
  '//!rathena',
  '//!athena',
  '//!pdr',
];

export function isRathenaHeader (firstLine: string): boolean {
  for (const header of raHeaderList) {
    if (firstLine.startsWith(header)) {
      return true;
    }
  }
  return false;
}