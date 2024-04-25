import { useContext, useState } from "react";
import ItemsContext from "./ItemsContext";
import AlertContext from "./AlertContext";

const ItemsProvider = (props) => {

	const [items, setItems] = useState([]);
	const { alertSetter } = useContext(AlertContext);

	const host = "http://localhost:5000";

	const getAllItems = async () => {

		try
		{
			const response = await fetch(`${host}/api/inventory/getall`, {
				method: "GET",
				headers: {
					"Auth-Token": localStorage.getItem('token')
				}
			});
	
			const json = await response.json();
			if(json.success)
			{
				setItems(json.items);
			}
			else
			{
				alertSetter({ message: json.message, type: "danger"});
			}
		}
		catch(error)
		{
			alertSetter({ message: error, type: "danger"});
		}
	}

	const addItem = async ({ name, qty, category, imageURL }) => {

		try
		{
			const response = await fetch(`${host}/api/inventory/add`, {
				method: "POST",
				headers: {
					"Content-Type":"application/json",
					"Auth-Token":localStorage.getItem('token')
				},
				body: JSON.stringify({
					name, qty, category, imageURL
				})
			});

			const json = await response.json();

			if(json.success)
			{
				// Update frontend
				alertSetter({ message: json.message, type: "warning"});
				const newItems = items.concat(json.item);
				setItems(newItems);
			}
			else
			{
				alertSetter({ message: json.message, type: "danger"});
			}

		}
		catch(error)
		{
			alertSetter({ message: error, type: "danger"});
		}

	};

	const deleteItem = async ({ _id }) => {

		try
		{
			const response = await fetch(`${host}/api/inventory/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Auth-Token": localStorage.getItem('token')
				}
			});

			const json = await response.json();

			if(json.success)
			{
				// Update frontend
				alertSetter({ message: json.message, type: "warning"});
				const newItems = items.filter((x) => x._id !== _id);
				setItems(newItems);
			}
			else
			{
				alertSetter({ message: json.message, type: "danger"});
			}

		}
		catch(error)
		{
			alertSetter({ message: error, type: "danger"});
		}

	}

	const updateItem = async ({ _id, name, qty, category, imageURL }) => {

		try
		{
			const response = await fetch(`${host}/api/inventory/update/${_id}`, {
				method: "PUT",
				headers: {
					"Content-Type":"application/json",
					"Auth-Token":localStorage.getItem('token')
				},
				body: JSON.stringify({
					name, qty, category, imageURL
				})
			});

			const json = await response.json();

			if(json.success)
			{
				// Update frontend
				alertSetter({ message: json.message, type: "warning"});
				
				const newItems = JSON.parse(JSON.stringify(items));
				for(let i = 0; i < newItems.length; i++)
				{
					if(newItems[i]._id === _id)
					{
						newItems[i].name = name;
						newItems[i].qty = qty;
						newItems[i].category = category;
						newItems[i].imageURL = imageURL;
						break;
					}
				}

				setItems(newItems);
			}
			else
			{
				alertSetter({ message: json.message, type: "danger"});
			}

		}
		catch(error)
		{
			alertSetter({ message: error, type: "danger"});
		}

	}

	return (
		<ItemsContext.Provider value={{ items, setItems, getAllItems, addItem, deleteItem, updateItem }}>
			{props.children}
		</ItemsContext.Provider>
	);
};

export default ItemsProvider;