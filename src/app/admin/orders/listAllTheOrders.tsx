'use client';

import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ListAllTheOrders = ({ orderDataString }: any) => {
  const orderData = JSON.parse(orderDataString);
  return (
    <div className="mx-auto flex w-[72rem] flex-col px-4 md:px-0">
      <div className="mb-4 grid cursor-pointer grid-cols-12 gap-2 border bg-gray-100 px-2 py-2">
        <div className="col-span-1 break-all">Index</div>
        <div className="col-span-3 break-all">Name</div>
        <div className="col-span-3 break-all">Email</div>
        <div className="col-span-3 break-all">Address</div>
        <div className="col-span-1 break-all">Pincode</div>
        <div className="col-span-1 break-all">Phone</div>
      </div>

      {orderData.map((item: any, index: number) => {
        return <ListSingleProduct index={index} key={item._id} order={item} />;
      })}
    </div>
  );
};

function ListSingleProduct({ order, index }: any) {
  const [showItems, setShowItems] = useState(false);
  const router = useRouter();
  async function handleOrderDelete(id: string) {
    // await fetch('/api/deleteOrder', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ id }),
    // });

    router.refresh();
  }
  return (
    <div className="flex flex-col">
      <div
        onClick={() => setShowItems((prev: any) => !prev)}
        className="grid cursor-pointer grid-cols-12 gap-2 border bg-gray-100 px-2 py-2"
      >
        <div className="col-span-1 break-all">{index + 1}</div>
        <div className="col-span-2 break-all">{order.name}</div>
        <div className="col-span-3 break-all">{order.email}</div>
        <div className="col-span-4 break-all">{order.address}</div>
        <div className="col-span-1 break-all">{order.pincode}</div>
        <div className="col-span-1 break-all">{order.phone}</div>
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
                <div className="col-span-1 break-all text-right">
                  {item.price}
                </div>
                <div className="col-span-1 break-all text-right">
                  {item.quantity}
                </div>
              </div>
            );
          })}

          <div className="mt-4 flex flex-col">
            <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-white px-2 py-1">
              <div className="col-span-1 flex justify-between gap-1">
                <p>Total Price</p>
              </div>
              <div className="col-span-3 break-all hover:underline"></div>
              <div className="col-span-1 break-all text-right">
                {'+ '}
                {Number(order.discountedPrice).toFixed(2)}
              </div>
              <div className="col-span-1 break-all"></div>
            </div>
            {Number(order.discountedPrice) - Number(order.totalAmount) !==
              0 && (
              <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-white px-2 py-1">
                <div className="col-span-1 flex justify-between gap-1">
                  <p>Discount</p>
                </div>
                <div className="col-span-3 break-all hover:underline"></div>
                <div className="col-span-1 break-all text-right">
                  {(
                    Number(order.discountedPrice) - Number(order.totalAmount)
                  ).toFixed(2)}
                </div>
                <div className="col-span-1 break-all"></div>
              </div>
            )}
            <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-white px-2 py-1">
              <div className="col-span-1 flex justify-between gap-1">
                <p>Delivery Charge</p>
              </div>
              <div className="col-span-3 break-all hover:underline"></div>
              <div className="col-span-1 break-all text-right">
                {'+ '}
                {Number(order.extraCharge).toFixed(2)}
              </div>
              <div className="col-span-1 break-all"></div>
            </div>
            <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-green-100 px-2 py-1">
              <div className="col-span-1 flex justify-between gap-1">
                <p>Net Total</p>
              </div>
              <div className="col-span-3 break-all hover:underline"></div>
              <div className="col-span-1 break-all text-right">
                {''}
                {(
                  Number(order.discountedPrice) + Number(order.extraCharge)
                ).toFixed(2)}
              </div>
              <div className="col-span-1 break-all"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListAllTheOrders;

{
  /* <Trash2
className="cursor-pointer"
onClick={() => handleOrderDelete(order._id)}
/> */
}
