This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Decisiones de Arquitectura y Cambios del Parcial

### Punto 1 Evolución del contexto

Para cambiar el modelo de datos en el CartContext respecto al preparcial, lo que hice fue primero en product, crear un nuevo  atributo dentro del tipo, que es quantityCart. Despues en el contexto modifique addToCart para que inicialize el quantityCart en 1 en caso de que el producto no estuviera en el carrito, y que le sume 1 en caso de que el producto ya estuviera en el carrito. Tambien se creo quitarFromCart para que le quite 1 a quantityCart en caso de que este estuviera ya en el carrito, hasta que llegue a 0. Finalmente se creo RestartCart, que justamente inicia un nuevo carrito, vaciando el que ya estaba.

### Punto 2 Calculo de totales

Para el calculo de totales solo se hizo un reduce donde se creo una variable total, y por cada producto en el carrito, se multiplico el precio por el atributo que se creo de quantityCart. 