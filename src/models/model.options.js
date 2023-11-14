const modelOptions = {
  // customize how to JSON and Object work
  toJSON: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  // disable the "__v" attribute in Schema
  versionKey: true,
  timestamps: true,
};
export default modelOptions;
