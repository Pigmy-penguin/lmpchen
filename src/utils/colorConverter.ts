export default function oklchToHex(color: string): string {
  // Get color values from the string
  const regex = /oklch\s*\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(deg)?/i;
  const match = color.match(regex);
  if (!match) throw new Error("Format oklch() invalide");

  const l = parseFloat(match[1]);
  const c = parseFloat(match[2]);
  const h = parseFloat(match[3]);

  console.log("color:", color, "\nlch:", l, c, h);
  // OKLCH → OKLab
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);

  // OKLab → linear RGB
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ ** 3;
  const m3 = m_ ** 3;
  const s3 = s_ ** 3;

  let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let b_ = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  // Linear RGB → sRGB
  const srgb = [r, g, b_].map((v) => {
    // Clamp to [0, 1]
    v = Math.max(0, Math.min(1, v));
    // Gamma correction
    return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
  });

  // RGB → hex
  return (
    "#" +
    srgb
      .map((x) => {
        const hex = Math.round(x * 255)
          .toString(16)
          .padStart(2, "0");
        return hex;
      })
      .join("")
  );
}
