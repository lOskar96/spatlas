import { create } from 'zustand'

export type ToastType = 'error' | 'success' | 'info'

interface ToastState {
  visible: boolean
  message: string
  type: ToastType
  showToast: (message: string, type?: ToastType) => void
  hideToast: () => void
}

export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  message: '',
  type: 'info',
  showToast: (message: string, type: ToastType = 'error') => {
    set({ visible: true, message, type })
  },
  hideToast: () => {
    set({ visible: false })
  },
}))
