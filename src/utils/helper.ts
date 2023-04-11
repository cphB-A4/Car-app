export function kWToHP(kilowatts: number): number {
  const hp = kilowatts / 0.738;
  return Math.round(hp);
}
