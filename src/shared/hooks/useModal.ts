import { useState } from 'react'

export const useModal = (initialState = false) => {
  const [visible, setVisible] = useState(initialState)

  return {
    visible,
    open: () => setVisible(true),
    close: () => setVisible(false),
    toggle: () => setVisible(!visible),
  }
}
