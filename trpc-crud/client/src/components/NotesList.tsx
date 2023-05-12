import {trpc} from "../trpc"
import { NoteCard } from "./NoteCard"

function NotesList() {

    const {data, isLoading, isError, error} = trpc.note.get.useQuery();

    if(isLoading)return <div>Cargando...</div>;
    if(isError) return <div>Error...{error.message}</div>; 
    
    console.log(data);

  return (
    <>
      {data.map((note: any) =>(
        <NoteCard note={note} key={note._id}/>
      ))}
    </>
  )
}

export default NotesList