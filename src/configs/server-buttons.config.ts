import { closeServerModal, openServerModal } from '@/components/ui/server-modal'

type TServerButtonConfig = {
  selector: string
  onClick: (event: Event) => void
  onAssign?: (element: Element) => void
}

const howItWorksButtonConfig: TServerButtonConfig = {
  selector: '#how-it-works',
  onClick: () => {
    openServerModal('how-it-works-modal')
  },
}

const howItWorksModalCofig: TServerButtonConfig = {
  selector: '#how-it-works-modal',
  onClick: (e) => {
    closeServerModal(e, 'how-it-works-modal')
  },
}

const SERVER_BUTTONS_CONFIG: TServerButtonConfig[] = [howItWorksButtonConfig, howItWorksModalCofig]

export { SERVER_BUTTONS_CONFIG }
