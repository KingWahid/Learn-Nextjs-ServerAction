"use server"

import { Product } from "@/typings";
import { revalidateTag } from 'next/cache';

export async function addProductToDatabase (event: FormData){
    
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