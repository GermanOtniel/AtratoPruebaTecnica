const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v, done) {
        const self = this["email"] ? this : this.getUpdate()["$set"];
        return new Promise(async(resolve, reject) => {
          mongoose.model("User").find({ 
            _id: { $ne: self._id }, email: self.email 
          })
          .then(users => {
            if (users.length > 0) resolve(false);
            else resolve(true);
          })
          .catch(err => reject(err))
        })
      },
      message: "Un usuario con el mismo correo electrónico ha sido creado anteriormente"
    }
  },
  analist_id: {
    type: Schema.Types.ObjectId,
    ref: "Analyst",
    required: true
  },
  birth_date: {
    type: Date,
    required: true,
  },
  first_name: {
    type: String,
    required: true
  },
  second_name: {
    type: String,
    required: false
  },
  first_last_name: {
    type: String,
    required: true
  },
  second_last_name: {
    type: String,
    required: false
  },
  f_name: {
    type: String,
    required: false
  },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: function(v, done) {
        const self = this["phone_number"] ? this : this.getUpdate()["$set"];
        return new Promise(async(resolve, reject) => {
          mongoose.model("User").find({ 
            _id: { $ne: self._id }, phone_number: self.phone_number 
          })
          .then(users => {
            if (users.length > 0) resolve(false);
            else resolve(true);
          })
          .catch(err => reject(err))
        })
      },
      message: "Un usuario con el mismo número de teléfono ha sido creado anteriormente"
    }
  },
  status: {
    type: String,
    enum : ["PENDIENTE", "EN PROCESO", "COMPLETADO"],
    default : "PENDIENTE",
    required: true
  },
  card_number: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  pin: {
    type: Number,
    required: true
  },
  exp: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model("User", userSchema);