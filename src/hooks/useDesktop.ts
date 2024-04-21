import { useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";

function useDesktop() {
    const [desktop, setDesktop] = useState(false);
    useEffect(() => {
        setDesktop(isDesktop);
    }, []);

    return desktop;
}

export { useDesktop };
