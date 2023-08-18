import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Layout from "../components/Layout";

function ProductCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);

  const newProduct = {
    title: title,
    description: description,
    price: price,
    discountPercentage: discountPercentage,
    rating: rating,
    stock: stock,
    brand: brand,
    category: category
};

const handleSave = async () => {
    try {
        const response = await axios.post('/products/add', newProduct);
        Swal.fire({
            icon: "success",
            title: "Product saved successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsSaving(false);
          setTitle("");
          setDescription("");
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsSaving(false);
    }
};

  return (
    <Layout>
        <h2 className="text-center mt-5 mb-3">Create New Product</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/">
              View All Products
            </Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Title</label>
                <input
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  value={title}
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  className="form-control"
                  id="description"
                  rows="3"
                  name="description"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="name">Price</label>
                <input
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                  value={price}
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Discount Percentage</label>
                <input
                  value={discountPercentage}
                  onChange={(event) => {
                    setDiscountPercentage(event.target.value);
                  }}
                  className="form-control"
                  id="discountPercentage"
                  rows="3"
                  name="discountPercentage"
                  type="number"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="name">Rating</label>
                <input
                  onChange={(event) => {
                    setRating(event.target.value);
                  }}
                  value={rating}
                  type="number"
                  className="form-control"
                  id="rating"
                  name="rating"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Stock</label>
                <input
                  value={stock}
                  onChange={(event) => {
                    setStock(event.target.value);
                  }}
                  className="form-control"
                  id="stock"
                  rows="3"
                  name="stock"
                  type="number"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="name">Brand</label>
                <input
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                  value={brand}
                  type="text"
                  className="form-control"
                  id="brand"
                  name="brand"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Category</label>
                <input
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                  className="form-control"
                  id="category"
                  rows="3"
                  type="text"
                  name="category"
                ></input>
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="button"
                className="btn btn-outline-primary mt-3"
              >
                Save Product
              </button>
            </form>
          </div>
      </div>
    </Layout>
  );
}

export default ProductCreate;
