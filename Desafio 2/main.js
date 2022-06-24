const fs = require("fs");

class Contenedor {
    constructor(filename) {
        this.filename = filename;
        this.id_counter = 0;
    }

    getLastId(product_array) {
        if (product_array.length === 0) return 0;

        return Math.max(...product_array.map((product) => product.id));
    }

    save(product) {
        // Get all products
        let products_array = this.getAll();
        if (products_array.length === 0) {
            console.log("\x1b[32m", "\r[+] Creando el archivo");
        }

        // Get Last Id
        this.id_counter = this.getLastId(products_array);

        // Increment ID
        this.id_counter++;

        // Add ID
        product.id = this.id_counter;

        // Add product
        products_array.push(product);

        // Save file
        fs.writeFileSync(
            `./${this.filename}.json`,
            JSON.stringify(products_array, null, 4),
            (err) => {
                if (err) throw err;
                console.log(
                    "\x1b[32m",
                    `\r[+] El producto con id ${this.id_counter} ha sido guardado con exito!`
                );
            }
        );
    }

    saveMany(products_array) {
        // Save file
        fs.writeFileSync(
            `./${this.filename}.json`,
            JSON.stringify(products_array, null, 4),
            (err) => {
                if (err) throw err;
                console.log(
                    "\x1b[32m",
                    `\r[+] Los siguientes productos han sido guardados con exito: ${products_array.map(
                        (p) => p.id
                    )}!`
                );
            }
        );
    }

    getById(id) {
        try {
            let data = this.getAll();

            let product = data.filter((p) => p.id === id);
            if (product.length === 0) {
                return null;
            } else {
                return product[0];
            }
        } catch (error) {
            console.error(
                "\x1b[31m",
                "\r[!] Error al abrir el archivo en el metodod getById. Es posible que el mismo no exista",
                error
            );
            return [];
        }
    }

    getAll() {
        try {
            let data = fs.readFileSync(`./${this.filename}.json`);
            return JSON.parse(data);
        } catch (error) {
            console.error(
                "\x1b[31m",
                "\r[!] Error al abrir el archivo en el metodod getAll. Es posible que el mismo no exista"
            );
            return [];
        }
    }

    deleteById(id) {
        try {
            let data = this.getAll();

            let products = data.filter((p) => p.id !== id);
            if (products.length === data.length) {
                console.error(
                    "\x1b[31m",
                    "\r[!] No existe nigun producto con ese ID"
                );
            } else {
                this.saveMany(products);

                console.log("\x1b[32m", "\r[+] Producto borrado con exito");
            }
        } catch (error) {
            console.error(
                "\x1b[31m",
                "\r[!] Error al abrir el archivo en el metodod getById. Es posible que el mismo no exista",
                error
            );
        }
    }

    deleteAll() {
        fs.writeFileSync(`./${this.filename}.json`, "", (err) => {
            if (err) throw err;
            console.log(
                "\x1b[32m",
                `\r[+] Todos los productos han sido borrados con exito!`
            );
        });
    }
}



// ----------- MAIN -------------------
container = new Contenedor("products");

container.save({
    title: "Pork - Belly Fresh",
    thumbnail: "http://dummyimage.com/201x100.png/ff4444/ffffff",
    price: 66.52,
});


let product = container.getById(8)
console.log("Producto solicitado: ",product);

let products = container.getAll()
console.log("Todos los productos",products)

container.deleteById(8)

// container.deleteAll()