import { create } from 'zustand'

export enum toolComponents {
    home,
    nikki, 
    fgo 
}

type ToolsTargetStoreType= {
    currentComponent: toolComponents
    updateComponent: (newTarget: toolComponents) => void,
    
}

export const useToolstargetStore = create<ToolsTargetStoreType>((set) => ({
    currentComponent:toolComponents.home,
    updateComponent:(newTarget: toolComponents) => set(() => ({currentComponent: newTarget}))
}))
