export type MainContextType = {
    userProfile: any;
    handleLogin: (email: string, password: string) => void;
    handleGoogleLogin: () => void;
};

export type AuthContextType = {
    user: any,
    setUser: any,
    login: (email, password) => Promise<void>,
    register: (email, password, userData) => Promise<void>,
    updateUser: (userData) => Promise<void>,
    logout: () => Promise<void>,
}