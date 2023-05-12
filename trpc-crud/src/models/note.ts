import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose"


//atributos extra por si quiero mas informacion de mi clase dentro de mongo DB
@modelOptions({
    schemaOptions:{
        timestamps: true
    }
})
export class Note {

    @prop({type: String})
    titulo:String;

    @prop({type: String})
    descripcion: String;
    
    //Las notas por defecto vienen sin completar
    @prop({type: Boolean, default: false})
    completada: Boolean;

}

export default getModelForClass(Note)