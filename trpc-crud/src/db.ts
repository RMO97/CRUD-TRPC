import mongoose from "mongoose";

export const dbConnect = async()=>{
    try {
    mongoose.set("strictQuery", false)
    const db = await mongoose.connect("mongodb://localhost/notastrpcdb")
    console.log("Conexion establecida a ", db.connection.db.databaseName)
    }catch(error){
        if(error instanceof Error){
            console.error(error.message)
        }
    }
}