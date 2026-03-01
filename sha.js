let cart = JSON.parse(localStorage.getItem("cart")) || [];
let deliveryFee = 500;

// Save cart to localStorage
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price){
    let existing = cart.find(item => item.name === name);
    if(existing){
        existing.qty++;
    }else{
        cart.push({name, price, qty:1});
    }
    updateCart();
}

// Update cart UI
function updateCart(){
    let list = document.getElementById("cart");
    list.innerHTML="";
    let subtotal=0;
    let count=0;

    cart.forEach((item,index)=>{
        subtotal += item.price * item.qty;
        count += item.qty;

        let li=document.createElement("li");
        li.innerHTML=`
            ${item.name} x${item.qty}
            <div>
                <button onclick="changeQty(${index},-1)">-</button>
                <button onclick="changeQty(${index},1)">+</button>
                <button onclick="removeItem(${index})">❌</button>
            </div>
        `;
        list.appendChild(li);
    });

    document.getElementById("subtotal").innerText=subtotal;
    document.getElementById("total").innerText=subtotal + deliveryFee;
    document.getElementById("cart-count").innerText=count;

    saveCart();
}

// Change quantity
function changeQty(index, change){
    cart[index].qty += change;
    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }
    updateCart();
}

// Remove item
function removeItem(index){
    cart.splice(index,1);
    updateCart();
}

// Checkout — send order to WhatsApp
function checkout(){
    let address = document.getElementById("address").value;
    let payment = document.getElementById("payment").value;

    if(cart.length===0){
        alert("Cart is empty!");
        return;
    }
    if(address.trim()===""){
        alert("Enter delivery address!");
        return;
    }

    // Build WhatsApp message
    let message = "New Order 🚀%0A";
    cart.forEach(item=>{
        message += `${item.name} x${item.qty}%0A`;
    });
    let subtotal = cart.reduce((sum, item)=>sum + item.price*item.qty,0);
    let total = subtotal + deliveryFee;
    message += `Payment Method: ${payment}%0A`;
    message += `Address: ${address}%0A`;
    message += `Subtotal: ₦${subtotal}%0A`;
    message += `Delivery Fee: ₦${deliveryFee}%0A`;
    message += `Total: ₦${total}`;

    // Your WhatsApp number
    let number = "2348089099685";

    // Open WhatsApp
    window.open(`https://wa.me/${number}?text=${message}`,"_blank");

    // Clear cart
    cart=[];
    updateCart();
    document.getElementById("address").value="";
}

// Open/close cart drawer
document.getElementById("openCart").onclick=()=>{document.getElementById("cartDrawer").classList.add("open");};
document.getElementById("closeCart").onclick=()=>{document.getElementById("cartDrawer").classList.remove("open");};

// Dark mode toggle
document.getElementById("themeToggle").onclick=()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",document.body.classList.contains("dark"));
};

// Restore dark mode
if(localStorage.getItem("theme")==="true"){
    document.body.classList.add("dark");
}

updateCart();