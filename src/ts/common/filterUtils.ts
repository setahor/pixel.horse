import { fromPairs } from 'lodash';
import { matchRomaji, replaceRomaji } from '../client/clientUtils';
import { flatten } from './utils';

const MAX_REPEATS = 16; // needs to be even for emoji

export const ipRegexText = '(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})';
export const ipExceptionRegex = /\d\.\d\.\d\.\d/ui;
export const urlExceptionRegex = /^(battle|paint|f(im|an)fiction)\.net$/ui;
export const urlRegexTexts = [
  'https?:?//\\S+',
  '\\bwww\\.[^. ]\\S+',
  '\\S+[^. ]\\. *(c[o0]m|net)\\b',
  '\\S+[^. ] *\\.(c[o0]m|net)\\b',
  '(^| )[a-z][a-z0-9]{2,}[.,][a-z]{2,3}(/[a-z0-9_?=+-]+)+\\b',
];

export function trimRepeatedLetters(test: string): string {
  if (test.length > MAX_REPEATS && (/^.?(.)\1+$/u.test(test) || /^.?(..)\1+$/u.test(test))) {
    return test.substr(0, MAX_REPEATS) + '…';
  } else {
    return test;
  }
}

function createCharacterMap(data: string[][]): { [key: string]: string; } {
  const mappings = data.map(([to, from]) => from.split(/ /g).map(x => [x, to]));
  return fromPairs(flatten(mappings));
}

