const onElementHeightChange = (element: Element, cb: (newHeight: number) => void) => {
  let lastHeight = element.clientHeight
  let newHeight = 0

  ;(function run() {
    newHeight = element.clientHeight
    if (lastHeight != newHeight) cb(newHeight)
    lastHeight = newHeight

    const onElementHeightChangeTimer = element.getAttribute('onElementHeightChangeTimer')
    if (onElementHeightChangeTimer) clearTimeout(onElementHeightChangeTimer)

    element.setAttribute('onElementHeightChangeTimer', `${setTimeout(run, 1000)}`)
  })()
}

export { onElementHeightChange }
