const illuminationKey = (e) => {
  console.log(e)
  const key = document.querySelector(`.${e.code}`);
  if (key === null) {
    return;
  } else {
    (!key.classList.contains('active'))?(key.classList.add('active')):((key.classList.remove('active')))
  }
}

export default illuminationKey;