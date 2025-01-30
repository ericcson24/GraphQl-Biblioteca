# GraphQl-Biblioteca
**Objetivo**:
Desarrollar una API en GraphQL que gestione un sistema de préstamos de libros en una biblioteca.

**Colecciones**:
Usuarios: Contiene la información de los usuarios que pueden tomar libros en préstamo.

Libros: Contiene la información de los libros disponibles en la biblioteca.

Préstamos: Contiene la información de los libros prestados a los usuarios.

**Resolvers**:
  
  **addUser**
  
  Parámetros:
  
  Nombres y apellidos (ej. "Juan Pérez López")
  Número de teléfono con prefijo nacional (ej. "+34645543345")
  Correo electrónico (ej. "juan.perez@example.com")
  Dirección (ej. "Calle Mayor, 10, Madrid, España")
  Devuelve: El usuario recién creado con su ID.
  
  **addBook**
  
  Parámetros:
  
  Título del libro (ej. "El Quijote")
  Autor (ej. "Miguel de Cervantes")
  ISBN (ej. "978-3-16-148410-0")
  Año de publicación (ej. 1605)
  Devuelve: El libro recién agregado con su ID.
  
  **borrowBook**
  
  Parámetros:
  
  ID del usuario (generado por MongoDB).
  ID del libro (generado por MongoDB).
  Fecha de préstamo en formato ISO 8601.
  Fecha de devolución en formato ISO 8601.
  Devuelve: La información del préstamo creado, con los datos del usuario y el libro.


**Consultas** (Queries)

  
  **getUser**
  
  Parámetro: ID del usuario.
  Devuelve:
  
  Nombres y apellidos.
  Número de teléfono.
  Correo electrónico.
  Dirección.
  Lista de libros prestados con fechas de préstamo y devolución.
  
  **getBooks**
  
  Devuelve:
  
  Lista de todos los libros con su título, autor, ISBN y año de publicación.
  
  **getBorrowedBooks**
  
  Devuelve:
  
  Lista de libros prestados con la siguiente información:
  Título del libro.
  Nombre del usuario que lo tomó en préstamo.
  Fecha de préstamo y devolución.
  Eliminaciones y Actualizaciones
  
  **deleteBorrow**
  
  Parámetro: ID del préstamo.
  Devuelve: true o false según si el préstamo se ha eliminado correctamente.
  
  **updateUser**
  Parámetros:
  
  ID del usuario.
  Nuevos datos (nombre, teléfono, correo electrónico o dirección).
  Devuelve: Los datos actualizados del usuario.

Notas:
- Se debe validar el número de teléfono usando una API externa (por ejemplo, API Ninjas). Si no es válido, la mutación devolverá un error de GraphQL.
- Se debe validar el correo usando una API externa (por ejemplo, API Ninjas). Si no es válido, la mutación devolverá un error de GraphQL.
  
No se permite más de un usuario con el mismo número de teléfono o correo electrónico. Esto debe validarse con Mongoose.
No se permite prestar un libro que ya está en préstamo.
Entrega:
Enlace a una release de GitHub.
Archivo comprimido generado en la release.
Enlace al despliegue de la aplicación en Deno Deploy.
Si falta alguno de los dos primeros elementos, la calificación será 0.
