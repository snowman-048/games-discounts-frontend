const isClientRequest = () => {
  let isClientRequest = false
  try {
    isClientRequest = !!window
  } catch (err) {
    isClientRequest = false
  }
  return isClientRequest
}

export { isClientRequest }
