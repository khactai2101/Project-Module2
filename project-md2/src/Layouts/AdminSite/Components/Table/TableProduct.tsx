import React, { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../../../Types/type";
import { getAllProducts, deleteProducts } from "../../../../API";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import EditProduct from "../Modal/EditProduct";
import { message } from "antd";

const TableProduct: React.FC = () => {
  const [name, setName] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [brand, setBrand] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [image1, setImage1] = useState<any>();
  const [image2, setImage2] = useState<any>();
  const [image3, setImage3] = useState<any>();
  const [stock, setStock] = useState<any>();
  const [provider, setProvider] = useState<any>();

  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    //goi api dde thuc hien chuc nang hien thi tat ca cac san pham
    const data = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    data();
  }, []);

  //Add san pham

  const handleAdd = async () => {
    const newProduct = {
      name: name,
      price: price,
      description: description,
      brand: brand,
      provider: provider,
      category: category,
      stock: stock,
      images: [
        { id: 1, url: image1 },
        { id: 2, url: image2 },
        { id: 3, url: image3 },
      ],
      feedback: [],
    };

    try {
      // Thực hiện yêu cầu POST để thêm sản phẩm mới
      await axios.post("http://localhost:8080/product/", newProduct);

      // Sau khi thêm sản phẩm mới thành công, cập nhật danh sách sản phẩm
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);

      // Đóng modal sau khi thêm sản phẩm mới
      setOpenModal(undefined);
      //clear value sau khi add
      setName("");
      setCategory("");
      setBrand("");
      setPrice("");
      setDescription("");
      setImage1("");
      setImage2("");
      setImage3("");
      setStock("");
      setProvider("");
      message.open({
        type: "success",
        content: "Đã thêm sản phẩm",
      });
    } catch (error) {
      // Xử lý lỗi ở đây
      console.error("Error adding product: ", error);
    }
  };

  //Edit product
  const fetchProducts = () => {
    axios.get("http://localhost:8080/product/").then((response) => {
      setProducts(response.data);
    });
  };

  useEffect(() => fetchProducts(), []);

  const handleUpdate = () => {
    axios
      .get("http://localhost:8080/product/")
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Hàm xóa sản phẩm
  const handleDelete = (productId: number) => {
    console.log(productId);
    // Gọi API hoặc thực hiện xóa sản phẩm tại đây
    const data = async () => {
      const response = await deleteProducts(productId);
      console.log(response);

      const dellProduct = await getAllProducts();
      setProducts(dellProduct);
    };
    data();
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
        <div className="w-[30%]">
          <Button onClick={() => props.setOpenModal("default")}>Thêm</Button>
          <Modal
            show={props.openModal === "default"}
            onClose={() => props.setOpenModal(undefined)}
          >
            <Modal.Header>Thêm sản phẩm</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <table>
                  <tr>
                    <td>
                      {" "}
                      <div className="mr-20">
                        <div className="mb-2 block">
                          <Label htmlFor="nameProduct" value="Tên sản phẩm" />
                        </div>
                        <TextInput
                          id="nameProduct"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="nameCategory" value="Tên danh mục" />
                        </div>
                        <TextInput
                          id="nameCategory"
                          value={category}
                          onChange={(event) => setCategory(event.target.value)}
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="nameBrand" value="Tên thương hiệu" />
                        </div>
                        <TextInput
                          id="nameBrand"
                          value={brand}
                          onChange={(event) => setBrand(event.target.value)}
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="price" value="Giá" />
                        </div>
                        <TextInput
                          id="price"
                          value={price}
                          onChange={(event) => setPrice(event.target.value)}
                          placeholder=""
                          required
                          type="number"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="description" value="Mô tả" />
                        </div>
                        <TextInput
                          id="description"
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="image" value="Ảnh 1" />
                        </div>
                        <TextInput
                          id="image"
                          value={image1}
                          onChange={(event) => setImage1(event.target.value)}
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                  </tr>
                  {/* <div>
                        <div className="mb-2 block">
                          <Label htmlFor="image3" value="Ảnh 3" />
                        </div>
                        <TextInput
                          id="image3"
                          value={image3}
                          onChange={(event) => setImage3(event.target.value)}
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div> */}

                  <tr>
                    <td>
                      {" "}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="stock" value="Số lượng kho" />
                        </div>
                        <TextInput
                          id="stock"
                          value={stock}
                          onChange={(event) => setStock(event.target.value)}
                          placeholder=""
                          required
                          type="number"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="image2" value="Ảnh 2" />
                        </div>
                        <TextInput
                          id="image2"
                          value={image2}
                          onChange={(event) => setImage2(event.target.value)}
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="provider" value="Nhà cung cấp" />
                        </div>
                        <TextInput
                          id="provider"
                          value={provider}
                          onChange={(event) => setProvider(event.target.value)}
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                    <td>
                      <td>
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor="image3" value="Ảnh 3" />
                          </div>
                          <TextInput
                            id="image3"
                            value={image3}
                            onChange={(event) => setImage3(event.target.value)}
                            placeholder=""
                            required
                            type="text"
                            className="w-[250px]"
                          />
                        </div>
                      </td>
                    </td>
                  </tr>
                </table>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleAdd}>Thêm</Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                ID
              </th>
              <th scope="col" className="px-2 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-2 py-3">
                Ảnh
              </th>
              <th scope="col" className="px-2 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-2 py-3">
                Thương hiệu
              </th>
              <th scope="col" className="px-2 py-3">
                Giá
              </th>
              <th scope="col" className="px-2 py-3">
                Số lượng kho
              </th>
              <th scope="col" className="px-2 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 "
              >
                <th className="px-2 py-4">{product.id}</th>
                <td className="w-13 pr-5">{product.name}</td>
                <td className="w-20">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td className="w-25 p-2">{product.description}</td>
                <td className="px-3 py-4">{product.brand}</td>
                <td className="w-[100px] text-red-500">
                  {Number(product.price).toLocaleString()} VNĐ
                </td>

                <td className="px-5  py-4">{product.stock}</td>
                <td className="px-2 py-4 flex">
                  <EditProduct getProduct={product} handleOk={handleUpdate} />
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableProduct;
