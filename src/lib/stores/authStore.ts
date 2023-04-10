import { writable } from "svelte/store";
import { auth } from '$lib/firebase/firebase.client';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';

export const authStore = writable({
  isLoading: true,
  currentUser: null
})

export const authHandlers = {
  login: async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  },
  signup: async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  },
  logout: async () => {
    await signOut(auth)
  },
  resetPassword: async (email: string) => {
    if (!email) { return }
    await sendPasswordResetEmail(auth, email)
  },
  updateEmail: async (email: string) => {
    authStore.update(curr => {
      return {
        ...curr, currentUser: { ...curr.currentUser, email: email }
      }
    })

    await updateEmail(auth.currentUser, email)
  },
  updatePassword: async (password: string) => {
    await updatePassword(auth.currentUser, password)
  }
}
