import { createContext , useState } from "react";

export const SpanObj = createContext(null)
export default function SpanProvider({children}) {
    const [spanObj , setSpan] = useState(null)
    return (<SpanObj.Provider value={{spanObj , setSpan}}>{children}</SpanObj.Provider>)
}