const deliveryFee = 500;
const whatsappNumber = "2348089099685";
let cart = [];

const products = [
  {name:"Beef Shawarma + 1 Hotdog", price:2500, image:"beef-sausage-shawarma-recipe-main-photo.jpg"},
  {name:"Beef Shawarma + 2 Hotdogs", price:3000, image:"item242193189.jpg"},
  {name:"Chicken Shawarma + 1 Hotdog", price:3000, image:"ym7lhpiyosyudyefblvh.jpg"},
  {name:"Chicken Shawarma + 2 Hotdogs", price:3500, image:"item153738991.jpg"},
  {name:"Jumbo Shawarma", price:6000, image:"1400x919-SausageMeatballMeltPittas-de071294-9bc8-465f-b23e-84c86872573a-0-1400x919.jpg"}
];

const menu = document.getElementById("menu");

// Render Menu
function renderMenu(){
  menu.innerHTML = products.map((p,i)=>`
    <div class="card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₦${p.price}</p>
      <button onclick="addToCart(${i})">Add to Cart</button>
    </div>
  `).join('');
}
renderMenu();

// HERO ANIMATION
window.addEventListener('load', () => {
  const heroText = document.querySelector('.hero h2');
  setTimeout(() => heroText.classList.add('show'), 200);
});

// Cart Functions
function addToCart(index){
  const item = products[index];
  const exist = cart.find(p=>p.name===item.name);
  if(exist) exist.quantity++;
  else cart.push({...item, quantity: 1});
  animateFly(index);
  updateCart();
}

// Animate item flying to cart
function animateFly(index){
  const card = document.querySelectorAll(".card")[index];
  const img = card.querySelector("img");
  const flyImg = img.cloneNode(true);
  flyImg.classList.add("fly");
  document.body.appendChild(flyImg);

  const rect = img.getBoundingClientRect();
  flyImg.style.top = rect.top+"px";
  flyImg.style.left = rect.left+"px";

  const cartIcon = document.getElementById("openCart");
  const cartRect = cartIcon.getBoundingClientRect();

  setTimeout(()=>{
    flyImg.style.top = cartRect.top+"px";
    flyImg.style.left = cartRect.left+"px";
    flyImg.style.width = "20px";
    flyImg.style.height = "20px";
    flyImg.style.opacity = "0.5";
  },50);

  setTimeout(()=>flyImg.remove(),800);
}

// Update Cart
function updateCart(){
  const cartList = document.getElementById("cart");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");
  const emptyMsg = document.getElementById("emptyMessage");

  cartList.innerHTML = '';
  let subtotal = 0;
  if(cart.length === 0) emptyMsg.style.display = 'block';
  else emptyMsg.style.display = 'none';

  cart.forEach((item,i)=>{
    subtotal += item.price * item.quantity;
    cartList.innerHTML += `
      <li>
        <div>${item.name}<br>₦${item.price} x ${item.quantity}</div>
        <div>
          <button onclick="decreaseQty(${i})">-</button>
          <button onclick="increaseQty(${i})">+</button>
          <button onclick="removeItem(${i})">🗑</button>
        </div>
      </li>
    `;
  });

  subtotalEl.textContent = subtotal;
  totalEl.textContent = subtotal + deliveryFee;
  countEl.textContent = cart.reduce((sum,i)=>sum+i.quantity,0);
}

function increaseQty(i){cart[i].quantity++; updateCart();}
function decreaseQty(i){if(cart[i].quantity>1) cart[i].quantity--; else cart.splice(i,1); updateCart();}
function removeItem(i){cart.splice(i,1); updateCart();}

// Cart Drawer
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

document.getElementById("openCart").onclick = () => {cartDrawer.classList.add("open"); overlay.style.display="block";}
document.getElementById("closeCart").onclick = closeCart;
overlay.onclick = closeCart;

function closeCart(){
  cartDrawer.classList.remove("open");
  overlay.style.display = "none";
}

// Dark Mode
document.getElementById("themeToggle").onclick = () => {document.body.classList.toggle("dark");}

// Checkout via WhatsApp
document.getElementById("checkoutBtn").onclick = checkout;

function checkout(){
  if(cart.length === 0){ alert("Cart is empty"); return;}
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;
  if(!address){ alert("Enter delivery address"); return; }

  let msg = `Hello Shawarma Chop 5ive!\n\nOrder:\n`;
  cart.forEach(item => { msg += `${item.name} x${item.quantity} - ₦${item.price*item.quantity}\n`; });

  let subtotal = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  let total = subtotal + deliveryFee;

  msg += `\nSubtotal: ₦${subtotal}\nDelivery: ₦${deliveryFee}\nTotal: ₦${total}\n`;
  msg += `\nAddress: ${address}\nPayment: ${payment}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,"_blank");

  cart = [];
  updateCart();
  closeCart();
}

// Card Slide-In Animation
const cards = document.querySelectorAll('.card');
function slideInCards(){
  const triggerBottom = window.innerHeight * 0.85;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom) card.classList.add('show');
  });
}
window.addEventListener('scroll', slideInCards);
window.addEventListener('load', slideInCards);
window.addEventListener('scroll', slideInCards);
window.addEventListener('load', slideInCards);

