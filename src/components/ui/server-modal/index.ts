export { ServerModal } from './server-modal'

const openServerModal = (id: string) => {
  const modal = document.querySelector(`#${id}`)
  if (!modal || modal.classList.contains('open')) {
    return
  }
  modal.classList.add('open')
}

const closeServerModal = (e: Event, id: string) => {
  const target = e.target as HTMLElement
  if ([id, `close-modal-${id}`].includes(target.id) || target.closest(`#close-modal-${id}`)) {
    document.querySelector(`#${id}`)?.classList.remove('open')
  }
}

export { openServerModal, closeServerModal }
