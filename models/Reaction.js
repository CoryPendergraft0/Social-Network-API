const { Schema, Types } = require('mongoose');

const timeSince = require('../utils/timeSince')

const reactionSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => timeSince(date)
    }
  },
  {
    toJSON: {      
      getters: true
    },
    id: false,
  }
);

module.exports = reactionSchema;