const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS, PATCH",
    "Content-Type": "application/json, text/plain",
  },
};
const cart_items = document.querySelector("#cart .cart-items");
const parentContainer = document.getElementById("EcommerceContainer");
let productsSection = document.getElementById("music-content");
window.addEventListener("DOMContentLoaded", listAllProducts);

parentContainer.addEventListener("click", (e) => {
  if (
    e.target.className == "cart-btn-bottom" ||
    e.target.className == "cart-bottom" ||
    e.target.className == "cart-holder"
  ) {
    document.querySelector("#cart").style = "display:block;";
  }
  if (e.target.className == "cancel" || e.target.className == "cshopping-btn") {
    document.querySelector("#cart").style = "display:none;";
  }
  if (e.target.className == "purchase-btn") {
    if (parseInt(document.querySelector(".cart-number").innerText) === 0) {
      alert("You have Nothing in Cart , Add some products to purchase !");
      return;
    }
    alert("Thanks for the purchase");
    cart_items.innerHTML = "";
    document.querySelector(".cart-number").innerText = 0;
    document.querySelector("#total-value").innerText = `0`;
  }

  if (e.target.innerText == "X") {
    let total_cart_price = document.querySelector("#total-value").innerText;
    total_cart_price =
      parseFloat(total_cart_price).toFixed(2) -
      parseFloat(
        document.querySelector(
          `#${e.target.parentNode.parentNode.id} .cart-price`
        ).innerText
      ).toFixed(2);
    document.querySelector(".cart-number").innerText =
      parseInt(document.querySelector(".cart-number").innerText) - 1;
    document.querySelector(
      "#total-value"
    ).innerText = `${total_cart_price.toFixed(2)}`;
    e.target.parentNode.parentNode.remove();
  }
});

async function addToCart(id) {
  const prodId = {
    prodId: id,
  };
  // const id = e.target.parentNode.parentNode.id;
  let response = await axios.get(`http://localhost:3000/getProduct/${id}`);
  let productData = response.data;
  const name = productData.name;
  const img_src = productData.imgUrl;
  const price = productData.price;
  let total_cart_price = document.querySelector("#total-value").innerText;
  // if (document.querySelector(`#in-cart-${id}`)) {
  //   alert("This item is already added to the cart");
  //   return;
  // }
  total_cart_price = parseFloat(total_cart_price) + parseFloat(price);
  total_cart_price = total_cart_price.toFixed(2);
  document.querySelector("#total-value").innerText = `${total_cart_price}`;
  document.querySelector(".cart-number").innerText =
    parseInt(document.querySelector(".cart-number").innerText) + 1;
  await axios.post("http://localhost:3000/addToCart", prodId);
  console.log("Product succesfully added to cart!!");
  // .then(() => console.log("Product succesfully added to cart!!"))
  // .catch((err) => console.log(err));

  // const cart_item = document.createElement("div");
  // cart_item.classList.add("cart-row");
  // cart_item.setAttribute("id", `in-cart-${id}`);
  // cart_item.innerHTML = `
  //     <span class='cart-item cart-column'>
  //     <img class='cart-img' src="${img_src}" alt="">
  //         <span>${name}</span>
  // </span>
  // <span class='cart-quantity cart-column'>
  //     <input type="text" value="1">
  // <span class='cart-price cart-column remove-item'>${price}</span>
  //     <button>X</button>
  // </span>`;
  // cart_items.appendChild(cart_item);

  //notification
  const container = document.getElementById("container");
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
  container.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2500);
}

function listAllProducts() {
  axios.get("http://localhost:3000/getProducts").then((response) => {
    let productsList = response.data;
    for (product of productsList) {
      let productItem = `<div id="${product.id}">
      <p hidden id="${product.id}"></p>
      <h3>${product.name}</h3>
      <div class="image-container">
        <img class="prod-images" src="${product.imgUrl}" alt="" />
      </div>
      <div class="prod-details">
        <span>$<span>${product.price}</span></span>
        <button onclick=addToCart(${product.id}) class="shop-item-button" type="button">
          ADD TO CART
        </button>
      </div>
    </div>`;
      productsSection.innerHTML = productsSection.innerHTML + productItem;
    }
  });
}
