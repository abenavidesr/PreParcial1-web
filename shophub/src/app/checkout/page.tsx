"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type CartItem = { id?: string | number; name?: string; title?: string; price: number; quantity?: number };

const CART_KEY = "cart";

export default function CheckoutPage() {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [payment, setPayment] = useState("card");
	const [terms, setTerms] = useState(false);
	const [touched, setTouched] = useState({ name: false, email: false });
	const [loading, setLoading] = useState(false);
	const [completed, setCompleted] = useState(false);

	const nameInvalid = name.trim().length < 5;
	const emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	const total = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0), [cart]);
	const canSubmit = !nameInvalid && !emailInvalid && terms;

	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setTouched({ name: true, email: true });
		if (!canSubmit || loading) return;
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 900));
		localStorage.removeItem(CART_KEY);
		setCart([]);
		window.dispatchEvent(new Event("cart-updated"));
		setName(""); setEmail(""); setPayment("card"); setTerms(false);
		setTouched({ name: false, email: false });
		setCompleted(true); setLoading(false);
        
	}

	return (
		<main className="p-8">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            {completed ? (
                <div className="bg-green-100 text-green-800 p-4 rounded">
                    <h2 className="text-xl font-bold mb-2">¡Compra completada!</h2>
                    <p>Gracias por tu compra, {name}. Hemos enviado un correo de confirmación a {email}.</p>
                </div>
            ) : (
                <form onSubmit={submit} className="max-w-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1 font-bold">Nombre completo</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                            className={`w-full p-2 border ${touched.name && nameInvalid ? "border-red-500" : "border-gray-300"} rounded`}
                        />
                        {touched.name && nameInvalid && <p className="text-red-500 text-sm mt-1">El nombre debe tener al menos 5 caracteres.</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 font-bold">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                            className={`w-full p-2 border ${touched.email && emailInvalid ? "border-red-500" : "border-gray-300"} rounded`}
                        />
                        {touched.email && emailInvalid && <p className="text-red-500 text-sm mt-1">Ingresa un correo válido.</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-bold">Método de pago</label>
                        <select
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="card">Tarjeta de crédito</option>
                            <option value="paypal">PayPal</option>
                            <option value="bank">Transferencia bancaria</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                                className="mr-2"
                            />
                            Acepto los términos y condiciones
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={!canSubmit || loading}
                        className={`w-full p-2 text-white rounded ${canSubmit ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
                    >
                        {loading ? "Procesando..." : `Pagar $${total.toFixed(2)}`}
                    </button>
                </form>
            )}
        </main>
	);
}
