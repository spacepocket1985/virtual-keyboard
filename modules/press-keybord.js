let keybord = {
  specialKeys: ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'Win', 'AltLeft', 'AltRight', 'ControlRight', 'Space', 'MetaLeft'],
  shiftKeysOnEng: [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '=', '{', '}', '|', ':', '\'', '<', '>', '?'],
  shiftKeysOnRu: [
    'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '=', 'Х', 'Ъ', '/', 'Ж', 'Э', 'Б', 'Ю', ','],
  langRus: [['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь'], ['ё', 'х', 'ъ','\\', 'ж', 'э', 'б', 'ю', '.'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+']],
  langEng: [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'], ['`', '[', ']','\\', ';', '"', ',', '.', '/'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+']],
  getKeysForCaps: () => {
    return document.querySelectorAll('[keyCode^="Key"],[keyCode="Comma"],[keyCode="Period"],[keyCode="Slash"],[keyCode="Backquote"],[keyCode="BracketLeft"],[keyCode="BracketRight"],[keyCode="Semicolon"],[keyCode="Quote"]');
  },
  getkeyboardLetters: () => {
    const keyboardLetters = document.querySelectorAll('[keyCode^="Key"]');
    return keyboardLetters;
  },
  getkeyboardMathSymbols: () => {
    const keyboardDigits = document.querySelectorAll('[keyCode^="Digit"],[keyCode="Minus"],[keyCode="Equal"]');
    return keyboardDigits;
  },
  getkeyboardSymbols: () => {
    const keyboardSymbols = document.querySelectorAll('[keyCode="Backquote"],[keyCode="BracketRight"],[keyCode="BracketLeft"],[keyCode="Backslash"],[keyCode="Semicolon"],[keyCode="Quote"],[keyCode="Comma"],[keyCode="Period"],[keyCode="Slash"]');
    return keyboardSymbols;
  },

  getKeysForShift: () => {
    return document.querySelectorAll('[keyCode="Backquote"], [keyCode^="Digit"], [keyCode^="Minus"],[keyCode^="Equal"],[keyCode="BracketLeft"],[keyCode="BracketRight"],[keyCode="Backslash"],[keyCode="Semicolon"],[keyCode="Quote"],[keyCode="Comma"],[keyCode="Period"],[keyCode="Slash"]');
  },
  caseLanguage: (e) => {
    if (e === 'ru') { keybord.switchLanguage(); }
    if ((e.ctrlKey) && (e.altKey)) {
      keybord.switchLanguage();
    }
  },
  switchLanguage: () => {
    const keyboard = document.querySelector('.keyboard');
    const capsLockey = document.querySelector('.CapsLock');
    const keyboardLetters = keybord.getkeyboardLetters();
    const keyboardSymbols = keybord.getkeyboardSymbols();
    const keyboardMathSymbols = keybord.getkeyboardMathSymbols();

    let lang = (keyboard.classList.contains('lang-eng')) ? ('langRus') : ('langEng');
    for (let i = 0; i < keyboardLetters.length; i++) {
      keyboardLetters[i].innerText = (capsLockey.classList.contains('active-special-key')) ? (keybord[lang][0][i].toUpperCase()) : (keybord[lang][0][i].toLowerCase());
    }
    for (let i = 0; i < keyboardSymbols.length; i++) {
      keyboardSymbols[i].innerText = (capsLockey.classList.contains('active-special-key')) ? (keybord[lang][1][i].toUpperCase()) : (keybord[lang][1][i].toLowerCase());
    }
    for (let i = 0; i < keyboardMathSymbols.length; i++) {
      keyboardMathSymbols[i].innerText = keybord[lang][2][i];
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
  },
  pressKeybordKey: (e) => {
    const key = document.querySelector(`.${e.code}`);
    if (key === null) { return; } else {
      (key.classList.add('active'));
    }
  },
  releaseKeybordKey: (e) => {
    const key = (e.type == 'keyup')?(document.querySelector(`.${e.code}`)):(e);
    if (key === null) { return; } else {
      key.classList.remove('active');
    }
    if (key.classList.contains('ShiftLeft')||key.classList.contains('ShiftRight')) {
      keybord.switchLanguage();
      keybord.switchLanguage();
    }
  },
  printKeybordKey: (e) => {
    const key = (e.type == 'keydown')?(document.querySelector(`.${e.code}`)):(e);
    const monitor = document.querySelector('.monitor');
    const keysForCaps = keybord.getKeysForCaps();
    const capsLockey = document.querySelector('.CapsLock');
    const keyboard = document.querySelector('.keyboard');
    if (!monitor.onfocus) { monitor.focus(); }
    if (key === null) {
      return;
    } else {
      let posStart = monitor.selectionStart;
      let posEnd = monitor.selectionEnd;
      if (!keybord.specialKeys.includes(key.getAttribute('keyCode'))) {
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
        monitor.textContent = monitor.textContent.slice(0, posStart) + '    ' + monitor.textContent.slice(posStart);
        monitor.selectionStart = posStart + 4;
      }

      if (key.classList.contains('Enter')) {
        monitor.textContent = monitor.textContent.slice(0, posStart) + '\n' + monitor.textContent.slice(posStart);
        monitor.selectionStart = posStart + 1;
      }

      if (key.classList.contains('Space')) {
        monitor.textContent = monitor.textContent.slice(0, posStart) + ' ' + monitor.textContent.slice(posStart);
        monitor.selectionStart = posStart + 1;
      }

      if (key.classList.contains('CapsLock')) {
        capsLockey.classList.toggle('active-special-key');
        keysForCaps.forEach(key => {
          capsLockey.classList.contains('active-special-key') ? (key.textContent = key.textContent.toUpperCase()) : (key.textContent = key.textContent.toLowerCase());
        });
      }
      if (key.classList.contains('ShiftLeft')||key.classList.contains('ShiftRight')) {
        const keysForShift = keybord.getKeysForShift();
        for (let i = 0; i < keysForCaps.length; i++) {
          keysForCaps[i].textContent = (capsLockey.classList.contains('active-special-key')) ? (keysForCaps[i].textContent.toLowerCase()) : (keysForCaps[i].textContent.toUpperCase());
        }
        let lang = (keyboard.classList.contains('lang-eng')) ? ('shiftKeysOnEng') : ('shiftKeysOnRu');
        for (let i = 0; i < keysForShift.length; i++) {
          keysForShift[i].innerText = (capsLockey.classList.contains('active-special-key')) ? (keybord[lang][i].toLowerCase()) : (keybord[lang][i].toUpperCase());
        }
      }
    }
  }
};
export const pressKeybordKey = keybord.pressKeybordKey;
export const releaseKeybordKey = keybord.releaseKeybordKey;
export const printKeybordKey = keybord.printKeybordKey;
export const caseLanguage = keybord.caseLanguage;