const characters = createCharacterMap([
  [`'`, 'Ъ ъ Ь ь'],
  ['a', 'á ă ắ ặ ằ ẳ ẵ ǎ â ấ ậ ầ ẩ ẫ ä ǟ ȧ ǡ ạ ȁ à ả ȃ ā ą ᶏ ẚ å ǻ ḁ ⱥ ã ɐ ₐ А а @ α'],
  ['A', 'Á Ă Ắ Ặ Ằ Ẳ Ẵ Ǎ Â Ấ Ậ Ầ Ẩ Ẫ Ä Ǟ Ȧ Ǡ Ạ Ȁ À Ả Ȃ Ā Ą Å Ǻ Ḁ Ⱥ Ã Ɐ ᴀ'],
  ['aa', 'ꜳ'],
  ['AA', 'Ꜳ'],
  ['ae', 'æ ǽ ǣ ᴂ'],
  ['AE', 'Æ Ǽ Ǣ ᴁ'],
  ['ao', 'ꜵ'],
  ['AO', 'Ꜵ'],
  ['au', 'ꜷ'],
  ['AU', 'Ꜷ'],
  ['av', 'ꜹ ꜻ'],
  ['AV', 'Ꜹ Ꜻ'],
  ['ay', 'ꜽ'],
  ['AY', 'Ꜽ'],
  ['b', 'ḃ ḅ ɓ ḇ ᵬ ᶀ ƀ ƃ б'],
  ['B', 'Ḃ Ḅ Ɓ Ḇ Ƀ Ƃ ʙ ᴃ Б'],
  ['c', 'ć č ç ḉ ĉ ɕ ċ ƈ ȼ ↄ ꜿ'],
  ['C', 'Ć Č Ç Ḉ Ĉ Ċ Ƈ Ȼ Ꜿ ᴄ'],
  ['ch', 'ч'],
  ['CH', 'Ч'],
  ['d', 'ď ḑ ḓ ȡ ḋ ḍ ɗ ᶑ ḏ ᵭ ᶁ đ ɖ ƌ ꝺ д'],
  ['D', 'Ď Ḑ Ḓ Ḋ Ḍ Ɗ Ḏ ǲ ǅ Đ Ƌ Ꝺ ᴅ Д'],
  ['dz', 'ǳ ǆ'],
  ['DZ', 'Ǳ Ǆ'],
  ['e', 'é ĕ ě ȩ ḝ ê ế ệ ề ể ễ ḙ ë ė ẹ ȅ è ẻ ȇ ē ḗ ḕ ⱸ ę ᶒ ɇ ẽ ḛ ɛ ᶓ ɘ ǝ ₑ е э ε'],
  ['E', 'É Ĕ Ě Ȩ Ḝ Ê Ế Ệ Ề Ể Ễ Ḙ Ë Ė Ẹ Ȅ È Ẻ Ȇ Ē Ḗ Ḕ Ę Ɇ Ẽ Ḛ Ɛ Ǝ ᴇ ⱻ Е Э'],
  ['et', 'ꝫ'],
  ['ET', 'Ꝫ'],
  ['f', 'ḟ ƒ ᵮ ᶂ ꝼ ф'],
  ['F', 'Ḟ Ƒ Ꝼ ꜰ Ф'],
  ['ff', 'ﬀ'],
  ['ffi', 'ﬃ'],
  ['ffl', 'ﬄ'],
  ['fi', 'ﬁ'],
  ['fl', 'ﬂ'],
  ['g', 'ǵ ğ ǧ ģ ĝ ġ ɠ ḡ ᶃ ǥ ᵹ ɡ ᵷ г'],
  ['G', 'Ǵ Ğ Ǧ Ģ Ĝ Ġ Ɠ Ḡ Ǥ Ᵹ ɢ ʛ Г'],
  ['h', 'ḫ ȟ ḩ ĥ ⱨ ḧ ḣ ḥ ɦ ẖ ħ ɥ ʮ ʯ х'],
  ['H', 'Ḫ Ȟ Ḩ Ĥ Ⱨ Ḧ Ḣ Ḥ Ħ ʜ Х'],
  ['hv', 'ƕ'],
  ['i', 'ı í ĭ ǐ î ï ḯ ị ȉ ì ỉ ȋ ī į ᶖ ɨ ĩ ḭ ᴉ ᵢ й ы и ι'],
  ['I', 'Í Ĭ Ǐ Î Ï Ḯ İ Ị Ȉ Ì Ỉ Ȋ Ī Į Ɨ Ĩ Ḭ ɪ Й Ы И'],
  ['ij', 'ĳ'],
  ['IJ', 'Ĳ'],
  ['is', 'ꝭ'],
  ['IS', 'Ꝭ'],
  ['j', 'ȷ ɟ ʄ ǰ ĵ ʝ ɉ ⱼ'],
  ['J', 'Ĵ Ɉ ᴊ'],
  ['k', 'ḱ ǩ ķ ⱪ ꝃ ḳ ƙ ḵ ᶄ ꝁ ꝅ ʞ к'],
  ['K', 'Ḱ Ǩ Ķ Ⱪ Ꝃ Ḳ Ƙ Ḵ Ꝁ Ꝅ ᴋ К'],
  ['l', 'ĺ ƚ ɬ ľ ļ ḽ ȴ ḷ ḹ ⱡ ꝉ ḻ ŀ ɫ ᶅ ɭ ł ꞁ л'],
  ['L', 'Ĺ Ƚ Ľ Ļ Ḽ Ḷ Ḹ Ⱡ Ꝉ Ḻ Ŀ Ɫ ǈ Ł Ꞁ ʟ ᴌ Л'],
  ['lj', 'ǉ'],
  ['LJ', 'Ǉ'],
  ['m', 'ḿ ṁ ṃ ɱ ᵯ ᶆ ɯ ɰ м'],
  ['M', 'Ḿ Ṁ Ṃ Ɱ Ɯ ᴍ М'],
  ['n', 'ń ň ņ ṋ ȵ ṅ ṇ ǹ ɲ ṉ ƞ ᵰ ᶇ ɳ ñ н η'],
  ['N', 'Ń Ň Ņ Ṋ Ṅ Ṇ Ǹ Ɲ Ṉ Ƞ ǋ Ñ ɴ ᴎ Н'],
  ['nj', 'ǌ'],
  ['NJ', 'Ǌ'],
  ['o', 'ɵ ó ŏ ǒ ô ố ộ ồ ổ ỗ ö ȫ ȯ ȱ ọ ő ȍ ò ỏ ơ ớ ợ ờ ở ỡ ȏ ꝋ ꝍ ⱺ ō ṓ ṑ ǫ ǭ ø ǿ õ ṍ ṏ ȭ ɔ ᶗ ᴑ ᴓ ₒ о'],
  ['O', 'Ó Ŏ Ǒ Ô Ố Ộ Ồ Ổ Ỗ Ö Ȫ Ȯ Ȱ Ọ Ő Ȍ Ò Ỏ Ơ Ớ Ợ Ờ Ở Ỡ Ȏ Ꝋ Ꝍ Ō Ṓ Ṑ Ɵ Ǫ Ǭ Ø Ǿ Õ Ṍ Ṏ Ȭ Ɔ ᴏ ᴐ О'],
  ['oe', 'ᴔ œ'],
  ['OE', 'Œ ɶ'],
  ['oi', 'ƣ'],
  ['OI', 'Ƣ'],
  ['oo', 'ꝏ'],
  ['OO', 'Ꝏ'],
  ['ou', 'ȣ'],
  ['OU', 'Ȣ ᴕ'],
  ['p', 'ṕ ṗ ꝓ ƥ ᵱ ᶈ ꝕ ᵽ ꝑ п'],
  ['P', 'Ṕ Ṗ Ꝓ Ƥ Ꝕ Ᵽ Ꝑ ᴘ П'],
  ['q', 'ꝙ ʠ ɋ ꝗ'],
  ['Q', 'Ꝙ Ꝗ'],
  ['r', 'ꞃ ŕ ř ŗ ṙ ṛ ṝ ȑ ɾ ᵳ ȓ ṟ ɼ ᵲ ᶉ ɍ ɽ ɿ ɹ ɻ ɺ ⱹ ᵣ р'],
  ['R', 'Ꞃ Ŕ Ř Ŗ Ṙ Ṛ Ṝ Ȑ Ȓ Ṟ Ɍ Ɽ ʁ ʀ ᴙ ᴚ Р ®'],
  ['s', 'ꞅ ſ ẜ ẛ ẝ ś ṥ š ṧ ş ŝ ș ṡ ṣ ṩ ʂ ᵴ ᶊ ȿ с'],
  ['S', 'Ꞅ Ś Ṥ Š Ṧ Ş Ŝ Ș Ṡ Ṣ Ṩ ꜱ С $'],
  ['sch', 'щ'],
  ['SCH', 'Щ'],
  ['sh', 'ш'],
  ['SH', 'Ш'],
  ['ss', 'ß'],
  ['st', 'ﬆ'],
  ['t', 'ꞇ ť ţ ṱ ț ȶ ẗ ⱦ ṫ ṭ ƭ ṯ ᵵ ƫ ʈ ŧ ʇ т'],
  ['T', 'Ꞇ Ť Ţ Ṱ Ț Ⱦ Ṫ Ṭ Ƭ Ṯ Ʈ Ŧ ᴛ Т'],
  ['th', 'ᵺ'],
  ['ts', 'ц'],
  ['TS', 'Ц'],
  ['tz', 'ꜩ'],
  ['TZ', 'Ꜩ'],
  ['u', 'ᴝ ú ŭ ǔ û ṷ ü ǘ ǚ ǜ ǖ ṳ ụ ű ȕ ù ủ ư ứ ự ừ ử ữ ȗ ū ṻ ų ᶙ ů ũ ṹ ṵ ᵤ у'],
  ['U', 'Ú Ŭ Ǔ Û Ṷ Ü Ǘ Ǚ Ǜ Ǖ Ṳ Ụ Ű Ȕ Ù Ủ Ư Ứ Ự Ừ Ử Ữ Ȗ Ū Ṻ Ų Ů Ũ Ṹ Ṵ ᴜ У'],
  ['ue', 'ᵫ'],
  ['um', 'ꝸ'],
  ['v', 'ʌ ⱴ ꝟ ṿ ʋ ᶌ ⱱ ṽ ᵥ в'],
  ['V', 'Ʌ Ꝟ Ṿ Ʋ Ṽ ᴠ В'],
  ['vy', 'ꝡ'],
  ['VY', 'Ꝡ'],
  ['w', 'ʍ ẃ ŵ ẅ ẇ ẉ ẁ ⱳ ẘ'],
  ['W', 'Ẃ Ŵ Ẅ Ẇ Ẉ Ẁ Ⱳ ᴡ'],
  ['x', 'ẍ ẋ ᶍ ₓ'],
  ['X', 'Ẍ Ẋ'],
  ['y', 'ʎ ý ŷ ÿ ẏ ỵ ỳ ƴ ỷ ỿ ȳ ẙ ɏ ỹ'],
  ['Y', 'Ý Ŷ Ÿ Ẏ Ỵ Ỳ Ƴ Ỷ Ỿ Ȳ Ɏ Ỹ ʏ'],
  ['ya', 'я'],
  ['Ya', 'Я'],
  ['yo', 'ё'],
  ['YO', 'Ё'],
  ['yu', 'ю'],
  ['YU', 'Ю'],
  ['z', 'ź ž ẑ ʑ ⱬ ż ẓ ȥ ẕ ᵶ ᶎ ʐ ƶ ɀ з'],
  ['Z', 'Ź Ž Ẑ Ⱬ Ż Ẓ Ȥ Ẕ Ƶ ᴢ З'],
  ['zh', 'ж'],
  ['ZH', 'Ж'],
]);

const nonAscii = /[^A-Za-z0-9]/g;

export function latinize(text: string): string {
  return text
    .replace(matchRomaji, replaceRomaji)
    .replace(nonAscii, x => characters[x] || x);
}

export function latinize2(name: string): string {
  return latinize(name
    .replace(/[ǫ]/ui, 'q')
    .replace(/[с]/ui, 'c')
    .replace(/[н]|\|-\|/ui, 'h')
    .replace(/[лпий]/ui, 'n'));
}
