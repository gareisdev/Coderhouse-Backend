/**
 * Titulo: Desafio "Clases"
 * Autor: GAREIS, Leonel D.G.
 */



// Punto 1
class Usuario {
    // Punto 2
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = new Array();
        this.mascotas = new Array();
    }

    // Punto 3
    getFullName() {
        return `${this.apellido}, ${this.nombre}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascota() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({ nombre: nombre, autor: autor });
    }

    getBookNames() {
        return this.libros.map((libro) => libro.nombre);
    }
}

// Punto 4
user1 = new Usuario("Leonel", "Gareis");

// Obtener nombre completo
const fullname = user1.getFullName();
console.log(`Nombre completo: ${fullname}`);

// Agregar Mascotas
user1.addMascota("Pepe");
user1.addMascota("Manolo");
console.log(`Mascotas registradas: ${user1.mascotas}`);

// Cantidad de mascotas
const cantidad_mascotas = user1.countMascota();
console.log(`Cantidad de mascotas: ${cantidad_mascotas}`);

// Agregar libros
user1.addBook("Alicia en el pais de las maravillas", "Lewis Carroll");
user1.addBook("Star Wars I", "George Lucas");
user1.addBook("Yo Robot", "Isaac Asimov");

// Obtener nombres de los libros
const libros = user1.getBookNames()
console.log(`Nombres de libros registrados: ${libros}`);
