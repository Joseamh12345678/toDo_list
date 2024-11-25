import { UseModel } from "../models/Users";
import { Request, Response } from "express";

export default {
    signUp:async (req:Request, res:Response)=>{
        try {
            //obtener info de la peticion
            const name = req.body.name;
            const password = req.body.password;
            const email = req.body.email;
            const rol = req.body.rol;

            //validar que la info existe
            if(!name || !password || !email || !rol){
                res.status(400).json({msg:"Faltan parametros para crear un usuario."})
                return;
            }

            //creamos registro en la base de datos
            await UseModel.create({
                name,
                password,
                email,
                rol
            })

            res.status(200).json({msg:"Usuario almacenado con exito."})
            return;

        } catch (error) {
            console.log("El error ocurrido: ", error)
            res.status(500).json({msg:"ocurrio un error al registrar el usuario."})
            return;
        }
    },
    signIn:async (req:Request, res:Response)=>{
        try {
            //obtener los datos
            const email = req.body.email;
            const password = req.body.password;

            //Buscara al ususario con correo y contraseña
            const user = await UseModel.findOne({
                email,
                password
            })

            //validar que el usuario existe
            if(!user){
                res.status(400).json({msg:"No se encontro usuario con esas credenciales."})
                return;
            }
            res.status(200).json({msg:"El usuario inicio secion correctamente",user});
        } catch (error) {
            console.log("El error ocurrido: ", error)
            res.status(500).json({msg:"Ocurrio un error al iniciar sesion."})
            return;
        }
    }
}