"use client";
import { addProductToDatabase } from '@/action/serverAction';
import React, { startTransition, useTransition } from 'react'

export default function AddProductButton() {
    const [isPending ,startTransition] = useTransition();

    const formData = new FormData();
    formData.append("product", "Macbook Pro");
    formData.append("price", "25.000.000")

    function handleClick (){
        startTransition(()=> addProductToDatabase(formData))}

  return (
    <button
        onClick={handleClick}
        className='fixed bottom-10 right-10 border bg-green-500 text-white p-2 rounded-md w-48'
    >{isPending?"Adding...":"Add Macbook Pro"}</button>
  )
}
