import "./productList.css";
import axios from 'axios';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductList() {
  const [data, setData] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  let dataIds = [];

  const getFoods = async () => {
    const response = await axios.get('http://localhost:3001/foods');

    const resData = response.data;
    setData(resData);
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/foods/${id}`);
    setData(data.filter((item) => item._id !== id));
  };

  const handleDeleteAll = async () => {
    if (dataIds.length > 1) {
      const idList = { ids: dataIds }
      await fetch(`http://localhost:3001/foods/delete`, 
        {
          method: 'DELETE',
          body: JSON.stringify(idList)
        }
      );
      console.log(dataIds);
      console.log(dataIds.length)
  
      setData(data.filter((item) => !dataIds.includes(item._id)));
    }
  }

  useEffect(() => {
    getFoods()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.picturePath} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "desc", headerName: "Description", width: 300 },
    {
      field: "isAvailable",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={params.row.isAvailable ? "productListItem" : "productListItem active"}>
            {params.row.isAvailable ? "Available" : "Not Available"}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {isSelected ? 
              (
                <button 
                  className="productListDeleteAll"
                  onClick={handleDeleteAll}
                >
                  Delete
                </button>
              )
             : (
             <>
                <Link to={`/product/${params.row._id}`}>
                  <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline
                  className="productListDelete"
                  onClick={() => handleDelete(params.row._id)}
                />
             </>
             )
            }
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        getRowId={(data) => data?._id}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIds = ids;
          dataIds = selectedIds;
          if (dataIds.length > 0) {
            setIsSelected(true);
          } else {
            setIsSelected(false);
          }
        }}
      />
    </div>
  );
}
