export function setLang(lang) {
  window.localStorage.setItem('lang', lang);
}

export function getLang() {
  const lsLang = window.localStorage.getItem('lang');
  if (lsLang) {
    return lsLang;
  }
  console.log('No "lang: " field found in local storage. Setting lang: "en".');
  setLang('en');
  return 'en';
}
