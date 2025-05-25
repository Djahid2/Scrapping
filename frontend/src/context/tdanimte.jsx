import { createContext } from "react";

import gsap from "gsap";
export const AnimateTd = createContext(null)
export default function AnimateTdProveider({children}) {
    
    function functionOfAnimateTd(){
        const tdani = gsap.fromTo('td',{
            // scale:0,
            x:40,
            y:40,
            opacity:0,
            ease: "power1.inOut",
            onStart:()=>{
                document.querySelector('.TheMainLoader').classList.add('active')
            }
        },{
            scale:1,
            opacity:1,
            x:0,
            yoyo:true,
            repeat:1,
            y:0,
            stagger:{
                grid:[10,14],
                amount:1,
                from:'end',
                ease:"power3.in"
            },
            onRepeat:()=>{
                // navigate(x)
                console.log('from repeat')
            }
            ,
            onComplete:()=>{
                tdani.reverse()
                console.log(" from complete")
                document.querySelector('.TheMainLoader').classList.remove('active')
            }
        })
    }
    return (
        <AnimateTd.Provider value={{functionOfAnimateTd}}>
            {children}
        </AnimateTd.Provider>
    )
}