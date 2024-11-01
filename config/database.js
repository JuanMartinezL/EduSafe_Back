import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      
    });
    console.log('🎉🎉Conectado correctamente a la DB de EduSafe🎉🎉\nGracias por ser parte de este gran proyecto🥰');
  } catch (error) {
    console.error('Error de conexión a la base de datos!: ❌❌', error.message);
    process.exit(1);
  }
};
export default connectDB;
