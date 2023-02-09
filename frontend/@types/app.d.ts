export type MainContextType = {
    userProfile: any;
    handleLogin: (email: string, password: string) => void;
    handleGoogleLogin: () => void;
};