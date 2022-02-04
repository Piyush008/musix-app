var loadScript = (d, s, id, jsSrc, cb, onError) => {
  const element = d.getElementsByTagName(s)[0];
  const fjs = element;
  let js = element;
  js = d.createElement(s);
  js.id = id;
  js.src = jsSrc;
  if (fjs && fjs.parentNode) {
    fjs.parentNode.insertBefore(js, fjs);
  } else {
    d.head.appendChild(js);
  }
  js.onerror = onError;
  js.onload = cb;
};

var removeScript = (d, id) => {
  const element = d.getElementById(id);

  if (element) {
    element.parentNode.removeChild(element);
  }
};

export { loadScript as l, removeScript as r };
