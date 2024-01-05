import { SignUpData } from "../entities/user";

export interface AuthService {
  authenticate(username: string, password: string): Promise<SignUpData | null>;
}