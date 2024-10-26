import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🎉🎉Conectado correctamente a la DB🎉🎉');
  } catch (error) {
    console.error('Error de conexión a la base de datos!: ❌❌', error);
    process.exit(1);
  }
};
export default connectDB;
