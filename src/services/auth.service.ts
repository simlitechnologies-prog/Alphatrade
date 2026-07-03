/**
 * Auth service — ready to wire to Firebase Authentication.
 * All functions currently return mock responses so the app runs without credentials.
 * Replace each function body with the commented Firebase SDK call to go live.
 */

import type { User, LoginCredentials, RegisterCredentials } from "@/types";

export interface AuthResult {
  success: boolean;
  user?: Partial<User>;
  error?: string;
}

// Sign in with email + password
export async function signIn(credentials: LoginCredentials): Promise<AuthResult> {
  // Firebase:
  // const { signInWithEmailAndPassword } = await import("firebase/auth");
  // const { auth } = await import("@/lib/firebase");
  // const cred = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  // return { success: true, user: mapFirebaseUser(cred.user) };

  await new Promise((r) => setTimeout(r, 600)); // simulate latency
  if (credentials.email && credentials.password.length >= 8) {
    return { success: true, user: { email: credentials.email, displayName: "Kwame Mensah" } };
  }
  return { success: false, error: "Invalid email or password." };
}

// Create account
export async function signUp(credentials: RegisterCredentials): Promise<AuthResult> {
  // Firebase:
  // const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
  // const { auth } = await import("@/lib/firebase");
  // const cred = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
  // await updateProfile(cred.user, { displayName: `${credentials.firstName} ${credentials.lastName}` });
  // return { success: true, user: mapFirebaseUser(cred.user) };

  await new Promise((r) => setTimeout(r, 800));
  return { success: true, user: { email: credentials.email, displayName: `${credentials.firstName} ${credentials.lastName}` } };
}

// Sign out
export async function signOut(): Promise<void> {
  // Firebase:
  // const { signOut: fbSignOut } = await import("firebase/auth");
  // const { auth } = await import("@/lib/firebase");
  // await fbSignOut(auth);

  await new Promise((r) => setTimeout(r, 200));
}

// Send password reset email
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendPasswordReset(_email: string): Promise<AuthResult> {
  // Firebase:
  // const { sendPasswordResetEmail } = await import("firebase/auth");
  // const { auth } = await import("@/lib/firebase");
  // await sendPasswordResetEmail(auth, email);

  await new Promise((r) => setTimeout(r, 500));
  return { success: true };
}

// Send email verification
export async function sendEmailVerification(): Promise<AuthResult> {
  // Firebase:
  // const { sendEmailVerification: fbSend } = await import("firebase/auth");
  // const { auth } = await import("@/lib/firebase");
  // if (!auth.currentUser) return { success: false, error: "Not signed in." };
  // await fbSend(auth.currentUser);

  await new Promise((r) => setTimeout(r, 400));
  return { success: true };
}

// Sign in with Google
export async function signInWithGoogle(): Promise<AuthResult> {
  // Firebase:
  // const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
  // const { auth } = await import("@/lib/firebase");
  // const provider = new GoogleAuthProvider();
  // const cred = await signInWithPopup(auth, provider);
  // return { success: true, user: mapFirebaseUser(cred.user) };

  await new Promise((r) => setTimeout(r, 600));
  return { success: true, user: { email: "user@gmail.com", displayName: "Google User" } };
}

// Update password
export async function updatePassword(currentPassword: string, newPassword: string): Promise<AuthResult> {
  // Firebase:
  // const { EmailAuthProvider, reauthenticateWithCredential, updatePassword: fbUpdate } = await import("firebase/auth");
  // const { auth } = await import("@/lib/firebase");
  // const user = auth.currentUser!;
  // const credential = EmailAuthProvider.credential(user.email!, currentPassword);
  // await reauthenticateWithCredential(user, credential);
  // await fbUpdate(user, newPassword);

  await new Promise((r) => setTimeout(r, 700));
  if (currentPassword.length >= 8 && newPassword.length >= 8) return { success: true };
  return { success: false, error: "Password update failed. Please check your current password." };
}

// Enrol TOTP 2FA (Firebase MFA)
export async function enrolTwoFactor(): Promise<{ success: boolean; qrCodeUrl?: string; secret?: string; error?: string }> {
  // Firebase MFA TOTP enrolment flow (requires Firebase Auth with MFA enabled)
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, qrCodeUrl: "https://placeholder-qr-code.example.com", secret: "JBSWY3DPEHPK3PXP" };
}
