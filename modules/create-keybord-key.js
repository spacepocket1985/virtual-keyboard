const createKeybordKey = (tagName, className, innerText, insertPlace) => {
  const keybordKey = document.createElement(tagName);
  keybordKey.classList.add('key',className);
  keybordKey.setAttribute('keyCode', className);
  keybordKey.innerText = innerText;
  insertPlace.append(keybordKey);
}

export default createKeybordKey;