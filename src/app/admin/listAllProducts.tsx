'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const ListAllProducts = ({ productData }: any) => {
  const [showProducts, setShowProducts] = useState(true);
  const products = JSON.parse(productData);

  return (
    <div className="mx-auto flex w-[72rem] flex-col gap-6">
      <div className="flex gap-4 py-4">
        <div
          onClick={() => setShowProducts(!showProducts)}
          className="w-fit cursor-pointer select-none rounded bg-blue-300 px-3 py-2 font-medium text-blue-800"
        >
          Toggle Products
        </div>
        <Link
          href="/admin/addProduct"
          onClick={() => setShowProducts(!showProducts)}
          className="w-fit cursor-pointer select-none rounded bg-green-300 px-3 py-2 font-medium text-green-800"
        >
          Add new
        </Link>
      </div>
      {showProducts && (
        <div className="hide-scrollbar mx-auto flex w-full flex-col overflow-x-scroll">
          {products.map((product: any, index: number) => {
            return (
              <div className="grid grid-cols-10 gap-2 border px-2 py-1">
                <div className="col-span-1 flex items-center justify-between gap-1">
                  <p>{index + 1}</p>
                  <div className="size-12 overflow-hidden">
                    <img
                      src={product.images[0]}
                      className="h-full w-full object-contain"
                      alt=""
                    />
                  </div>
                </div>

                <p className="col-span-3 flex items-center">{product.name}</p>
                <p>{product.price}</p>
                <p>{product.discountPrice}</p>
                <p>{product.category}</p>
                <p>{product.series}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListAllProducts;
