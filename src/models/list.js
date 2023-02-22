const mongoose = require("mongoose");

const { Schema } = mongoose;

const listSchema = new Schema(
  {
    manager: {
      type: String,
      required: true
    },
    items: [{
      title: {
        type: String,
        required: true
      },
      donator: {
        type: String,
        default: ""
      }
    }],
    text: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);