import React, { useContext } from 'react';
import './DashboardInfo.css';
import ItemsContext from '../Context/ItemsContext';

const DashboardInfo = () => {

    const { items } = useContext(ItemsContext);

    const getMaxQtyItem = (getMax = true) => {
        if(items.length === 0)
            return { name: "", qty: 0 };
        let ans = items[0];
        for(let i = 1; i < items.length; i++)
        {
            if(!getMax ^ (items[i].qty > ans.qty))
            {
                ans = items[i];
            }
        }
        return ans;
    }

    return (
        <div className='info-container'>
            <div className="total-items">
                <h5>Total Items</h5>
                <p>{ items.length }</p>
            </div>
            <div className="max-qty">
                <h5>Item with Maximum Quantity</h5>
                <p>{ getMaxQtyItem().name } - { getMaxQtyItem().qty }</p>
            </div>
            <div className="min-qty">
                <h5>Restock Needed</h5>
                <p>{ getMaxQtyItem(false).name } - { getMaxQtyItem(false).qty }</p>
            </div>
        </div>
    )
}

export default DashboardInfo
