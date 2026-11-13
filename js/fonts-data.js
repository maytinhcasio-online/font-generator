var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var LOWER = "abcdefghijklmnopqrstuvwxyz";
var DIGITS = "0123456789";

function charsFrom(start, count) {
  return Array.from({ length: count }, function (_, i) {
    return String.fromCodePoint(start + i);
  });
}

function fromCodes(codes) {
  return codes.map(function (code) {
    return String.fromCodePoint(code);
  });
}

function mapFrom(upper, lower, digits) {
  var up = Array.from(upper);
  var lo = Array.from(lower);
  var di = Array.from(digits);
  if (up.length !== 26 || lo.length !== 26 || di.length !== 10) {
    throw new Error("Alphabet length " + up.length + ", " + lo.length + ", " + di.length);
  }
  var map = {};
  for (var i = 0; i < 26; i += 1) {
    map[UPPER[i]] = up[i];
    map[LOWER[i]] = lo[i];
  }
  for (var d = 0; d < 10; d += 1) map[DIGITS[d]] = di[d];
  return map;
}

function withMark(map, mark) {
  var next = {};
  Object.keys(map).forEach(function (key) {
    next[key] = map[key] + mark;
  });
  return next;
}

function wrapEach(prefix, suffix) {
  var map = {};
  (UPPER + LOWER + DIGITS).split("").forEach(function (ch) {
    map[ch] = prefix + ch + suffix;
  });
  return map;
}

var plainDigits = DIGITS.split("");
var boldDigits = charsFrom(0x1d7ce, 10);
var doubleDigits = charsFrom(0x1d7d8, 10);
var sansDigits = charsFrom(0x1d7e2, 10);
var sansBoldDigits = charsFrom(0x1d7ec, 10);
var monoDigits = charsFrom(0x1d7f6, 10);
var fullDigits = charsFrom(0xff10, 10);
var superDigits = fromCodes([0x2070, 0x00b9, 0x00b2, 0x00b3, 0x2074, 0x2075, 0x2076, 0x2077, 0x2078, 0x2079]);
var subDigits = charsFrom(0x2080, 10);
var circleDigits = [String.fromCodePoint(0x24ea)].concat(charsFrom(0x2460, 9));
var blackDigits = [String.fromCodePoint(0x24ff)].concat(charsFrom(0x2776, 9));
var parenDigits = ["(0)"].concat(charsFrom(0x2474, 9));

