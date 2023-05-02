const createNewElement = (tagName, className, innerText) => {
  const text = (innerText) || ('');
  const element = document.createElement(tagName);
  element.classList.add(className);
  element.innerText = text;
  return element;
};

export default createNewElement;
