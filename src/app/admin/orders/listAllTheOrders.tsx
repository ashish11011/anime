'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const ListAllTheOrders = ({ orderDataString }: any) => {
  const orderData = JSON.parse(orderDataString);
  return (
    <div className="mx-auto flex w-[72rem] flex-col">
      {orderData.map((item: any, index: number) => {
        return <ListSingleProduct index={index} key={item._id} order={item} />;
      })}
    </div>
  );
};

function ListSingleProduct({ order, index }: any) {
  const [showItems, setShowItems] = useState(false);
  return (
    <div className="flex flex-col">
      <div
        onClick={() => setShowItems((prev: any) => !prev)}
        className="grid cursor-pointer grid-cols-12 gap-2 border bg-gray-100 px-2 py-2"
      >
        <div className="col-span-1 break-all">{index + 1}</div>
        <div className="col-span-3 break-all">{order.name}</div>
        <div className="col-span-3 break-all">{order.email}</div>
        <div className="col-span-3 break-all">{order.address}</div>
        <div className="col-span-1 break-all">{order.phone}</div>
        <div className="col-span-1 break-all">
          {Number(order.discountedPrice).toFixed(2)}
        </div>
      </div>

      {showItems && (
        <div className="flex flex-col border">
          {order.orderDetails.map((item: any, index: number) => {
            return (
              <div
                key={item._id}
                className="grid grid-cols-6 gap-2 bg-white px-2 py-2"
              >
                <div className="col-span-1 flex max-w-24 items-center justify-between gap-1">
                  <p>{index + 1}</p>
                  <div className="size-8 overflow-hidden">
                    <img
                      src={item.image}
                      className="h-full w-full object-contain"
                      alt=""
                    />
                  </div>
                </div>
                <Link
                  href={'/product/' + item.productId}
                  target={'_blank'}
                  className="col-span-3 break-all hover:underline"
                >
                  {item.name}
                </Link>
                <div className="col-span-1 break-all">{item.price}</div>
                <div className="col-span-1 break-all">{item.quantity}</div>
              </div>
            );
          })}
          <div className="mt-2 flex gap-6 px-2 py-2">
            <p>Total Price is: </p>
            <p>{Number(order.discountedPrice).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListAllTheOrders;
