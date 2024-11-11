import app from "./app";
import mongoose from "mongoose";

async function main() {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/todolist4B"
        )
        console.log("Conexion a la BD creada con exito")
        app.listen(4000, ()=>{
            console.log("Servidor creado con exito")
        })
    } catch (error) {
        console.log("Ocurrio un error al inicializar la aplicacion")
    }
}

main()