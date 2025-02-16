import React, { PropsWithChildren } from "react";

export const ThemeContext = React.createContext({ isDark: false, setIsDark: (p: boolean) => { } });

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    );
};