import React, { useContext } from 'react'
import ItemsContext from '../Context/ItemsContext';
import './Item.css';

const Item = ({ item, setUpdateModal }) => {

    const { deleteItem } = useContext(ItemsContext);

    const handleDeleteClick = () => {
        deleteItem(item);
    };

    const handleUpdateClick = () => {
        setUpdateModal(item);
    };

    return (
        <div className="card col-md-3 m-2">
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {item.category}
                <span className="visually-hidden">category</span>
            </span>
            <img src={item.imageURL} className="card-img-top my-3 rounded" alt=""></img>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Quantity: {item.qty}</p>
                {
                    localStorage.getItem('admin') === 'true' && 
                    <>
                        <i className="fa-solid fa-trash" onClick={handleDeleteClick}></i>
                        <i className="fa-solid fa-pen-to-square mx-4" data-bs-toggle="modal" data-bs-target="#updateItemModal" onClick={handleUpdateClick}></i>
                    </>
                }
            </div>
        </div>
    )
}

export default Item
