import React,{useEffect, useState} from 'react'
import "./List.css"
import axios from 'axios'
import {toast} from 'react-toastify'


const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.status === 200) {
      setList(response.data);
    }
    else{
      toast.error("Error")
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove/`,{id: foodId});
    await fetchList();
    if (response.status === 200) {
      toast.success(response.data.message);
      fetchList();
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <p>Image</p>
          <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
        </div>
        {
          list.map((item, index) => {
            return(
              <div className="list-table-format" key={index}>
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p className='list-cross' onClick={() => removeFood(item._id)}>x</p>
              </div>
            )
          })
        }
      </div>  
    </div>
    )}

export default List
