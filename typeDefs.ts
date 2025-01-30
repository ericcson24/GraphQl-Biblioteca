export const typeDefs = `#graphql
    type Usuario {
        id: ID!,
        nombre: String!,
        telefono: String!,
        correo: String!,
        direccion: String!
        
    }

    type Libro {
        id: ID!,
        Titulo: String!,
        AnioDePublicacion: String!,  
        ISBN: String!
    }

    type Prestamos {
        id: ID!,        
        Usuario: Usuario!,
        Libro: Libro!,
        Fecha_prestamo: String!,
        Fecha_devolucion:String!
    }
    
    type Query {
        
        getUser(id:String!):Usuario!
        getLibros:[Libro!]!
        getBorrowedBooks: [Prestamos!]!
    }

    type Mutation {
        addUser(nombre:String!, telefono:String!,correo:String!,direccion:String!):Usuario!
        addBook(Titulo:String!,ISBN:String!,AnioDePublicacion:String!):Libro!
        borrowBook(Usuario:ID!, Libro: ID!, Fecha_prestamo:String!,Fecha_devolucion:String!):Prestamos!

        deleteBorrow(id:ID!):Boolean!
        updateUser(id:ID!, nombre:String, telefono:String,correo:String, direccion:String):Usuario!
    }
`