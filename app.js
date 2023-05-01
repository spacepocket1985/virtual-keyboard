import createNewElement from './modules/create-new-element.js';
import createKeybordKey from './modules/create-keybord-key.js';
import { caseLanguage, pressKeybordKey, releaseKeybordKey, printKeybordKey } from './modules/press-keybord.js';

const getLocalStorage = () => {

  if (localStorage.getItem('langRu')) {
    caseLanguage('ru');
  }
};
window.addEventListener('load', getLocalStorage);

const descriptionText = 'Клавиатура создана в операционной системе Windows';
const languageText = 'Для переключения языка комбинация: левыe ctrl + alt';

const wrapper = createNewElement('div', 'wrapper');
document.body.append(wrapper);

const title = createNewElement('h1', 'title', 'RSS ВИРТУАЛЬНАЯ КЛАВИАТУРА');
wrapper.append(title);

const monitor = createNewElement('textarea', 'monitor');
wrapper.append(monitor);

const keyboard = createNewElement('div', 'keyboard');
keyboard.classList.add('lang-eng');
wrapper.append(keyboard);

const description = createNewElement('p', 'description', descriptionText);
wrapper.append(description);

const language = createNewElement('p', 'language', languageText);
wrapper.append(language);

const keyboardSymbol = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BackSpace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['Capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl']
];

const keyEventCode = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']
];

for (let i = 0; i < 5; i++) {
  let keyboardLine = createNewElement('div', 'keyboard-line');
  keyboard.append(keyboardLine);
  for (let j = 0; j < keyboardSymbol[i].length; j++) {
    createKeybordKey('div', keyEventCode[i][j], keyboardSymbol[i][j], keyboardLine);
  }
}

document.addEventListener('keydown', (e) => {
  caseLanguage(e);
  pressKeybordKey(e);
  printKeybordKey(e);
  e.preventDefault();
});
document.addEventListener('keyup', releaseKeybordKey);

keyboard.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('key'))
   {printKeybordKey(e.target);}
  });

  keyboard.addEventListener('mouseup', (e) => {
    releaseKeybordKey(e.target);
   });

keyboard.onmousedown = (e) => {
  if(document.activeElement === monitor) {
      e.preventDefault();
  }
};
