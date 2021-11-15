// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics"; 

import { getFirestore } from "firebase/firestore";

import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { linearProgressClasses } from "@mui/material";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_TOKEN, // set up as env variable

  authDomain: "menu-item-ranker.firebaseapp.com",

  projectId: "menu-item-ranker",

  storageBucket: "menu-item-ranker.appspot.com",

  messagingSenderId: "944731050181",

  appId: "1:944731050181:web:9220b3d7454c1ed54ee0ac",

  measurementId: "G-2E40LL7H6G"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();

export const provider = new GoogleAuthProvider();

export const googleApiKey = process.env.REACT_APP_FIREBASE_TOKEN;