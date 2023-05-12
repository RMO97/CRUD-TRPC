import { publicProcedure, router } from "../trpc";
import {z} from 'zod'
import Note from "../models/note";

const getNotes = publicProcedure.query(async()=>{
    const notes = await Note.find()
    return notes
})

//Input es porque la mutacion va a esperar un parametro en forma de objeto pero en este caso se transforma a lo que el usario introduzca
//Ademas de que trpc puede recibir los datos pero debido a que es TS se deben validar y para ello utilizamos ZOD
const createNote = publicProcedure.input(z.object({
    titulo: z.string(),
    descripcion: z.string(),
    })
)
.mutation(async({input})=>{
    console.log(input)

    const nuevaNote = new Note({
        
        titulo: input.titulo,
        descripcion: input.descripcion,

    })
    console.log(nuevaNote)
    const NotaGuardada = await nuevaNote.save()
    return NotaGuardada 
})

//dentro de la mutacion ejecutamos la funcion como tal, ademas es un string ya que estamos ocupando un GUID como id
const deleteNote = publicProcedure
    .input(z.string())
    .mutation(async({input})=>{

    //Asimismo si se quisiera hacer el manejo de errores aqui en el back es posible hacerlo mediante throw error y poner que hace el error    

    //Este metodo todo bello encuentra el id y lo borrar
    const existeNota = await Note.findByIdAndDelete(input);

    //Aqui solo es para el manejo de errores
    if(!existeNota) throw new Error("No se encontró tu nota");

    return true;
})


//funcion flechita porque la funcion mutation recibe una funcion como parametro
const cambiarACompletada = publicProcedure.input(z.string()).mutation(async({input})=>{
    try {
        const existeNota = await Note.findById(input);
        if(!existeNota) throw new Error("No se encontró tu nota");
        //Esto es lo mismo que decir si es false transformalo a true y viceversa 
        existeNota.completada = !existeNota.completada
        await existeNota.save()
        return true
    } catch (error) {
        console.log(error)
        return false
    }

})

export const notesRouter = router({
    create : createNote,
    get: getNotes,
    delete: deleteNote,
    completada : cambiarACompletada,
})