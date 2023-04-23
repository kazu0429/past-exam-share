import { createContext, useState } from "react";
import { User } from "@/types/User";

// コンテクスト用の型を定義
type UserContextType = User | null | undefined;

const AuthContext = createContext<UserContextType>(undefined);

export const AuthProvider = () => {
    const [user, setUser] = useState<UserContextType>(undefined);
}