import { transliterate } from 'transliteration';
import 'persianjs';

export default function finglishToPersian(finglishText: string): string {
  const persianMap = {
    a: 'ا',
    b: 'ب',
    c: 'ک',
    d: 'د',
    e: 'ه',
    f: 'ف',
    g: 'گ',
    h: 'ح',
    i: 'ی',
    j: 'ج',
    k: 'ک',
    l: 'ل',
    m: 'م',
    n: 'ن',
    o: 'و',
    p: 'پ',
    q: 'ق',
    r: 'ر',
    s: 'س',
    t: 'ت',
    u: 'یو',
    v: 'و',
    w: 'و',
    x: 'کس',
    y: 'ی',
    z: 'ز',
  };

  let persianText = '';

  for (let i = 0; i < finglishText.length; i++) {
    const character = finglishText.charAt(i);
    const persianCharacter = persianMap[character.toLowerCase()] || character;
    persianText += persianCharacter;
  }

  // const persianText = transliterate(finglishText, { unknown: '_' });

  // const persianText = PersianJs(finglishText).arabicChar().toString();

  return persianText;
}
