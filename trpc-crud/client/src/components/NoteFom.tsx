import { useState,ChangeEvent,FormEvent } from 'react';
import {trpc} from "../trpc"

const estadoInicial ={
    titulo:"",
    descripcion:"",
}
function NoteFom() {

const [note, setNote] =useState(estadoInicial);

//Esto da acceso a la funcion que está declarada en el back
const agregarNota = trpc.note.create.useMutation()

//utilizando trpc volvemos a obtener los datos de la base de datos para mostrarlos en el front sin la necesidad de darle F5
const utils = trpc.useContext();

const manejarSubmit=(evento:FormEvent<HTMLFormElement>)=>{
    evento.preventDefault()
    console.log(note.descripcion)
    console.log(note.titulo)
    agregarNota.mutate(note,{
      //Cuando todo vaya bien vas a ejecutar esta funcion
      
      onSuccess:()=>{
        console.log("Nota agregada de forma correcta")
        utils.note.get.invalidate()
        setNote(estadoInicial);
      },
    })
}

//Permite llenar el valor de la nota cada vez que el usuario escriba algo
const manejarCambios = (evento:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
    setNote({ ...note,[evento.target.name]: evento.target.value})
}

  return (
    <form onSubmit={manejarSubmit}
      className='bg-zinc-900 p-10 rounded-md'
    >
        <input 
        type = "text" 
        placeholder="Titulo" 
        name = "titulo" 
        autoFocus 
        value={note.titulo}
        onChange={manejarCambios}
        className='bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3'
        />

        <textarea
      
         name = "descripcion" 
         placeholder="Descripcion" 
         value={note.descripcion}
         onChange={manejarCambios}
         className='bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3'
         ></textarea>

        <button 
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >Guardar</button>
    </form>
  )
}

export default NoteFom