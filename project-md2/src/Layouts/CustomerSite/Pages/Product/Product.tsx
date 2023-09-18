import { Carousel } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../../../Types/type";
import { getAllProducts, getOneProduct } from "../../../../API";
import { addToCart, getOneUser } from "../../../../API/user";
import { BsCartPlus } from "react-icons/Bs";

import axios from "axios";
import { message } from "antd";

const Product = () => {
  const id = useParams<{ id: string }>();
  const [products, setProducts] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [capacity, setCapacity] = useState<any>(50);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    //goi api dde thuc hien chuc nang hien thi tat ca cac san pham
    const data = async () => {
      const getOneProducts = await getOneProduct(id.id);
      setProducts(getOneProducts);
    };
    data();
  }, []);
  const [user, setUser] = useState<any>(null);
  const idUser = localStorage.getItem("userID");

  useEffect(() => {
    //goi api dde thuc hien chuc nang hien thi tat ca cac san pham
    const user = async () => {
      const getUser = await getOneUser(idUser);
      setUser(getUser);
    };
    user();
  }, []);
  // Tạo hàm để tính giá trị dựa trên capacity

  // handleAddToCart

  const handleAddToCart = async () => {
    // // tim sp trong cart user
    // // sneu co thi tang quantity
    // // neu chua co thi push vao cart

    // const response = await addToCart(user);

    const existingProduct = user?.cart?.find(
      (item: IProduct) => item.id === products.id && item?.capacity === capacity
    );
    console.log("nnnnn", existingProduct?.capacity);
    console.log(capacity);

    if (existingProduct) {
      // Kiểm tra xem capacity của sản phẩm tồn tại có khớp không
      if (existingProduct?.capacity === capacity) {
        existingProduct.quantity += quantity;
        console.log("incart", existingProduct);
      } else {
        // Nếu capacity không khớp, thêm sản phẩm mới vào giỏ hàng
        products.quantity = quantity;
        products.capacity = capacity;
        user.cart.push(products);

        console.log(33, user.cart);
      }
    }
    if (existingProduct?.capacity !== capacity && !existingProduct) {
      // Nếu capacity không khớp, thêm sản phẩm mới vào giỏ hàng
      products.quantity = quantity;
      products.capacity = capacity;
      user.cart.push(products);

      console.log(44, user.cart);
    }
    const response = await addToCart(user);
    if ((response as any).status === 200) {
      const getUser = await getOneUser(idUser);
      setUser(getUser);
      const getOneProducts = await getOneProduct(id.id);
      setProducts(getOneProducts);
      setCapacity(50);
      message.open({
        type: "success",
        content: "Thêm vào giỏ hàng thành công",
      });
    }
  };

  return (
    <>
      <div className="h-[160px]"></div>
      <section className="text-gray-700 body-font overflow-hidden bg-[#ECECEC] py-3">
        <div className="container px-5 py-24 mx-auto bg-white ">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Carousel className="lg:w-1/2 w-full object-cover h-[500px] object-center rounded border border-gray-200">
              <img
                alt="..."
                src={products?.images[0].url}
                className="object-cover w-full h-full "
              />
              <img
                alt="..."
                src={products?.images[1].url}
                className="object-cover w-full h-full "
              />
              <img
                alt="..."
                src={products?.images[2].url}
                className="object-cover w-full h-full "
              />
            </Carousel>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {products?.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {products?.name}
              </h1>

              <p className="leading-relaxed">
                <span className="font-bold">{products?.name} </span>
                {products?.description}
              </p>
              <div className="flex mt-6 items-center pb-3 border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Dung tích</span>
                  <div className="relative ">
                    <button
                      onClick={() => setCapacity(50)}
                      className=" relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        50ml
                      </span>
                    </button>
                    <button
                      onClick={() => setCapacity(100)}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        100ml
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleDecrement}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="Quantity"
                    value={quantity}
                    defaultValue={1}
                    disabled={true}
                    className="h-10 w-24 rounded border-gray-200 sm:text-sm text-center "
                  />
                  <button
                    type="button"
                    className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-red-400">
                  {Number(products?.price).toLocaleString()} VNĐ
                </span>
                <button
                  onClick={handleAddToCart}
                  className="flex ml-auto text-white bg-pink-300 border-0 py-2 px-6 focus:outline-none hover:bg-pink-400 rounded transition-colors duration-500"
                >
                  Thêm vào giỏ hàng
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
