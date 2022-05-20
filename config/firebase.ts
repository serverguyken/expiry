import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc, onSnapshot, orderBy, query, collection, setDoc, getDocs, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Product, User } from '../interface/User';
import store from '../store';
interface FirebaseConfig {
    apiKey: string | undefined;
    authDomain: string | undefined;
    databaseURL: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
    measurementId: string | undefined;
}

const firebaseConfig: FirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(firebaseApp);
export const db = getFirestore();
export const storage = getStorage(firebaseApp);
export const OnAuthStateChanged = (callback: (user: any) => void) => {
    onAuthStateChanged(auth, (user: any) => {
        callback(user);
    });
};
export const collectionRef = (name: string) => collection(db, name);
export const docRef = (name: string, id: string) => doc(db, name, id);
export const GetDocs = async (collection: any) => await getDocs(collection);
export const GetDoc = async (collection: any) => await getDoc(collection);
export const SetDoc = async (collection: any, data: any) => await setDoc(collection, data);
export const AddDoc = async (collection: any, data: any) => await addDoc(collection, data);
export const UpdateDoc = async (collection: any, data: any) => await updateDoc(collection, data);
export const DeleteDoc = async (collection: any) => await deleteDoc(collection);
export const createDocRef = (name: string, id: string) => {
    return docRef(name, id)
}
export const createCollectionRef = (name: string) => {
    return collectionRef(name)
}
export const createUserAuth = (email: string, password: string, onSuccess: (userData: any) => void, onError: (error: string) => void) => {
    createUserWithEmailAndPassword(auth, email, password).then((userData) => onSuccess(userData)).catch((error: any) => onError(error))
}
export const logInUserAuth = (email: string, password: string, onSuccess: (userData: any) => void, onError: (error: string) => void) => {
    signInWithEmailAndPassword(auth, email, password).then((userData) => onSuccess(userData)).catch((error: any) => onError(error))
}

export const signOutUserAuth = () => {
    auth.signOut()
}
export const addUser = (uid: string, data: { email: string }, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const ref = createDocRef("users", uid)
    SetDoc(ref, data).then((data: any) => onSuccess(data)).catch((error: any) => onError(error))
}
export const productsCollection = collectionRef('products');

export const getUserData = async (uid: string) => {
    const ref = createDocRef("users", uid)
    const user = await (await getDoc(ref)).data()
    return user
}

export const getUserProducts = async (uid: string) => {
    if (uid === '') []
    const ref = createCollectionRef(`users/${uid}/products`)
    let products: any = []

    return new Promise((resolve) => {
        onSnapshot(ref, (data) => {
            data.forEach((docs: any) => {
                products.push(docs.data())
            })
            resolve(products)
        })
    })
}

export const addUserProduct = async (uid: string, product: Product) => {
    if (uid == '')`cannot add product ${product.name}`
    const ref = createDocRef(`users/${uid}/products`, product.id)
    SetDoc(ref, product).then(() => {
        return `successfully added product ${product.name}`}).catch(() => `cannot add product ${product.name}`)
}
export const deleteUserProduct = async (uid: string, id: string) => {
    if (uid == '')`cannot delete product`
    const ref = createDocRef(`users/${uid}/products`, id)
    DeleteDoc(ref)
}



const p = [{
    id: "",
    item: "sugar",
    expires: "",
    purchased: ""
}]