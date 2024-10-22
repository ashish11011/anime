'use client';
import React, { useState } from 'react';

const ProductForm = () => {
  const [productHeadlines, setProductHeadlines] = useState<any>([]);
  const [newHeadline, setNewHeadline] = useState('');
  const [images, setImages] = useState<any>([]);
  const [formData, setFormData] = useState<any>({
    name: '',
    images: [],
    price: '',
    discountPrice: '',
    description: '',
    productHeadlines: [],
    series: '',
    category: '',
  });

  const handleAddHeadline = () => {
    if (newHeadline.trim()) {
      setProductHeadlines((prevHeadlines: any) => [
        ...prevHeadlines,
        newHeadline.trim(),
      ]);
      setNewHeadline(''); // Clear input after adding
    }
  };

  function handelChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }
  const handleFileInput = (e: any) => {
    setImages([...images, ...e.target.files]);
  };

  async function handleImageUploadToS3() {
    let imageLinks: any = [];
    function getImageName(url: string) {
      // Split the URL by slashes and take the last part
      const parts = url.split('/');
      const lastPart = parts[parts.length - 1];
      // Remove query parameters if they exist
      const imageName = lastPart.split('?')[0];
      return `https://s3.ap-south-1.amazonaws.com/cozzy.corner/allProducts/${imageName}`;
    }

    const response = await fetch('/api/getImageUploadUrl', {
      method: 'POST',
      body: JSON.stringify({
        count: images.length,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Product added:', data);

      for (let i = 0; i < images.length; i++) {
        const responst = await fetch(data[i], {
          method: 'PUT',
          body: images[i],
          headers: {
            'Content-Type': 'image/jpeg',
          },
        });

        if (!responst.ok) {
          console.error('Error uploading image:', responst.statusText);
        } else {
          console.log('Image uploaded:', responst.statusText);
        }

        const imageS3Link = getImageName(data[i]);
        imageLinks.push(imageS3Link);
      }
    } else {
      console.error('Error submitting form:', response.statusText);
    }
    setFormData({ ...formData, images: imageLinks });
  }

  async function handleFormSubmit(e: any) {
    e.preventDefault();

    try {
      const response = await fetch('/api/addNewProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product added:', data);
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <div className="py-16">
      <form
        method="POST"
        className="mx-auto flex w-full max-w-xl flex-col gap-4"
      >
        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Name</span>
          <input
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter product name"
          />
        </label>
        <div className="flex flex-col">
          <span className="mb-1 text-gray-700">Images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileInput(e)}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {images.map((image: any, index: number) => (
            <div className="h-32 w-32 overflow-hidden">
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="Product Image"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
        <div
          onClick={() => handleImageUploadToS3()}
          className="cursor-pointer rounded bg-blue-300 px-2 py-1.5 text-center font-medium text-blue-800"
        >
          Add Images
        </div>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Price</span>
          <input
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            type="text"
            name="price"
            value={formData.price}
            placeholder="Enter price"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Discount Price</span>
          <input
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            type="text"
            name="discountPrice"
            value={formData.discountPrice}
            placeholder="Enter discount price"
          />
        </label>

        <label className="flex max-w-xl flex-col">
          <span className="mb-1 text-gray-700">Product Headlines</span>
          <div className="flex">
            <input
              className="flex-grow rounded-md border border-gray-300 px-2 py-1.5 outline-none"
              type="text"
              value={newHeadline}
              onChange={(e) => setNewHeadline(e.target.value)} // Update local state
              placeholder="Enter product headline"
            />
            <button
              type="button"
              onClick={handleAddHeadline}
              className="ml-2 rounded bg-blue-500 px-4 py-1 text-center text-white"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-col rounded-md border py-1">
            {productHeadlines.map((headline: string, index: number) => (
              <div key={index} className="px-2 py-1">
                {headline}
              </div>
            ))}
          </div>
          <div
            onClick={() =>
              setFormData({ ...formData, productHeadlines: productHeadlines })
            }
            className="mt-2 cursor-pointer rounded bg-blue-300 px-2 py-1.5 text-center font-medium text-blue-800"
          >
            Add headline to product
          </div>
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Description</span>
          <textarea
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            name="description"
            value={formData.description}
            placeholder="Enter product description"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Series</span>
          <input
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            type="text"
            name="series"
            value={formData.series}
            placeholder="Enter series"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Category</span>
          <input
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            type="text"
            name="category"
            value={formData.category}
            placeholder="Enter category"
          />
        </label>

        <div
          onClick={(e) => handleFormSubmit(e)}
          className="cursor-pointer rounded bg-red-200 px-2 py-1.5 text-center font-medium text-red-900"
        >
          Submit
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
