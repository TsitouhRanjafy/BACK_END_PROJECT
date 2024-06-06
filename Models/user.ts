import {Schema,model} from "mongoose";

// Cette fois, on utilise pas d'interface 
// Creation du schema utilisateur
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // Ajout du date courant automatique
  { timestamps: true }
);

export const User = model("Users", UserSchema);