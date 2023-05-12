import { trpc } from "../trpc";


//De el valor del id no nos preocupamos porque la base de datos lo genera en automatico
interface Props{
    note:{
        _id: string;
        titulo: string;
        descripcion : string;
        completada: boolean;
    }
}

export function NoteCard({note}:Props) {

  const borrandoNota = trpc.note.delete.useMutation();
  const cambiarNota = trpc.note.completada.useMutation();
  const utils = trpc.useContext();

  return ( 
    <div className="bg-zinc-800 p-2 my-2 flex justify-between"> 
      <div>
        <h1 className="font-bold text-xl">{note.titulo}</h1>
        <p>{note.descripcion}</p>
      </div>

        <div className="flex gap-2">
        <button
          onClick={()=>{
            borrandoNota.mutate(note._id,{
              //Esto acutalizara la lista solo si todo fue bien 
              onSuccess:(data)=>{
                if(data){
                utils.note.get.invalidate();
                }
              },
              ///Para manejar los errores desde el front
              onError:(error)=>{
                console.log(error)
              }
            });
          }}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Borrar
        </button>

        <button onClick={async()=>{
          await cambiarNota.mutate(note._id,{
            onSuccess(data){
              if(data){
                utils.note.get.invalidate();
              }
            }
          })
        }}
        className={` font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${note.completada ? "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700":"text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"}`}
        >
          {note.completada ? "Completada": "Pendiente"}
        </button>
        </div>
    </div>
  )
}

