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

