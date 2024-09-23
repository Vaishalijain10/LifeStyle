// importing mongoose for database
import mongoose from "mongoose";

// specifying the datatype and its specific properties for Schema
const UserSchema = mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  WishList: {
    type: Array,
  },
  Cart: {
    type: Array,
  },
});

// above schema is created into model but why? -> mongodb process
const users = mongoose.model("Registered_Users", UserSchema);

export default users;
