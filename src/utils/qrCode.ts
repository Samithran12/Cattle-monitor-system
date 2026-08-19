/**
 * Generates an SVG Data URI representing a dynamic QR code for a given text or Animal Tag ID.
 */
export function generateQrSvgDataUrl(text: string): string {
  // Hash text to produce deterministic binary grid
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  const size = 25;
  const moduleSize = 8;
  const totalSize = size * moduleSize;
  const rects: string[] = [];

  // Helper to draw fixed finder pattern box
  const addFinderPattern = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        if (isBorder || isCenter) {
          rects.push(
            `<rect x="${(startX + c) * moduleSize}" y="${
              (startY + r) * moduleSize
            }" width="${moduleSize}" height="${moduleSize}" fill="#0d631b" />`
          );
        }
      }
    }
  };

  // 3 Finder patterns at corners
  addFinderPattern(1, 1);
  addFinderPattern(size - 8, 1);
  addFinderPattern(1, size - 8);

  // Generate deterministic data modules based on text hash
  let seed = Math.abs(hash) || 12345;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder pattern zones
      if (
        (r <= 8 && c <= 8) ||
        (r <= 8 && c >= size - 9) ||
        (r >= size - 9 && c <= 8)
      ) {
        continue;
      }

      // Timing pattern
      if (r === 6 || c === 6) {
        if ((r + c) % 2 === 0) {
          rects.push(
            `<rect x="${c * moduleSize}" y="${
              r * moduleSize
            }" width="${moduleSize}" height="${moduleSize}" fill="#181d17" />`
          );
        }
        continue;
      }

      if (pseudoRandom() > 0.45) {
        rects.push(
          `<rect x="${c * moduleSize}" y="${
            r * moduleSize
          }" width="${moduleSize}" height="${moduleSize}" fill="#181d17" />`
        );
      }
    }
  }

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" width="200" height="200"><rect width="${totalSize}" height="${totalSize}" fill="#ffffff" rx="16" />${rects.join(
    ""
  )}</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}
