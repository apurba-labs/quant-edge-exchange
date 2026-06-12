export function generateLatency(): number {
  return Math.floor(
    20 + Math.random() * 180
  );
}

export function generateJitter(): number {
  return Math.floor(
    Math.random() * 50
  );
}