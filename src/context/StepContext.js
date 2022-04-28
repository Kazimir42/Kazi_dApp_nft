import React, {useContext} from 'react'

const StepContext = React.createContext()

export function StepProvider({children, value}) {
    return (
        <StepContext.Provider value={value}>
            {children}
        </StepContext.Provider>
    )
}

export function useStepValue(){
    return useContext(StepContext)
}