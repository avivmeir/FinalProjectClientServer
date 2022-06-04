const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let PromoCode = new Schema(
  {
    _id:Number,
    PromoCode: {
      type: String,
    },
    Description: {
      type: String,
    },
  },
  {
    collection: "promocodes",
  }
);
const Promo = mongoose.model("Promo", PromoCode);
module.exports = Promo;
