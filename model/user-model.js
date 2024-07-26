const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor, introduza o nome do usuario"],
    },
    email: {
      type: String,
      required: [true, "Por favor, introduza o email do usuario"],
      unique:true,
      lowercase:true,
     
    },
    password:{
        type: String,
      required: [true, "Por favor, introduza a senha do usuario"],
    }
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
