let keybord = {
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
  },
  specialKeys: ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'Win', 'AltLeft', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight', 'Space'],

  printKeybordKey: (e) => {
    const key = document.querySelector(`.${e.code}`);
    const monitor = document.querySelector('.monitor');

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
    }

    if (key.classList.contains('Space')) {
      monitor.textContent = monitor.textContent.slice(0, posStart) + " " + monitor.textContent.slice(posStart);
      monitor.selectionStart = posStart + 1;
    }

    if (key.classList.contains('ArrowLeft')) {
      monitor.selectionStart--;
      monitor.selectionEnd = posEnd - 1;
    }

    if (key.classList.contains('ArrowRight')) {
      monitor.selectionEnd++;
      monitor.selectionStart = posStart - 1;
    }

    if (e.shiftKey && e.key == 'ArrowLeft') {
      monitor.selectionEnd = monitor.selectionEnd + 1;
    }

    if (e.shiftKey && e.key == 'ArrowRight') {
      monitor.selectionStart = monitor.selectionStart + 1;
    }

  }

}
export const pressKeybordKey = keybord.pressKeybordKey;
export const releaseKeybordKey = keybord.releaseKeybordKey;
export const printKeybordKey = keybord.printKeybordKey;