/**
 * Simplifies SVG polygon paths made only of move/line/close commands (m, M, l, L, z, Z).
 *
 * Points are converted to absolute coordinates, rounded to `precision` decimal places and
 * points closer than `minDistance` to the previous kept point are dropped. Output is re-encoded
 * as relative commands computed from the ROUNDED absolute points, so rounding error never
 * accumulates along a border.
 *
 * Used for the India map: the source data has 5-decimal coordinates for a 612-unit-wide map
 * rendered at ~400px, which is far more precision than a screen can show.
 */
type Point = [number, number];

export function simplifyPolygonPath(d: string, precision = 1, minDistance = 0.5): string {
  const tokens = d.match(/[mMlLzZ]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? [];
  const subpaths: Point[][] = [];
  let current: Point[] = [];
  let cmd = "";
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;

  for (let i = 0; i < tokens.length; ) {
    const t = tokens[i];
    if (/^[mMlLzZ]$/.test(t)) {
      cmd = t;
      i++;
      if (cmd === "z" || cmd === "Z") {
        x = startX;
        y = startY;
        if (current.length) subpaths.push(current);
        current = [];
      }
      continue;
    }
    const a = parseFloat(tokens[i]);
    const b = parseFloat(tokens[i + 1]);
    i += 2;
    const relative = cmd === "m" || cmd === "l";
    x = relative ? x + a : a;
    y = relative ? y + b : b;
    if (cmd === "m" || cmd === "M") {
      if (current.length) subpaths.push(current);
      current = [[x, y]];
      startX = x;
      startY = y;
      cmd = cmd === "m" ? "l" : "L"; // following pairs are implicit line-tos
    } else {
      current.push([x, y]);
    }
  }
  if (current.length) subpaths.push(current);

  const factor = 10 ** precision;
  const round = (n: number) => Math.round(n * factor);
  const fmt = (n: number) => {
    const s = (n / factor).toFixed(precision).replace(/\.?0+$/, "");
    return s.replace(/^(-?)0\./, "$1.") || "0";
  };
  const join = (nums: string[]) => nums.reduce((acc, n) => (acc === "" ? n : acc + (n.startsWith("-") ? "" : " ") + n), "");

  const minSq = (minDistance * factor) ** 2;
  const out: string[] = [];
  for (const sp of subpaths) {
    const rounded = sp.map(([px, py]) => [round(px), round(py)] as Point);
    const kept: Point[] = [rounded[0]];
    for (let k = 1; k < rounded.length; k++) {
      const [lx, ly] = kept[kept.length - 1];
      const [px, py] = rounded[k];
      if ((px - lx) ** 2 + (py - ly) ** 2 >= minSq) kept.push(rounded[k]);
    }
    // Tiny islands could collapse; fall back to the rounded (unthinned) outline for them.
    const pts = kept.length >= 3 ? kept : rounded;
    if (pts.length < 2) continue;
    let s = "M" + join([fmt(pts[0][0]), fmt(pts[0][1])]) + "l";
    const rel: string[] = [];
    for (let k = 1; k < pts.length; k++) {
      rel.push(fmt(pts[k][0] - pts[k - 1][0]), fmt(pts[k][1] - pts[k - 1][1]));
    }
    s += join(rel) + "z";
    out.push(s);
  }
  return out.join("");
}
