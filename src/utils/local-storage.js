export function setLang(lang) {
  window.localStorage.setItem('lang', lang);
}

export function getLang() {
  const lsLang = window.localStorage.getItem('lang');
  if (lsLang) {
    return lsLang;
  }
  setLang('en');
  return 'en';
}
