import { useRouter } from "next/router";
import { SignUpData } from "../entities/user";
export interface AuthService {
    logout: () => void;
}

export const signUp = async (formData: SignUpData): Promise<any> => {
    const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    return response.json();
};

export async function signIn(credentials: { email: string; password: string }) {
    try {
        const response = await fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true, user: result.user };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        console.error("Error during signIn:", error);
        return { success: false, error: "Internal Server Error" };
    }
}

export const logoutAuthService = (): AuthService => {
    const router = useRouter();
    const logout = (): void => {
        localStorage.removeItem("userToken");
        router.replace("/signin");
    };

    return { logout };
};