var italicLower = charsFrom(0x1d44e, 7).concat([String.fromCodePoint(0x210e)], charsFrom(0x1d456, 18));
var scriptUpper = fromCodes([
  0x1d49c, 0x212c, 0x1d49e, 0x1d49f, 0x2130, 0x2131, 0x1d4a2, 0x210b, 0x2110, 0x1d4a5,
  0x1d4a6, 0x2112, 0x2133, 0x1d4a9, 0x1d4aa, 0x1d4ab, 0x1d4ac, 0x211b, 0x1d4ae, 0x1d4af,
  0x1d4b0, 0x1d4b1, 0x1d4b2, 0x1d4b3, 0x1d4b4, 0x1d4b5
]);
var scriptLower = fromCodes([
  0x1d4b6, 0x1d4b7, 0x1d4b8, 0x1d4b9, 0x212f, 0x1d4bb, 0x210a, 0x1d4bd, 0x1d4be, 0x1d4bf,
  0x1d4c0, 0x1d4c1, 0x1d4c2, 0x1d4c3, 0x2134, 0x1d4c5, 0x1d4c6, 0x1d4c7, 0x1d4c8, 0x1d4c9,
  0x1d4ca, 0x1d4cb, 0x1d4cc, 0x1d4cd, 0x1d4ce, 0x1d4cf
]);
var frakturUpper = fromCodes([
  0x1d504, 0x1d505, 0x212d, 0x1d507, 0x1d508, 0x1d509, 0x1d50a, 0x210c, 0x2111, 0x1d50d,
  0x1d50e, 0x1d50f, 0x1d510, 0x1d511, 0x1d512, 0x1d513, 0x1d514, 0x211c, 0x1d516, 0x1d517,
  0x1d518, 0x1d519, 0x1d51a, 0x1d51b, 0x1d51c, 0x2128
]);
var doubleUpper = fromCodes([
  0x1d538, 0x1d539, 0x2102, 0x1d53b, 0x1d53c, 0x1d53d, 0x1d53e, 0x210d, 0x1d540, 0x1d541,
  0x1d542, 0x1d543, 0x1d544, 0x2115, 0x1d546, 0x2119, 0x211a, 0x211d, 0x1d54a, 0x1d54b,
  0x1d54c, 0x1d54d, 0x1d54e, 0x1d54f, 0x1d550, 0x2124
]);
var smallCaps = fromCodes([
  0x1d00, 0x0299, 0x1d04, 0x1d05, 0x1d07, 0xa730, 0x0262, 0x029c, 0x026a, 0x1d0a,
  0x1d0b, 0x029f, 0x1d0d, 0x0274, 0x1d0f, 0x1d18, 0xa7af, 0x0280, 0xa731, 0x1d1b,
  0x1d1c, 0x1d20, 0x1d21, 0x0078, 0x028f, 0x1d22
]);
var superscript = fromCodes([
  0x1d43, 0x1d47, 0x1d9c, 0x1d48, 0x1d49, 0x1da0, 0x1d4d, 0x02b0, 0x2071, 0x02b2,
  0x1d4f, 0x02e1, 0x1d50, 0x207f, 0x1d52, 0x1d56, 0x1d60, 0x02b3, 0x02e2, 0x1d57,
  0x1d58, 0x1d5b, 0x02b7, 0x02e3, 0x02b8, 0x1dbb
]);
var flipLower = fromCodes([
  0x0250, 0x0071, 0x0254, 0x0070, 0x01dd, 0x025f, 0x0183, 0x0265, 0x1d09, 0x027e,
  0x029e, 0x006c, 0x026f, 0x0075, 0x006f, 0x0064, 0x0062, 0x0279, 0x0073, 0x0287,
  0x006e, 0x028c, 0x028d, 0x0078, 0x028e, 0x007a
]);
var flipUpper = fromCodes([
  0x2200, 0x0042, 0x0186, 0x0044, 0x018e, 0x2132, 0x05e4, 0x0048, 0x0049, 0x017f,
  0x004b, 0x02e5, 0x0057, 0x004e, 0x004f, 0x0500, 0x0051, 0x0052, 0x0053, 0x22a5,
  0x2229, 0x039b, 0x004d, 0x0058, 0x2144, 0x005a
]);
var flipDigits = fromCodes([0x0030, 0x0196, 0x1105, 0x0190, 0x3123, 0x03db, 0x0039, 0x3125, 0x0038, 0x0036]);

var plain = mapFrom(UPPER, LOWER, plainDigits);
var bold = mapFrom(charsFrom(0x1d400, 26), charsFrom(0x1d41a, 26), boldDigits);
var italic = mapFrom(charsFrom(0x1d434, 26), italicLower, plainDigits);
var boldItalic = mapFrom(charsFrom(0x1d468, 26), charsFrom(0x1d482, 26), boldDigits);
var script = mapFrom(scriptUpper, scriptLower, plainDigits);
var boldScript = mapFrom(charsFrom(0x1d4d0, 26), charsFrom(0x1d4ea, 26), boldDigits);
var fraktur = mapFrom(frakturUpper, charsFrom(0x1d51e, 26), plainDigits);
var boldFraktur = mapFrom(charsFrom(0x1d56c, 26), charsFrom(0x1d586, 26), boldDigits);
var doubleStruck = mapFrom(doubleUpper, charsFrom(0x1d552, 26), doubleDigits);
var sans = mapFrom(charsFrom(0x1d5a0, 26), charsFrom(0x1d5ba, 26), sansDigits);
var sansBold = mapFrom(charsFrom(0x1d5d4, 26), charsFrom(0x1d5ee, 26), sansBoldDigits);
var sansItalic = mapFrom(charsFrom(0x1d608, 26), charsFrom(0x1d622, 26), sansDigits);
var sansBoldItalic = mapFrom(charsFrom(0x1d63c, 26), charsFrom(0x1d656, 26), sansBoldDigits);
var mono = mapFrom(charsFrom(0x1d670, 26), charsFrom(0x1d68a, 26), monoDigits);
var fullwidth = mapFrom(charsFrom(0xff21, 26), charsFrom(0xff41, 26), fullDigits);
var circled = mapFrom(charsFrom(0x24b6, 26), charsFrom(0x24d0, 26), circleDigits);
var blackCircle = mapFrom(charsFrom(0x1f150, 26), charsFrom(0x1f150, 26), blackDigits);
var squared = mapFrom(charsFrom(0x1f130, 26), charsFrom(0x1f130, 26), plainDigits.map(function (d) { return "[" + d + "]"; }));
var negativeSquared = mapFrom(charsFrom(0x1f170, 26), charsFrom(0x1f170, 26), sansBoldDigits);
var parenthesized = mapFrom(charsFrom(0x1f110, 26), charsFrom(0x249c, 26), parenDigits);

