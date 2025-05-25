import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Span() {
    const spanMouse = useRef();

    useLayoutEffect(() => {
        const handleMouseMove = (e) => {
            if (spanMouse.current) {
                const { clientX, clientY } = e;
                gsap.to(spanMouse.current, {
                    x: clientX,
                    y: clientY - 70,
                    duration: 1,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    ease: "power2.out",
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <span ref={spanMouse} className="curflow"></span>;
}
