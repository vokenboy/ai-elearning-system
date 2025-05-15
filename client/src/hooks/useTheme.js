import { useEffect, useState } from "react";

export function useTheme(defaultTheme = "business") {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || defaultTheme;
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme];
}
