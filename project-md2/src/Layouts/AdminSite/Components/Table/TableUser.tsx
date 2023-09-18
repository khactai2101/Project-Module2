import React, { useEffect, useState } from "react";
import { IUser } from "../../../../Types/type";
import { deleteUser, getAllUsers } from "../../../../API/user";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import { message } from "antd";

const TableUser = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    //goi api dde thuc hien chuc nang hien thi tat ca cac san pham
    const data = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };
    data();
  }, []);

  // Hàm xóa sản phẩm
  const handleDelete = (id: number) => {
    // Gọi API hoặc thực hiện xóa sản phẩm tại đây
    const data = async () => {
      await deleteUser(id);
      const dellUser = await getAllUsers();
      setUsers(dellUser);
    };
    data();
  };

  const handleBlockUser = async (id: number) => {
    try {
      // Gọi API để lấy thông tin người dùng hiện tại
      const currentUser = users.find((user) => user.id === id);

      if (!currentUser) {
        console.error("Người dùng không tồn tại.");
        return;
      }

      //copy lại mảng sửa status thành block
      const updatedUser = { ...currentUser, status: "Blocked" };

      // call api để cập nhật thông tin
      const response = await axios.put(
        `http://localhost:8080/users/${id}`,
        updatedUser
      );

      if (response.status === 200) {
        message.open({
          type: "success",
          content: "Đã khóa tài khoản",
        });

        // Cập nhật lại danh sách người dùng với thông tin người dùng đã được cập nhật
        const updatedUsers = users.map((user) =>
          user.id === id ? updatedUser : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center mb-2">
        <form className="w-[70%]">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tìm kiếm..."
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tìm kiếm
            </button>
          </div>
        </form>{" "}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Tên
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                Giới tính
              </th>
              <th scope="col" className="px-6 py-3">
                số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                địa chỉ
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th scope="col" className="px-6 py-3">
                  {user.id}
                </th>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.address}</td>
                <td className="px-6 py-4">{user.role}</td>

                <td className="px-6 py-4">{user.status}</td>

                <td className="px-6 py-4 flex">
                  {user.role === "User" ? (
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                      onClick={() => handleBlockUser(user.id)}
                    >
                      Block
                    </button>
                  ) : null}
                  {
                    user.role === "User" ? (
                      <button
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    ) : null // Ẩn button "Xóa" khi role là "Admin"
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableUser;
