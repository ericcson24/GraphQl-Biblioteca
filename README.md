# GraphQl-Biblioteca

Objetivo:
Desarrollar un API en GraphQL que me permita gestionar una agenda de contactos.

Los resolvers deben ser los siguientes

addContact, cuyos parámetros deben ser:
_Nombres y apellidos, tipo: _"Alberto Romero Sanz"*
Número de teléfono incluyendo prefijo nacional, tipo: "+34645543345"
getContact, cuyo parámetro debe ser el id generado por mongo y que devuelve:
Nombres y apellidos.
Número de teléfono
País de residencia
Hora actual de la capital del país de residencia.
getContacts, que devuelve todos los contactos, con los campos arriba mencionados.
deleteContact cuyo parámetro debe ser el id generado por mongo y que devuelve verdadero o false en función de si el contacto se ha borrado satisfactoriamente o no.
updateContact cuyo parámetro debe ser el id generado por mongo y los nuevos datos del contacto, se puede modificar tanto el nombre como el teléfono o ambos (pero no es obligatorio que sean ambos). Devuelve los datos del nuevo contacto.
Notas:

Se debe comprobar que el número de teléfono es correcto (a través del uso de una API). Si no es correcto la mutation devolverá un error de GraphQL Se realizará en el lugar del código que sea más oportuno.
No se permite más de 1 usuario con el mismo teléfono. Esto se debe comprobar a través de mongoose, no en un controller o resolver
Para obtener la información pertinente se puede usar cualquiera de las APIs disponibles en https://api-ninjas.com/ . Los alumnos pueden consultar libremente esta web.
Entrega:
Enlace a una release de github
Archivo comprimido generado en la release
Enlace al despliegue de la aplicación en Deno Deploy.
La falta de los dos primeros elementos supone un 0 en el examen

(La aplicación en Deno Deploy debe ser completamente funcional, guardando los datos en la DDBB correctamente)