var FONT_STYLES = [
  { name: "Script", category: "cursive", map: script },
  { name: "Bold Script", category: "cursive", map: boldScript },
  { name: "Italic", category: "cursive", map: italic },
  { name: "Bold Italic", category: "cursive", map: boldItalic },
  { name: "Sans Italic", category: "cursive", map: sansItalic },
  { name: "Sans Bold Italic", category: "cursive", map: sansBoldItalic },
  { name: "Underlined Script", category: "cursive", map: withMark(script, "\u0332") },
  { name: "Struck Italic", category: "cursive", map: withMark(italic, "\u0336") },

  { name: "Small Caps", category: "aesthetic", map: mapFrom(smallCaps, smallCaps, subDigits) },
  { name: "Fullwidth", category: "aesthetic", map: fullwidth },
  { name: "Tiny", category: "aesthetic", map: mapFrom(superscript, superscript, superDigits) },
  { name: "Upside Down", category: "aesthetic", map: mapFrom(flipUpper, flipLower, flipDigits), reverse: true },
  { name: "Monospace", category: "aesthetic", map: mono },
  { name: "Double Struck", category: "aesthetic", map: doubleStruck },
  { name: "Fraktur", category: "aesthetic", map: fraktur },
  { name: "Sans", category: "aesthetic", map: sans },
  { name: "Spaced", category: "aesthetic", map: plain, separator: " " },
  { name: "Underline", category: "aesthetic", map: withMark(plain, "\u0332") },
  { name: "Strikethrough", category: "aesthetic", map: withMark(plain, "\u0336") },
  { name: "Dotted", category: "aesthetic", map: withMark(plain, "\u0323") },

  { name: "Bold", category: "bold", map: bold },
  { name: "Sans Bold", category: "bold", map: sansBold },
  { name: "Bold Fraktur", category: "bold", map: boldFraktur },
  { name: "Underlined Bold", category: "bold", map: withMark(bold, "\u0332") },
  { name: "Struck Bold", category: "bold", map: withMark(bold, "\u0336") },
  { name: "Slashed Bold", category: "bold", map: withMark(bold, "\u0338") },
  { name: "Double Underline", category: "bold", map: withMark(bold, "\u0333") },
  { name: "Wavy Bold", category: "bold", map: withMark(bold, "\u0330") },

  { name: "Bubble", category: "symbols", map: circled },
  { name: "Black Bubble", category: "symbols", map: blackCircle },
  { name: "Squared", category: "symbols", map: squared },
  { name: "Negative Squared", category: "symbols", map: negativeSquared },
  { name: "Parenthesized", category: "symbols", map: parenthesized },
  { name: "Keycap", category: "symbols", map: withMark(plain, "\u20e3") },
  { name: "Boxed", category: "symbols", map: wrapEach("【", "】") },
  { name: "Diamond", category: "symbols", map: withMark(plain, "\u20df") }
];

FONT_STYLES.forEach(function (style) {
  var keys = Object.keys(style.map);
  if (keys.length !== 62) throw new Error(style.name + " has " + keys.length + " mappings");
  keys.forEach(function (key) {
    if (!style.map[key]) throw new Error(style.name + " is missing " + key);
  });
});
