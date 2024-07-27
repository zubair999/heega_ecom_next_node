const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const addressSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    townCity: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    additionalInformation: {
        type: String,
        required: false
    },
    isSubscribed: {
        type: Boolean,
        required: true,
        default: false
    },
    isTerm: {
        type: Boolean,
        required: true,
        default: false
    },
    isDefault: {
      type: Boolean,
      required: false
  },
}, { _id: false }); // Disable automatic generation of _id for subdocuments

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false,
        unique: false
    },
    addresses: {
        type: [addressSchema],
        required: false,
        default: []
    }
});

module.exports = mongoose.model("user", userSchema);
