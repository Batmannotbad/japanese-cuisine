import { useState } from "react";
import storage from '../../firebase';
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import "./newProduct.css";

export default function NewProduct() {
  const navigate = useNavigate();
  const [food, setFood] = useState({});
  const [img, setImg] = useState({});
  const [uploaded, setUploaded] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setFood({...food, [e.target.name]: value});
    console.log(food);
  }

  const upload = (item) => {
    const fileName = new Date().getTime() + item.file.name;
    const storageRef = ref(storage ,`/items/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, item.file);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      console.log('upload is' + progress + '% done');
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setFood((prev) => {
          return { ...prev, "picturePath": url };
        });
        setUploaded(true);
      })
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload({file: img})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3001/foods/", food);

    navigate('/products');
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" name="picturePath" onChange={(e) => setImg(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description" name="desc" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <input type="text" placeholder="Category" name="type" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>Price</label>
          <input type="number" placeholder="VND" name="price" onChange={handleChange}/>
        </div>

        {uploaded ? (
          <button type="button" className="addProductButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button type="button" className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
         
      </form>
    </div>
  );
}
