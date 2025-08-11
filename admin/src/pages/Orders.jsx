import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../assets/assets";
import { backendUrl, currency } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/orders",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {orders.map((order, idx) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr]  lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={idx}>
            <img
              src={assets.parcel_icon}
              alt="parcel box image at orders list"
            />
            <div>
              <div>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return (
                      <p key={idx}>
                        {item.name} x {item.quantity} <span>{item.size}</span> 
                      </p>
                    );
                  } else {
                    return (
                      <p key={idx}>
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              <p> {`${order.address.firstName} ${order.address.lastName}`} </p>
              <div>
                <p> {`${order.address.street},`} </p>
                <p>
                  {" "}
                  {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}{" "}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p>Items : {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString() }</p>
            </div>
            <p>{currency}{order.amount}</p>
            <select>
              <option value="Order Placed"> Order Placed </option>
              <option value="Packing"> Packing </option>
              <option value="Shipped"> Shipped </option>
              <option value="Out for delivery"> Out for delivery </option>
              <option value="Delivered"> Delivered </option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
