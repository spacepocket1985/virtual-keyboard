let keybord = {
  specialKeys: ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'Win', 'AltLeft', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight', 'Space', 'MetaLeft'],
  shiftKeysOffEng: [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', '\\', ';', '"', ',', '.', '/'],
  shiftKeysOnEng: [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', "'", '<', '>', '?'],
  shiftKeysOffRu: [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'х', 'ъ', '\\', 'ж', 'э', 'б', 'ю', '.'],
  shiftKeysOnRu: [
    'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Х', 'Ъ', '/', 'Ж', 'Э', 'Б', 'Ю', ','],
  langRus: [["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "я", "ч", "с", "м", "и", "т", "ь"], ['ё', 'х', 'ъ', 'ж', 'э', 'б', 'ю', '.']],
  langEng: [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'], ['`', '[', ']', ';', '\'', ',', '.', '/']],
  getKeysForCaps: () => {
    return document.querySelectorAll('[keyCode^="Key"],[keyCode="Comma"],[keyCode="Period"],[keyCode="Slash"],[keyCode="Backquote"],[keyCode="BracketLeft"],[keyCode="BracketRight"],[keyCode="Semicolon"],[keyCode="Quote"]');
  },
  getKeysForShift: () => {
    return document.querySelectorAll('[keyCode="Backquote"], [keyCode^="Digit"], [keyCode^="Minus"],[keyCode^="Equal"],[keyCode="BracketLeft"],[keyCode="BracketRight"],[keyCode="Backslash"],[keyCode="Semicolon"],[keyCode="Quote"],[keyCode="Comma"],[keyCode="Period"],[keyCode="Slash"]');
  },
  caseLanguage: (e) => {
    const keyboard = document.querySelector('.keyboard');
    const keyboardLetters = document.querySelectorAll('[keyCode^="Key"]');
    const keyboardSymbols = document.querySelectorAll('[keyCode="Backquote"],[keyCode="BracketRight"],[keyCode="BracketLeft"],[keyCode="Semicolon"],[keyCode="Quote"],[keyCode="Comma"],[keyCode="Period"],[keyCode="Slash"]');
    const switchLanguage = () => {
      let lang = (keyboard.classList.contains('lang-eng')) ? ('langRus') : ('langEng')
      for (let i = 0; i < keyboardLetters.length; i++) {
        keyboardLetters[i].innerText = keybord[lang][0][i];
      }
      for (let i = 0; i < keyboardSymbols.length; i++) {
        keyboardSymbols[i].innerText = keybord[lang][1][i];
      }
      if (lang == 'langRus') {
        keyboard.classList.add('lang-rus');
        keyboard.classList.remove('lang-eng');
        localStorage.setItem('langRu', true);
        localStorage.removeItem('langEng');
      }
      else {
        keyboard.classList.add('lang-eng');
        keyboard.classList.remove('lang-rus');
        localStorage.setItem('langEng', true);
        localStorage.removeItem('langRu');
      }
    }
    if (e === 'ru') { switchLanguage() }
    if ((e.ctrlKey) && (e.altKey)) {
      switchLanguage();
    }
  },
  pressKeybordKey: (e) => {
    const key = document.querySelector(`.${e.code}`);
    if (key === null) { return } else {
      (key.classList.add('active'));
    }
  },
  releaseKeybordKey: (e) => {

    const key = document.querySelector(`.${e.code}`);
    if (key === null) { return } else {
      key.classList.remove('active')
    }
    if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
      const keyboard = document.querySelector('.keyboard');
      const capsLockey = document.querySelector('.CapsLock');
      const keysForCaps = keybord.getKeysForCaps();
      const keysForShift = keybord.getKeysForShift();
      for (let i = 0; i < keysForCaps.length; i++) {
        (keysForCaps[i].textContent === keysForCaps[i].textContent.toUpperCase()) ? (keysForCaps[i].textContent = keysForCaps[i].textContent.toLowerCase()) : (keysForCaps[i].textContent = keysForCaps[i].textContent.toUpperCase())
      }
      let lang = (keyboard.classList.contains('lang-eng')) ? ('shiftKeysOffEng') : ('shiftKeysOffRu')
      for (let i = 0; i < keysForShift.length; i++) {
        keysForShift[i].innerText = (capsLockey.classList.contains('active-special-key')) ? (keybord[lang][i].textContent.toLowerCase()):(keybord[lang][i].textContent.toUpperCase())
      }
    }
  },
  printKeybordKey: (e) => {
    const key = document.querySelector(`.${e.code}`);
    const monitor = document.querySelector('.monitor');
    const keybordKeys = document.querySelectorAll('.key');
    const keysForCaps = keybord.getKeysForCaps();
    const capsLockey = document.querySelector('.CapsLock');
    const keyboard = document.querySelector('.keyboard');

    if (!monitor.onfocus) { monitor.focus() }
    let posStart = monitor.selectionStart;
    let posEnd = monitor.selectionEnd;
    if (!keybord.specialKeys.includes(e.code)) {
      monitor.textContent += key.textContent;
      monitor.selectionStart = posStart + 1;
    }

    if (key.classList.contains('Delete')) {
      if (posStart === posEnd) {
        monitor.textContent = monitor.textContent.slice(0, posStart) + monitor.textContent.slice(posEnd + 1);
        monitor.selectionStart = posEnd;
      } else {
        monitor.textContent = monitor.textContent.slice(0, posStart) + monitor.textContent.slice(posEnd);
        monitor.selectionStart = posStart;
      }
    }

    if (key.classList.contains('Backspace')) {
      if (posStart === posEnd) {
        monitor.textContent = monitor.textContent.slice(0, posStart - 1) + monitor.textContent.slice(posEnd);
        monitor.selectionStart = posStart - 1;
      } else {
        monitor.textContent = monitor.textContent.slice(0, posStart) + monitor.textContent.slice(posEnd);
        monitor.selectionStart = posStart;
      }
    }

    if (key.classList.contains('Tab')) {
      monitor.textContent = monitor.textContent.slice(0, posStart) + "    " + monitor.textContent.slice(posStart);
      monitor.selectionStart = posStart + 4;
    }

    if (key.classList.contains('Enter')) {
      monitor.textContent = monitor.textContent.slice(0, posStart) + "\n" + monitor.textContent.slice(posStart);
      monitor.selectionStart = posStart + 1;
      console.log(monitor.cols)
    }

    if (key.classList.contains('Space')) {
      monitor.textContent = monitor.textContent.slice(0, posStart) + " " + monitor.textContent.slice(posStart);
      monitor.selectionStart = posStart + 1;
    }

    if (key.classList.contains('ArrowDown')) {
      console.log(monitor.selectionStart, monitor.selectionEnd);

    }

    if (key.classList.contains('ArrowLeft')) {
      monitor.selectionStart--;
      monitor.selectionEnd = posEnd - 1;
    }

    if (key.classList.contains('ArrowRight')) {
      monitor.selectionEnd++;
      monitor.selectionStart = posStart + 1;
    }

    if (e.shiftKey && e.key === 'ArrowLeft') {
      monitor.selectionEnd = monitor.selectionEnd + 1;
    }

    if (e.shiftKey && e.key === 'ArrowRight') {
      monitor.selectionStart = monitor.selectionStart - 1;
    }

    if (e.key === 'CapsLock') {
      capsLockey.classList.toggle('active-special-key')
      keysForCaps.forEach(key => {
        capsLockey.classList.contains('active-special-key') ? (key.textContent = key.textContent.toUpperCase()) : (key.textContent = key.textContent.toLowerCase())
      })
    }
    if (e.shiftKey) {
      const keysForShift = keybord.getKeysForShift();
      for (let i = 0; i < keysForCaps.length; i++) {
        keysForCaps[i].textContent = (capsLockey.classList.contains('active-special-key')) ? (keysForCaps[i].textContent.toLowerCase()):(keysForCaps[i].textContent.toUpperCase())
      }
      let lang = (keyboard.classList.contains('lang-eng')) ? ('shiftKeysOnEng') : ('shiftKeysOnRu')
      for (let i = 0; i < keysForShift.length; i++) {
        keysForShift[i].innerText = (capsLockey.classList.contains('active-special-key')) ? (keybord[lang][i].textContent.toLowerCase()):(keybord[lang][i].textContent.toUpperCase())
      }


    }
  }

}
export const pressKeybordKey = keybord.pressKeybordKey;
export const releaseKeybordKey = keybord.releaseKeybordKey;
export const printKeybordKey = keybord.printKeybordKey;
export const caseLanguage = keybord.caseLanguage;