console.log("Hola mundo");

const socket = io();

// Socket management
socket.on("products", (data) => {
  addProducts(data);
});


function createProduct(title, thumbnail, price) {
  const product = document.createElement("div");
  product.className = "card";

  product.innerHTML = `
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src=${thumbnail} alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder"> ${title} </h5>
                        ${price}
                    </div>
                </div>
            </div>
        </div>`;

  return product;
}

function addProducts(products){
    const list = document.querySelector("#products")
    list.innerHTML = ""
    for (const product of products) {
        let productDiv = createProduct(product.title, product.thumbnail, product.price);
        list.appendChild(productDiv);
    }

}

const form = document.querySelector("#form-products").addEventListener("submit", e => e.preventDefault())
const boton = document.querySelector("#save-product")

boton.addEventListener("click", e => {
    e.preventDefault()
    const title = document.querySelector("#product-title").value;
    const thumbnail = document.querySelector("#product-thumbnail").value;
    const price = document.querySelector("#product-price").value;

    socket.emit("products", JSON.stringify({title, thumbnail, price}))
    document.querySelector("#form-products").reset()
})