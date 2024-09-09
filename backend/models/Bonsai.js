const { Schema, model } = require("mongoose");

const dateFormat = require("../utils/dateFormat");

const bonsaiSchema = new Schema({
    title: {
      type: String,
      minlength: [3, 'Must be at least 3 characters, got {VALUE}'],
      maxlength: 30,
    }, 
    dateGrown: {
      type: Date,
      default: Date.now(),
      get: (timestamp) => dateFormat(timestamp),
    },
    treeFamily: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    imageBonsai: [
      {
        type: String,
      }
    ],
    chapters: [
      {
        chapterIMG: [String],
        age: String,
        chapterStage: String,
        chapterDescription: String,
      }
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
);

const Bonsai = model("Bonsai", bonsaiSchema);

module.exports = Bonsai