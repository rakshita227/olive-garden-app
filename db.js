import { db } from './firebase.js';
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Each browser session gets a unique cart ID persisted in localStorage
const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
localStorage.setItem('sessionId', sessionId);
const cartRef = doc(db, 'carts', sessionId);

// On page load, pull the saved cart from Firestore and re-render
async function loadCartFromFirestore() {
    const snap = await getDoc(cartRef);
    if (snap.exists()) {
        const items = snap.data().items || [];
        if (items.length > 0) {
            window.cart = items;
            localStorage.setItem('cart', JSON.stringify(items));
            if (typeof renderCart === 'function') renderCart();
            if (typeof updateCartCount === 'function') updateCartCount();
        }
    }
}

// Called after every cart mutation in script.js
window.syncCartToFirestore = async function () {
    await setDoc(cartRef, { items: window.cart, updatedAt: serverTimestamp() });
};

// Called by the contact form on submit
window.submitContact = async function (name, email, message) {
    await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        submittedAt: serverTimestamp()
    });
};

loadCartFromFirestore();
