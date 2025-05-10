export default function getRandomColor() {
  const l = Math.random() * 0.07 + 0.66; // Lightness
  const c = Math.random() * 0.03 + 0.067; // Chroma
  const h = Math.random() * 360; // Hue

  return `oklch(${l.toFixed(2)} ${c.toFixed(4)} ${h.toFixed(3)})`;
}
