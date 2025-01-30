import { ObjectId, OptionalId } from "mongodb";

//como se vera contacto
export type Usuario = OptionalId<{
    
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
    
}>;

export type Libro = OptionalId<{
    
    Titulo: string;
    ISBN: string;
    AnioDePublicacion: Date;
}>;

export type Prestamos= OptionalId< {
    
    Usuario: ObjectId;
    Libro: ObjectId;
    Fecha_prestamo: Date;
    Fecha_devolucion:Date;
    
}>;



//link de la api: https://api.api-ninjas.com/v1/validatephone
export type API_Phone = {
   is_valid : boolean;
   //no pide el ejercicio, pero lo quiro practicar
   is_formatted_properly : boolean;
};
export type API_Correo = {
    is_valid : boolean;
    
 };

