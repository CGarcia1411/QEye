import React, { createContext, useContext, useState, useCallback } from 'react';

// ─── Tipos ────────────────────────────────────────────────────────────────────
export type User = {
    id: string;
    name: string;
};

type AuthState =
    | { status: 'unauthenticated' }
    | { status: 'authenticated'; user: User };

type AuthContextValue = {
    authState: AuthState;
    login: (user: User) => void;  
    logout: () => void;
    isAuthenticated: boolean;
};

// ─── Contexto ─────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({ status: 'unauthenticated' });

    const login = useCallback((user: User) => {
        setAuthState({ status: 'authenticated', user });
    }, []);

    const logout = useCallback(() => {
        setAuthState({ status: 'unauthenticated' });
    }, []);

    return (
        <AuthContext.Provider value={{
        authState,
        login,
        logout,
        isAuthenticated: authState.status === 'authenticated',
        }}>
        {children}
        </AuthContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return ctx;
}

// ─── Hook de conveniencia (solo cuando estás seguro que hay sesión) ───────────
export function useUser(): User {
    const { authState } = useAuth();
    if (authState.status !== 'authenticated') throw new Error('No hay usuario autenticado');
    return authState.user;
}