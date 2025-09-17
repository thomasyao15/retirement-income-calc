import { create } from 'zustand'

interface PersonalInfo {
  age?: number
  retirementYears?: number
  superBalance?: number
  relationshipStatus?: string
}

interface Assets {
  ownsStocks?: boolean
  stockValue?: number
  stockDividends?: number
  ownsProperty?: boolean
  propertyValue?: number
}

interface PensionData {
  homeOwnership?: string
  otherAssets?: number
  incomeStreams?: number
}

interface Calculations {
  estimatedPension?: number
  recommendedPreMix?: string
  projectedIncome?: number
}

interface CalculatorState {
  // User data
  personalInfo: PersonalInfo
  assets: Assets
  pensionData: PensionData

  // Calculated results
  calculations: Calculations

  // Navigation state
  currentSection: 'personal' | 'pension' | 'results'
  completedSteps: string[]

  // Actions
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void
  updateAssets: (data: Partial<Assets>) => void
  updatePensionData: (data: Partial<PensionData>) => void
  setCalculations: (data: Partial<Calculations>) => void
  markStepComplete: (stepId: string) => void
  setCurrentSection: (section: 'personal' | 'pension' | 'results') => void

  // Helper to get all data for calculations
  getAllData: () => {
    personalInfo: PersonalInfo
    assets: Assets
    pensionData: PensionData
  }

  // Reset store
  resetCalculator: () => void
}

const initialState = {
  personalInfo: {},
  assets: {},
  pensionData: {},
  calculations: {},
  currentSection: 'personal' as const,
  completedSteps: []
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  ...initialState,

  updatePersonalInfo: (data) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...data }
    })),

  updateAssets: (data) =>
    set((state) => ({
      assets: { ...state.assets, ...data }
    })),

  updatePensionData: (data) =>
    set((state) => ({
      pensionData: { ...state.pensionData, ...data }
    })),

  setCalculations: (data) =>
    set((state) => ({
      calculations: { ...state.calculations, ...data }
    })),

  markStepComplete: (stepId) =>
    set((state) => ({
      completedSteps: [...new Set([...state.completedSteps, stepId])]
    })),

  setCurrentSection: (section) =>
    set({ currentSection: section }),

  getAllData: () => {
    const state = get()
    return {
      personalInfo: state.personalInfo,
      assets: state.assets,
      pensionData: state.pensionData
    }
  },

  resetCalculator: () => set(initialState)
}))