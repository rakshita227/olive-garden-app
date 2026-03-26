import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Called when the user clicks Checkout
window.placeOrder = async function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    await addDoc(collection(db, 'orders'), {
        items: cart,
        total,
        orderedAt: serverTimestamp()
    });
    localStorage.removeItem('cart');
    alert('Order placed successfully! Thank you.');
    window.location.reload();
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
