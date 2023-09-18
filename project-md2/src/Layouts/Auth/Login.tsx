import React, { useEffect, useState } from "react";
import Footer from "../CustomerSite/Components/Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllUsers } from "../../API/user";
import { IUser } from "../../Types/type";
import { message } from "antd";

const Login = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    isError: false,
    emailMSG: "",
  });

  useEffect(() => {
    const data = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };
    data();
  }, []);

  const handleLogin = async () => {
    const userLogin = users?.find(
      (item) => item.email === email && item.password === password
    );

    const newError = {
      isError: false,
      emailMSG: "",
    };

    if (!userLogin) {
      newError.isError = true;
      newError.emailMSG = "Email hoặc mật khẩu không đúng";
      setError(newError);
      return;
    }

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email.match(regexEmail)) {
      newError.isError = true;
      newError.emailMSG = "Email không đúng định dạng - Vui lòng nhập lại";
      setError(newError);
      return;
    }
    if (userLogin.status !== "Active") {
      // Tai khoan bi khoa
      message.open({
        type: "error",
        content: "Tài khoản đã bị khóa",
      });
      return;
    }
    if (userLogin.role === "User" && userLogin.status === "Active") {
      // Lưu userID vào Local Storage sau khi xác thực mật khẩu thành công cho vai trò "User"
      localStorage.setItem("userID", JSON.stringify(userLogin.id));
      navigate("/");
      message.open({
        type: "success",
        content: "Đăng nhập thành công",
      });
    } else if (userLogin.role === "Admin" && userLogin.status === "Active") {
      // Lưu userID vào Local Storage sau khi xác thực mật khẩu thành công cho vai trò "Admin"
      localStorage.setItem("userID", JSON.stringify(userLogin.id));
      navigate("/admin/product");
      message.open({
        type: "success",
        content: "Đăng nhập thành công",
      });
    } else {
      newError.isError = true;
      setError(newError);
    }
  };

  let findUser = users.find((user) => user.email === email);
  console.log(findUser);

  if (findUser) {
    const Auth = {
      userId: findUser.id,
    };
    // localStorage.setItem("Auth", JSON.stringify(Auth));
  }

  // Sử dụng useEffect để theo dõi sự thay đổi của error và log nó
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      {/* component */}
      <div className="bg-white relative lg:py-20">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img
                  src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                  className="btn-"
                  alt="Đăng nhập"
                />
              </div>
            </div>
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                  Đăng nhập
                </p>
                {/* {error.isError == true && (
                  <p className="text-red-500">Tài khoản bị dsds</p>
                )} */}
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                      Tài khoản
                    </p>
                    <input
                      placeholder="Email"
                      type="text"
                      value={email} // Liên kết giá trị với trạng thái email
                      onChange={(e) => setEmail(e.target.value)} // Xử lý sự kiện thay đổi email
                      className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    />
                    {error.emailMSG && (
                      <p className="text-red-500">{error.emailMSG}</p>
                    )}
                  </div>
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                      Mật khẩu
                    </p>
                    <input
                      type="password"
                      value={password} // Quản lý trạng thái mật khẩu
                      onChange={(e) => setPassword(e.target.value)} // Xử lý sự kiện thay đổi mật khẩu
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleLogin(); // goi ham xu ly enter
                        }
                      }}
                      className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="relative text-center">
                    <button
                      onClick={handleLogin}
                      className="w-[80%]  h-15 inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease cursor-pointer"
                    >
                      Đăng nhập
                    </button>
                  </div>
                  <p className="text-center">
                    Nếu chưa có tài khoản,{" "}
                    <Link to="/register" className="text-blue-500">
                      Đăng ký
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
