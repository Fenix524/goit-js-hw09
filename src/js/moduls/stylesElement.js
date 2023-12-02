function disableElementList(button, ...buttons) {
  buttons.forEach((el) => {
    disableElement(el, false)
  })
  disableElement(button, true)
}

function disableElement(button, status = true) {
  button.disabled = status;
}

export const disableEl = {disableElement, disableElementList}