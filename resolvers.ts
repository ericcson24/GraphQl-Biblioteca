//funciones graphql
import { Collection, ObjectId } from "mongodb";
import { Usuario, Libro, Prestamos } from "./types.ts";
import { validar_telefono,validar_correo } from "./utils.ts";
import { GraphQLError } from "graphql";

//siempre hay que ponerlo, proporciona acceso
type Context = {
    UsuariosCollection: Collection<Usuario>,
    LibroCollection: Collection<Libro>,
    PrestamosCollection: Collection<Prestamos>
}

type MutationArgsUsuarios = {
    id: string,
    nombre: string,
    telefono: string,
    correo: string,
    direccion: string
}

type MutationArgsLibros = {
    id: string,
    Titulo: string,
    AnioDePublicacion: string,  
    ISBN: string
}

type MutationArgsPrestamos = {
    id: string,        
    Usuario: string,
    Libro: string,
    Fecha_prestamo: string;
    Fecha_devolucion: string;
}

//resolvers se divide por asi decirlo en 3. lo que lleva los valores, query y mutation
export const resolvers = {
    Usuario: {
        id: (parent: Usuario) => parent._id.toString()
    },
    Libro: {
        id: (parent: Libro) => parent._id.toString(),
        AnioDePublicacion: (parent: Libro) => parent.AnioDePublicacion.toString()
    },
    Prestamos: {
        id: (parent: Prestamos) => parent._id.toString(),

        Usuario: async(
            parent: Prestamos,
            _:unknown,
            context: Context
        ) => await context.UsuariosCollection.findOne({ _id: new ObjectId (parent.Usuario)}),

        Libro: async(
            parent: Prestamos,
            _:unknown,
            context: Context
        ) => await context.LibroCollection.findOne({ _id: new ObjectId (parent.Libro) }),
        Fecha_prestamo: (parent:Prestamos) => parent.Fecha_prestamo.toString(),
        Fecha_devolucion: (parent:Prestamos) => parent.Fecha_devolucion.toString(),


    },
    
    //los gets
    Query: {
        getUser: async(
            _:unknown,
            args: Usuario,
            context: Context
        ):Promise<Usuario> => {
            const result = await context.UsuariosCollection.findOne({_id: new ObjectId(args._id)})
            if(!result) throw new GraphQLError("El usuario no existe")
            return result
        },
        getLibros: async(
            _:unknown,
            args: Libro,
            context: Context
        ):Promise<Libro[]> =>  await context.LibroCollection.find().toArray(),
        getBorrowedBooks: async(
            _:unknown,
            args: Prestamos,
            context: Context
        ):Promise<Prestamos[]> => await context.PrestamosCollection.find().toArray()
        
        
    },
    Mutation: {

        addUser: async(
            _:unknown,
            args: MutationArgsUsuarios,
            context: Context
        ):Promise<Usuario> => {
            const existePaciente = await context.UsuariosCollection.findOne({$or: [
                {correo: args.correo},
                {telefono: args.telefono}
            ]})
            if(existePaciente) throw new GraphQLError("Ya existe el usuario")
            if(!await validar_telefono(args.telefono)) throw new GraphQLError("El numero no existe")
            if(!await validar_correo(args.correo)) throw new GraphQLError("El correo no existe")
            const { insertedId } = await context.UsuariosCollection.insertOne({...args})
            return {
                _id: insertedId,
                ...args
            }

        },
        addBook: async(
            _:unknown,
            args: MutationArgsLibros,
            context: Context
        ):Promise<Libro> => {
            const existeLibro = await context.LibroCollection.findOne({
                Titulo: args.Titulo
                
            })
            if(existeLibro) throw new GraphQLError("Ya existe el libro")
            const { insertedId } = await context.LibroCollection.insertOne({
                Titulo:args.Titulo,
                ISBN:args.ISBN,
                AnioDePublicacion: new Date(args.AnioDePublicacion)    
            })
            return {
                _id: insertedId,
                Titulo:args.Titulo,
                ISBN:args.ISBN,
                AnioDePublicacion:new Date(args.AnioDePublicacion)
            }

        },
        borrowBook: async(
            _:unknown,
            args: MutationArgsPrestamos,
            context: Context
        ):Promise<Prestamos> => {
            
            const { insertedId } = await context.PrestamosCollection.insertOne({
                Usuario: new ObjectId(args.Usuario),
                Libro: new ObjectId(args.Libro),
                Fecha_prestamo: new Date(args.Fecha_prestamo),
                Fecha_devolucion: new Date(args.Fecha_devolucion),
            })
            return {
                _id: insertedId,
                Usuario: args.Usuario,
                Libro: args.Libro,
                Fecha_prestamo: new Date(args.Fecha_prestamo),
                Fecha_devolucion: new Date(args.Fecha_devolucion),
            }

        },
        
        deleteBorrow: async(
            _:unknown,
            args: Prestamos,
            context: Context 
        ):Promise<boolean> =>{
            const {deletedCount}= await context.PrestamosCollection.deleteOne({_id:new ObjectId(args._id)})
            if (deletedCount===0)return false
            return true
        },



        updateUser: async (
            _: unknown, 
            args: MutationArgsUsuarios,
            context: Context): Promise<Usuario> => {

            const { id, ...updateArgs } = args 
            const existePaciente = await context.UsuariosCollection.findOne({$or: [
                {correo: args.correo},
                {telefono: args.telefono}
            ]})
            if(existePaciente) throw new GraphQLError("El usuario ya existe")

            if (args.telefono) {
                const validacionTelefono = await validar_telefono(args.telefono);
                if (!validacionTelefono.is_valid) throw new GraphQLError("El número de teléfono no es válido");
            }
            if (args.correo) {
                const validacionCorreo = await validar_correo(args.correo);
                if (!validacionCorreo.is_valid) throw new GraphQLError("El correo electrónico no es válido");
            }
            
            const updateFields = {...args}
            const result = await context.UsuariosCollection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: {...updateArgs} },
                { returnDocument: "after" }
            );
            if (!result) throw new GraphQLError("Error al actualizar el usuario");
            return result;
        }
        



    }
}
