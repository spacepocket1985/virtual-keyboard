const createNewElement=(tagName, className,innerText)=>{
  innerText =  (innerText)?(innerText):('');
  const element = document.createElement(tagName);
  element.classList.add(className);
  element.innerText = innerText;
return element
}

export default createNewElement;