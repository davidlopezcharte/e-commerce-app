import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useState } from 'react';
import Currency from 'react-currency-formatter';

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating,
}) => {
  return (
    <div className="grid grid-cols-5">
      <Image src={image} width="200" height="200" objectFit="contain" />
      <div>
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs mt-2 my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="EUR" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>
      <button className="button mt-auto">Button</button>
    </div>
  );
};

export default CheckoutProduct;
