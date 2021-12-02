const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const analystSchema = new Schema({
  full_name: {
    type: String,
    required: true,
    validate: {
      validator: function(v, done) {
        const self = this["full_name"] ? this : this.getUpdate()["$set"];
        return new Promise(async(resolve, reject) => {
          mongoose.model("Analyst").find({ 
            _id: { $ne: self._id }, full_name: self.full_name 
          })
          .then(analysts => {
            if (analysts.length > 0) resolve(false);
            else resolve(true);
          })
          .catch(err => reject(err))
        })
      },
      message: "Un usuario con ese mismo nombre ha sido creado anteriormente"
    }
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model("Analyst", analystSchema);