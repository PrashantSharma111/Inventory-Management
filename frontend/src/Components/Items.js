import React, { useContext, useEffect, useRef, useState } from 'react'
import ItemsContext from '../Context/ItemsContext'
import Item from './Item';
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';
import { useNavigate } from 'react-router-dom';
import './Items.css';
import DashboardInfo from './DashboardInfo';

const Items = () => {

    const { items, getAllItems } = useContext(ItemsContext);
    const [updatedItem, setUpdatedItem] = useState({ _id: "", name: "", qty: "", imageURL: "" });
    const { updateItem } = useContext(ItemsContext);
    const closeRef = useRef(null);
    const navigate = useNavigate();

    const setUpdateModal = (itemToBeUpdated) => {
        setUpdatedItem(itemToBeUpdated);
    };

    const update = () => {
        updateItem(updatedItem);
        closeRef.current.click();
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }

        getAllItems();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                localStorage.getItem('admin') === 'true' && 
                <DashboardInfo />
            }
            <AddItem />
            <UpdateItem closeRef={closeRef} update={update} updatedItem={updatedItem} setUpdatedItem={setUpdatedItem} />
            <h2 className='text-center mt-4'>Items</h2>
            {
                items.length === 0 ? 
                <button className="btn btn-warning mt-4" disabled>No items to display :(</button> :
                <div className='row mt-4 justify-content-center'>
                    {
                        items.map((item) => <Item item={item} key={item._id} setUpdateModal={setUpdateModal} />)
                    }
                </div>
            }
            {
                localStorage.getItem('admin') === 'true' && 
                <div className="container my-5 text-center">
                    <button type="button" className="itemsBtn" data-bs-toggle="modal" data-bs-target="#addItemModal">Add Item</button>
                </div>
            }
        </>
    )
}

export default Items
