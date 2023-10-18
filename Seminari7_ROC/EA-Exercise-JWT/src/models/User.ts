const mongoose = require('mongoose');
import bcrypt from 'bcrypt';
import config from 'config';


interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  rol: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true},
  username: { type: String, required: true},
  role: {type: String, required: true},
  
});

UserSchema.methods.encryptPassword = async (password:string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
UserSchema.methods.validatePassword = async function (password:string) {
  return bcrypt.compare(password, this.password);
};
const token =jwt.sign({id: UserSchema._id, email: UserSchema.email, role: UserSchema.role}, config.secret{expiresIn: 60*60*24});


export default mongoose.model("User", UserSchema);
