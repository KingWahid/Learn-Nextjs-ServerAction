import { revalidateTag } from 'next/cache';
import React from 'react'

export interface Product {
  id?: number;
  product: string;
  price: string;
}

export default async function Home() {
  
  const res = await fetch('https://665706639f970b3b36c7a3d9.mockapi.io/products',
    {
      cache: 'no-cache',
      next: {
        tags: ["products"],
      }
    }
    
  );

  const products: Product[] = await res.json();

  async function addProductToDatabase (event: FormData){
    "use server"
    console.log(event);
    const product = event.get("product")?.toString();
    const price = event.get("price")?.toString();

    if(!product || !price) return;

    const newProduct: Product = {
      product: product,
      price: price,
    };

    await fetch('https://665706639f970b3b36c7a3d9.mockapi.io/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct),
      
    });

    revalidateTag('products');
  }

  return (
    <main className=''>
      
      <h1 className='text-3xl font-bold text-center'>Products Warehouse</h1>

      <form action={addProductToDatabase} className='flex flex-col gap-10 max-w-lg mx-auto p-5'>
        <input 
            name='product'
            className='border border-gray-300 p-2 rounded-md'
            placeholder='Enter product name...' 
          />
        <input 
            name='price' 
            className='border border-gray-300 p-2 rounded-md' 
            placeholder='Enter product price...'  
          />
        <button className='border bg-blue-500 text-white p-2 rounded-md'>Add Product</button>
      </form>

      <h2 className="font-bold p-5">List of Products</h2>
      <div className="flex flex-wrap gap-5">
        {
          products.map((product)=>(
            <div key={product.id} className='p-5 shadow'>
              <p>{product.product}</p>
              <p>Rp. {product.price}</p>
            </div>
          ))
        }
      </div>
    </main>
  )
}
