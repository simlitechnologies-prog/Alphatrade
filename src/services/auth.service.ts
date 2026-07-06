import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  User,
  AuthError,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase/config";

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  country: string;
  agreedToTerms: boolean;
  agreedToRisk: boolean;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}

// Sign up with email and password
export async function signUp(
  values: RegisterFormValues,
): Promise<AuthResponse> {
  try {
    const { email, password, firstName, lastName, phoneNumber, country } =
      values;

    console.log("🔵 Attempting sign up for:", email);

    // Set persistence based on remember me (default to local)
    await setPersistence(auth, browserLocalPersistence);

    // Create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    console.log("✅ User created:", user.uid);

    // Update profile with display name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    // Send email verification
    await sendEmailVerification(user);

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      phoneNumber: phoneNumber || "",
      country,
      emailVerified: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      role: "user",
      isActive: true,
    });

    console.log("✅ User data saved to Firestore");

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("❌ Sign up error:", error);
    const authError = error as AuthError;
    return {
      success: false,
      error: getAuthErrorMessage(authError.code),
    };
  }
}

// Sign in with email and password
export async function signIn(values: LoginFormValues): Promise<AuthResponse> {
  try {
    const { email, password, rememberMe } = values;

    console.log("🔵 Attempting sign in for:", email);

    // Set persistence based on remember me
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence,
    );

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    console.log("✅ Sign in successful for:", user.email);
    console.log("✅ User UID:", user.uid);
    console.log("✅ Email verified:", user.emailVerified);

    // Update last login in Firestore
    await setDoc(
      doc(db, "users", user.uid),
      { lastLogin: serverTimestamp() },
      { merge: true },
    );

    console.log("✅ Last login updated in Firestore");

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("❌ Sign in error:", error);
    const authError = error as AuthError;
    return {
      success: false,
      error: getAuthErrorMessage(authError.code),
    };
  }
}

// Sign in with Google
export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    console.log("🔵 Attempting Google sign in");

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log("✅ Google sign in successful for:", user.email);

    // Check if user exists in Firestore, if not create profile
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      console.log("📝 Creating new user profile in Firestore");
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        role: "user",
        isActive: true,
      });
    } else {
      // Update last login
      await setDoc(
        doc(db, "users", user.uid),
        { lastLogin: serverTimestamp() },
        { merge: true },
      );
    }

    console.log("✅ User profile saved/updated");

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("❌ Google sign in error:", error);
    const authError = error as AuthError;
    return {
      success: false,
      error: getAuthErrorMessage(authError.code),
    };
  }
}

// Sign out
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
    console.log("✅ Sign out successful");
  } catch (error) {
    console.error("❌ Sign out error:", error);
    throw error;
  }
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!auth.currentUser;
}

// Helper function to get user-friendly error messages
function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use":
      "This email is already registered. Please log in or use a different email.",
    "auth/invalid-email": "Invalid email address. Please check and try again.",
    "auth/operation-not-allowed":
      "Email/password accounts are not enabled. Please contact support.",
    "auth/weak-password":
      "Password is too weak. Please use at least 8 characters with a mix of letters, numbers, and symbols.",
    "auth/user-disabled":
      "This account has been disabled. Please contact support.",
    "auth/user-not-found":
      "No account found with this email address. Please sign up first.",
    "auth/wrong-password":
      "Incorrect password. Please try again or reset your password.",
    "auth/too-many-requests":
      "Too many failed login attempts. Please try again later or reset your password.",
    "auth/network-request-failed":
      "Network error. Please check your internet connection and try again.",
    "auth/popup-closed-by-user": "Sign in was cancelled. Please try again.",
    "auth/cancelled-popup-request":
      "Another popup is already open. Please close it and try again.",
    "auth/popup-blocked":
      "Pop-up was blocked by your browser. Please allow pop-ups for this site.",
    "auth/requires-recent-login":
      "This operation requires recent authentication. Please sign in again.",
    "auth/account-exists-with-different-credential":
      "An account with this email already exists. Please sign in with your password instead.",
    "auth/invalid-credential": "Invalid email or password. Please try again.",
  };

  return (
    errorMessages[errorCode] ||
    "An unexpected error occurred. Please try again."
  );
}
