import mongoose from "mongoose";


const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🎉🎉Conectado correctamente a la DB de EduSafe🎉🎉\nGracias por ser parte de este gran proyecto🥰');
  } catch (error) {
    console.error('Error de conexión a la base de datos!: ❌❌', error);
    process.exit(1);
  }
};
export default connectDB;
