import NotesList from "./components/NotesList";
import NoteFom from "./components/NoteFom";
//El mx w xl es para que ocupe el ancho maximo, el m auto es para que este centrado, el h screen es para que ocupe todo lo alto de la pag
// y el py es el padding que es un espaciado 

export function AppContent() {
  return (
    <div className="max-w-xl m-auto h-screen py-40">
        <h1 className="text-5xl font-bold text-center py-5 text-red-800">Notas</h1>
        <NoteFom/>
        <NotesList/>  
    </div>
    )
}

