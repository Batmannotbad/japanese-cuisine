import {
  CloudUpload,
  Money,
  Publish,
  Description,
  FormatQuote,
  FilterList,
  ShoppingCart,
} from "@material-ui/icons";


import { Link, useParams } from "react-router-dom";
import "./user.css";
import sasimage from '../../pages/images/hero-img-1.svg'
import { useState, useEffect } from "react";

export default function Product() {
  const foodId = useParams();
  const [food, setFood] = useState(null);
  const getFood = async () => { 
    console.log(foodId);
    const response = await fetch(`http://localhost:3001/foods/${foodId.productId}`, 
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    setFood(data);
  }

  useEffect(() => {
    getFood()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Product</h1>
        <Link to="/newProduct">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={food?.picturePath}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{food?.name}</span>
              <span className="userShowUserTitle">{food?.type}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Food Details</span>
            <div className="userShowInfo">
              <CloudUpload className="userShowIcon" />
              <span className="userShowInfoTitle">ID : {food?._id}</span>
            </div>
            <div className="userShowInfo">
              <FormatQuote className="userShowIcon" />
              <span className="userShowInfoTitle">Name : {food?.name}</span>
            </div>
            <div className="userShowInfo">
              <Description className="userShowIcon" />
              <span className="userShowInfoTitle">Description : {food?.desc}</span>
            </div>
            <div className="userShowInfo">
              <FilterList className="userShowIcon" />
              <span className="userShowInfoTitle">Type : {food?.type}</span>
            </div>
            <div className="userShowInfo">
              <Money className="userShowIcon" />
              <span className="userShowInfoTitle">Price : {food?.price}VND</span>
            </div>
            <div className="userShowInfo">
              <ShoppingCart className="userShowIcon" />
              <span className="userShowInfoTitle">Status : {food?.isAvailable ? "Available" : "Not Available"}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Type</label>
                <input
                  type="text"
                  placeholder="Type"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Price</label>
                <input
                  type="text"
                  placeholder="Price"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Status</label>
                <select name="active" id="active">
                  <option value="true">Active</option>
                  <option value="false">No Active</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                {/* <img
                  className="userUpdateImg"
                  src={sasimage}
                  alt=""
                /> */}
                <label>Upload image</label>
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

