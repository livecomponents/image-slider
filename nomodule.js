(function (window) {
  // initialization on core look and feel for IE11 and crappy browsers
  if (typeof window === 'undefined'){ return; }
  let hasInitiialized = false;
  if (!hasInitiialized) {
    var styles = document.createElement('style');    
    styles.innerHTML =
      'image-slider { display: flex; align-items: center; overflow: hidden; };'
      + 'image-slider img { max-width: 100%; height: 50%; width: 50%; }'
    document.getElementsByTagName('head')[0].appendChild(styles);
    hasInitiialized = true;
  }
})(window);
