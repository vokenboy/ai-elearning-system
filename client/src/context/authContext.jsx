import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(() => {
        return localStorage.getItem("jwt") !== null;
    });

    const [user, setUser] = useState(() => {
        const userString = localStorage.getItem("user");
        return userString ? JSON.parse(userString) : null;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);

        const handleStorageChange = (e) => {
            if (e.key === "jwt") {
                setAuthenticated(localStorage.getItem("jwt") !== null);
                if (localStorage.getItem("jwt") === null) {
                    setUser(null);
                } else {
                    const userString = localStorage.getItem("user");
                    if (userString) {
                        setUser(JSON.parse(userString));
                    }
                }
            }

            if (e.key === "user") {
                const userString = localStorage.getItem("user");
                setUser(userString ? JSON.parse(userString) : null);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        setAuthenticated(false);
        setUser(null);
    };

    const updateAuthenticated = (status) => {
        setAuthenticated(status);
        if (status === false && localStorage.getItem("jwt")) {
            localStorage.removeItem("jwt");
        }
    };

    const updateUser = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
        } else {
            localStorage.removeItem("user");
        }
    };

    const value = {
        authenticated,
        user,
        loading,
        logout,
        setAuthenticated: updateAuthenticated,
        setUser: updateUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
