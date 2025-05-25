import { createContext , useState } from "react";
export const AniRef = createContext()
export default function AnimateProvider({children}) {
    const [allRefs , setAllRefs] = useState({})
    return (
        <AniRef.Provider value={{allRefs , setAllRefs}}>
            {children}
        </AniRef.Provider>
    )
}