import { DataTable } from "@/components/custom ui/DataTable";
import { OrderItemsColumns } from "@/components/orderItems/OrderItemsColumns";
import axios from "axios";

const OrderDetailsPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const res = await axios.get(
    `http://localhost:3001/api/orders/${params.orderId}`,
  );

  const { orderDetails, customer } = await res.data;

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="flex flex-col gap-5 p-10">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-base-bold">
        Shipping address:{" "}
        <span className="text-base-medium">
          {street}, {city}, {state}, {postalCode}, {country}
        </span>
      </p>
      <p className="text-base-bold">
        Total Paid:{" "}
        <span className="text-base-medium">${orderDetails.totalAmount}</span>
      </p>
      <p className="text-base-bold">
        Shipping rate ID:{" "}
        <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>

      <DataTable data={orderDetails} columns={OrderItemsColumns} keyField="product" />
    </div>
  );
};

export default OrderDetailsPage;