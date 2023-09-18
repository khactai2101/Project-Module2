import React, { useEffect, useState } from "react";
import logo from "../../../../assets/images/logo-kyo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../../../Types/type";
import { getAllUsers, getOneUser } from "../../../../API/user";
import { BsCartPlus } from "react-icons/Bs";
import { NavLink } from "react-router-dom";
function Header() {
  // const userId = JSON.parse(localStorage.getItem("userID") || "");

  const getData = localStorage.getItem("userID");
  // const isCheck = JSON.parse(getData || "");
  console.log(getData);

  const [users, setUsers] = useState<any>([]);
  // const [userEmail, setUserEmail] = useState<string>("");
  const [isCheck, setIsCheck] = useState(getData);

  useEffect(() => {
    //goi api dde thuc hien chuc nang hien thi tat ca cac san pham

    const data = async () => {
      const oneUser = await getOneUser(isCheck);
      console.log(oneUser);

      setUsers(oneUser);
    };
    data();
  }, []);

  // const loggedInUser = users.find((user) => user.id === userId);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userID");
    setIsCheck(null);
  };
  console.log(isCheck);

  return (
    <div>
      {" "}
      <header className="header">
        {/* top */}
        <div className="header-moving">
          <div className="header-wrapper-top">
            <div className="header-top">
              <div className="header-top__left">
                <p>KYO Authentic- Shop Mỹ Phẩm, Son Môi, Nước Hoa Chính Hãng</p>
              </div>
              <div className="header-top__right">
                <ul className="header-contact">
                  <li className="header-contact__email">
                    <a href="#">
                      <i className="bx bx-envelope" />
                      <span>nguyenkhactai1@gmail.com</span>
                    </a>
                  </li>
                  <li className="header-contact__phone">
                    <a href="#">
                      <i className="bx bx-phone" />
                      <span>024.66.737.999</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* main */}
          <div className="header-wapper-main">
            <div className="container">
              <div className="header-main__left">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="header-main__mid">
                <div className="input-search">
                  <input
                    type="text"
                    id="search-value"
                    placeholder="Nhập từ khóa tìm kiếm"
                  />
                  <i className="fa-solid fa-magnifying-glass fa-xl" />
                </div>
              </div>
              <div className="header-main__right">
                <div className="user-account">
                  <div className="account-username">
                    <a href="./html/profile-user.html">
                      <p id="username" />
                    </a>
                  </div>
                  <div className="cart">
                    <a href="./html/cart.html">
                      <i
                        className="bx bx-cart"
                        style={{ color: "#fd95aa", fontSize: 35 }}
                      />
                    </a>
                  </div>
                  {isCheck == null ? (
                    <>
                      <button className="login">
                        <Link to="/login">Đăng nhập</Link>
                      </button>
                      <button className="register">
                        <Link to="/register" id="signup">
                          Đăng ký
                        </Link>
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        className="flex gap-2"
                        style={{ alignItems: "center" }}
                      >
                        <NavLink to="/cart">
                          <BsCartPlus size="30px" />
                        </NavLink>

                        <p>{users.email}</p>
                        <i
                          onClick={handleLogout}
                          className="fa-solid fa-right-from-bracket"
                        ></i>
                      </div>
                      {/* <button className="logout">
                        <Link to="/login">Đăng xuất</Link>
                      </button> */}
                      {/* <div className="user-management">
                        <a href="./html/user-management.html">
                          <i className="management fa-solid fa-house fa-xl" />
                        </a>
                      </div>
                      <div className="logout">
                        <a href="">
                          <i className="logout-user fa-solid fa-right-from-bracket fa-xl" />
                        </a>
                      </div> */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* bottom */}
          <div className="header-wapper-bottom">
            <div className="header-bottom">
              <div className="container">
                <ul className="navbar">
                  <li>
                    <NavLink to="/">
                      <i className="fa-solid fa-house" />
                      <span>TRANG CHỦ</span>
                    </NavLink>
                  </li>
                  {/* <li>
                    <a href="#lipstick">SON MÔI</a>
                  </li> */}
                  <li>
                    <a href="#perfume">NƯỚC HOA</a>
                  </li>
                  <li>
                    <a href="#sunscreen">CHỐNG NẮNG</a>
                  </li>
                  <li>
                    <a href="#facemakeup">TRANG ĐIỂM MẶT</a>
                  </li>
                  <li>
                    <a href="#eyemakeup">TRANG ĐIỂM MẮT</a>
                  </li>
                  <li>
                    <a href="#skincare">CHĂM SÓC DA</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
