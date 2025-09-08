'use client'

import { create } from 'zustand'
// opcional: persistir em sessionStorage/localStorage
// import { persist, createJSONStorage } from 'zustand/middleware'

type QuoteState = {
  selectedPackage: string | undefined
  selectedServices: string[]
  setPackage: (pkg?: string) => void
  toggleService: (service: string) => void
  clearServices: () => void
  setServices: (services: string[]) => void
}

// simples (sem persist). Se quiser persistir, comenta esse e descomenta a versão com persist abaixo.
export const useQuoteStore = create<QuoteState>((set) => ({
  selectedPackage: undefined,
  selectedServices: [],
  setPackage: (pkg) => set({ selectedPackage: pkg }),
  toggleService: (service) =>
    set((state) => ({
      selectedServices: state.selectedServices.includes(service)
        ? state.selectedServices.filter((s) => s !== service)
        : [...state.selectedServices, service],
    })),
  clearServices: () => set({ selectedServices: [] }),
  setServices: (services) => set({ selectedServices: [...services] }),
}))

/* // versão com persist (opcional)
export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      selectedPackage: undefined,
      selectedServices: [],
      setPackage: (pkg) => set({ selectedPackage: pkg }),
      toggleService: (service) =>
        set((state) => ({
          selectedServices: state.selectedServices.includes(service)
            ? state.selectedServices.filter((s) => s !== service)
            : [...state.selectedServices, service],
        })),
      clearServices: () => set({ selectedServices: [] }),
      setServices: (services) => set({ selectedServices: [...services] }),
    }),
    {
      name: 'quote-store-v1',
      storage: createJSONStorage(() => sessionStorage), // ou localStorage
      partialize: (s) => ({
        selectedPackage: s.selectedPackage,
        selectedServices: s.selectedServices,
      }),
    },
  ),
)
*/
