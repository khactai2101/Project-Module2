import React, { useEffect, useState } from "react";
import { getOneUser } from "../../../../API/user";
import { IProduct } from "../../../../Types/type";
import { message } from "antd";

const Cart = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const [user, setUser] = useState<any>(null);
  // const [sum, setSum] = useState<number>();

  const idUser = localStorage.getItem("userID");

  useEffect(() => {
    //goi api dde thuc hien chuc nang hien thi tat ca cac san pham
    const user = async () => {
      const getUser = await getOneUser(idUser);
      setUser(getUser);
    };
    user();
  }, []);
  // tinh tong tien
  const totalPrice = user?.cart?.reduce((acc: any, item: any) => {
    return acc + item.price * item.quantity;
  }, 0);
  const totalPricetoLocaleStrings =
    totalPrice !== undefined && totalPrice.toLocaleString();

  const handleDelete = (id: number) => {
    console.log(id);
  };
  const handleCheckout = () => {
    message.open({
      type: "success",
      content: "Đặt hàng thành công",
    });
    // Thiết lập giá trị của address và phoneNumber thành chuỗi rỗng
    setAddress("");
    setPhoneNumber("");
  };

  return (
    <>
      <div className="h-[160px]"></div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-[#d95773] sm:text-3xl">
                Giỏ hàng
              </h1>
            </header>
            <div className="mt-8">
              <ul className="space-y-4">
                {user?.cart.map((item: any) => {
                  return (
                    <li className="flex items-center gap-4">
                      <img
                        src={item.images[0].url}
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div>
                        <h3 className="text-sm text-gray-900 w-[350px]">
                          {item.name}
                        </h3>
                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">
                              Dung tích: {item.capacity} ML
                            </dt>
                          </div>
                        </dl>
                      </div>
                      <div className="flex flex-1 items-center justify-end gap-2">
                        <div className="flex items-center gap-1">
                          {/* <button
                            type="button"
                            className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                            onClick={handleDecrement}
                          >
                            −
                          </button> */}
                          <input
                            type="number"
                            id="Quantity"
                            value={item.quantity}
                            defaultValue={1}
                            className=" h-10 w-24 rounded border-gray-200 sm:text-sm text-center"
                            disabled={true}
                          />
                          {/* <button
                            type="button"
                            className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                            onClick={handleIncrement}
                          >
                            +
                          </button> */}
                        </div>
                        <p className="text-red-400 w-[150px]">
                          {(item.price * item.quantity).toLocaleString()} VNĐ
                        </p>
                        <button className="text-gray-600 transition hover:text-red-600">
                          <span className="sr-only">Remove item</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen  space-y-4">
                  <div className=" mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Thanh toán</p>

                    <div className="">
                      <label
                        htmlFor="address"
                        className="mt-4 mb-2 block text-sm font-medium"
                      >
                        Địa chỉ
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder=""
                          value={address}
                          onChange={(e) => setAddress(e.target.value)} // Cập nhật giá trị của state address khi thay đổi
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
                      </div>
                      <label
                        htmlFor="phoneNumber"
                        className="mt-4 mb-2 block text-sm font-medium"
                      >
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder=""
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)} // Cập nhật giá trị của state phoneNumber khi thay đổi
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
                      </div>

                      {/* Total */}
                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">
                          Tổng cộng
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 text-red-400">
                          {totalPricetoLocaleStrings} VNĐ
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="mt-4 mb-8 w-full rounded-md bg-pink-400 px-6 py-3 font-medium text-white"
                    >
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
