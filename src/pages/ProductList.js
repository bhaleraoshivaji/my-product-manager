import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Layout from "../components/Layout";

function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await axios.get("/products?limit=10");
      setProductList(response.data.products);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/products/${id}`);
          Swal.fire({
            icon: "success",
            title: "Product deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchProductList();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <Layout>
      <h2 className="text-center mt-5 mb-3">Product Manager</h2>
      <div className="card">
        <div className="card-header table-active">
          <Link className="btn btn-outline-primary" to="/create">
            Create New Product
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>DiscountPercentage</th>
                <th>Rating</th>
                <th>Stock</th>
                <th>Brand</th>
                <th>Category</th>
                <th width="240px">Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, key) => {
                return (
                  <tr key={key}>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.discountPercentage}</td>
                    <td>{product.rating}</td>
                    <td>{product.stock}</td>
                    <td>{product.brand}</td>
                    <td>{product.category  }</td>
                    <td>
                      <Link
                        to={`/show/${product.id}`}
                        className="btn btn-outline-info mx-1"
                      >
                        Show
                      </Link>
                      <Link
                        className="btn btn-outline-success mx-1"
                        to={`/edit/${product.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-outline-danger mx-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default ProductList;
