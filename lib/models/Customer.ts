import { model, models, Schema } from "mongoose";

const customerSchema = new Schema({
  id: String,
  name: String,
  email: String,
  orders: {
    type: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
