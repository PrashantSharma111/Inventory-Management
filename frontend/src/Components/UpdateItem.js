import React from 'react'

const UpdateItem = ({ closeRef, update, updatedItem, setUpdatedItem }) => {

    const onChange = (e) => {
        setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
    };

    return (
        <div className="modal fade" id="updateItemModal" tabIndex="-1" aria-labelledby="updateItemModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="updateItemModalLabel">Update Item</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Item Name</label>
                                <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={updatedItem.name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="qty" className="form-label">Quantity</label>
                                <input type="number" className="form-control" id="qty" name="qty" onChange={onChange} value={updatedItem.qty} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input type="text" className="form-control" id="category" name="category" onChange={onChange} value={updatedItem.category} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="imageURL" className="form-label">Image URL</label>
                                <input type="text" className="form-control" id="imageURL" name="imageURL" onChange={onChange} value={updatedItem.imageURL} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                        <button disabled={updatedItem.name.toString().trim() === "" || updatedItem.qty.toString().trim() === "" || updatedItem.category.toString().trim() === ""} type="button" className="btn btn-primary" onClick={update}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateItem
