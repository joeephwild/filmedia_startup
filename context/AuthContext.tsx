import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  createAccount,
  getAccount,
  permanentlyDeleteAccount,
} from "@rly-network/mobile-sdk";
import { Alert } from "react-native";
import {
  User as FirebaseAuthUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  _createWallet,
  _getWalletAddress,
} from "../constants/_helperFunctions";

type Session = string | undefined;

interface DataItem {
  id: string;
  image: string;
  name: string;
  current_price: number;
  symbol: string;
}

type AuthContextValue = {
  session: Session;
  createAnEOA: (name: string, password: string) => Promise<void>;
  permanentlyDeleteAccount: () => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  // Add other values you want to provide through the context here
};

const AuthContext = React.createContext<AuthContextValue>({
  session: undefined,
  createAnEOA: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("createAnEOA function not implemented");
  },
  permanentlyDeleteAccount: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("permanentlyDeleteAccount function not implemented");
  },
  signin: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("Signin function not implemented");
  },
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(session: Session) {
  const segments = useSegments();

  useEffect(() => {
    // const inAuthGroup = segments[0] === "(auth)";
    // if (!session && !inAuthGroup) {
    //   router.replace("/");
    // } else if (session && inAuthGroup) {
    //   router.replace("/(tabs)");
    // }
  }, [session, segments]);
}

type AuthProviderProps = {
  // createUserWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>;
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session>();
  const [user, setUser] = useState<FirebaseAuthUser>();
  const [username, setUsername] = useState<string | null>("");
  console.log("user", session);
  // useProtectedRoute(session);

  const createAnEOA = async (email: string, password: string) => {
    if (session) {
      Alert.alert("You already have an account");
      router.push("/(tabs)");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setUsername(user?.displayName);
      if (user) {
        try {
          const newAccount = await createAccount();
          setSession(newAccount);
        } catch (error) {
          Alert.alert("Error creating a new account");
          console.error(error);
        }
      }
    } catch (error) {
      Alert.alert("Error signing up");
      console.error(error);
    }
  };

  const signin = async (email: string, password: string) => {};

  // useEffect(() => {
  //   const retrieveAccount = async () => {
  //     const account = await getAccount();
  //     setSession(account);
  //     router.push("/(tabs)");
  //   };
  //   retrieveAccount();
  // }, [session]);

  const contextValue: AuthContextValue = {
    session,
    createAnEOA,
    permanentlyDeleteAccount,
    signin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
