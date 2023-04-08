import { writable } from "svelte/store";
import { auth } from '$lib/firebase/firebase.client';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateEmail, updatePassword } from 'firebase/auth';

export const authStore = writable({
  isLoading: true,
  currentUser: null
})

export const authHandlers = {
  signup: async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  },
  logout: async () => {
    await signOut(auth)
  },
  resetPassword: async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  },
  updateEmail: async (email: string) => {
    await updateEmail(auth.currentUser, email)
  },
  updatePassword: async (password: string) => {
    await updatePassword(auth.currentUser, password)
  }
}
