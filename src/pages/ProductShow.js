import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Layout from "../components/Layout";

const productInit = {
  title: "",
  description: "",
  price: null,
  discountPercentage: null,
  rating: null,
  stock: null,
  brand: "",
  category: ""
};


function ProductShow() {
  const id = useParams().id;
  const [product, setProduct] = useState(productInit);

  useEffect(() => {
    fetchProductDetailsById();
  }, []);

  const fetchProductDetailsById = async () => {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An Error Occured!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Layout>
        <h2 className="text-center mt-5 mb-3">Show Product</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/">
              View All Products
            </Link>
          </div>
          <div className="card-body">
            <b className="text-muted">Name:</b>
            <p>{product.title}</p>
            <b className="text-muted">Description:</b>
            <p>{product.description}</p>
            <b className="text-muted">Price:</b>
            <p>{product.price}</p>
            <b className="text-muted">Discount Percentage:</b>
            <p>{product.discountPercentage}</p>
            <b className="text-muted">Rating:</b>
            <p>{product.rating}</p>
            <b className="text-muted">Stock:</b>
            <p>{product.stock}</p>
            <b className="text-muted">Brand:</b>
            <p>{product.brand}</p>
            <b className="text-muted">Category:</b>
            <p>{product.category}</p>
          </div>
        </div>
    </Layout>
  );
}

export default ProductShow;
