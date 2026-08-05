gsap.from(".top-image img", {
    y: -200,
    duration: 2,
    opacity:0,
    delay: 0,
})
gsap.from(".brand-name",{
    opacity: 0,
    duration: 2,
    delay: 2,
    y: -150,
})
document.addEventListener('DOMContentLoaded', function() {
  let cart = JSON.parse(localStorage.getItem('crumb_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('crumb_wishlist')) || [];

  function saveToStorage() {
    localStorage.setItem('crumb_cart', JSON.stringify(cart));
    localStorage.setItem('crumb_wishlist', JSON.stringify(wishlist));
  }

  function updateCounts() {
    const cartCountEl = document.getElementById('cart-count');
    const wishCountEl = document.getElementById('wishlist-count');
    if(cartCountEl) cartCountEl.innerText = cart.reduce((total, item) => total + item.qty, 0);
    if(wishCountEl) wishCountEl.innerText = wishlist.length;
  }

  function updateHearts() {
    document.querySelectorAll('.card').forEach(product => {
      const id = product.dataset.id;
      const heart = product.querySelector('.add-wishlist');
      if(!heart) return;
      if (wishlist.find(p => p.id == id)) {
        heart.classList.remove('fa-regular');
        heart.classList.add('fa-solid');
        heart.style.color = '#e63946';
      } else {
        heart.classList.remove('fa-solid');
        heart.classList.add('fa-regular');
        heart.style.color = '';
      }
    });
  }

  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = e.target.closest('.card');
      const item = {
        id: product.dataset.id,
        name: product.dataset.name,  
        price: parseInt(product.dataset.price),
        img: product.dataset.img,
        qty: 1
      };
      console.log("Adding:", item); 
      const existing = cart.find(p => p.id == item.id);
      if (existing) existing.qty++; 
      else cart.push(item);
      saveToStorage();
      updateCounts();
      alert(`${item.name} added to Cart!`);
    });
  });

  document.querySelectorAll('.add-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = e.target.closest('.card');
      const item = {
        id: product.dataset.id,
        name: product.dataset.name,
        price: parseInt(product.dataset.price),
        img: product.dataset.img
      };
      const existingIndex = wishlist.findIndex(p => p.id == item.id);
      if (existingIndex === -1) wishlist.push(item);
      else wishlist.splice(existingIndex, 1);
      saveToStorage();
      updateCounts();
      updateHearts(); 
    });
  });

  updateCounts(); 
  updateHearts(); 
});

const imageDetails = [
  "images/bg5.jpg",
  "images/bg6.jpg",
  "images/bg7.jpg",
  "images/bg9.jpg",
  "images/bg11.jpg",
  "images/bg13.jpg",
];

const imagePath = document.querySelector(".magic-behind img")
let index = 0;
setInterval(()=>{
  index++;
  if (index>=imageDetails.length)
    index = 0
  imagePath.src=imageDetails[index];
},3000)
gsap.from(".how-we-make-pstry-lft-image", {
    x: -200,
    opacity: 0,
    scrollTrigger: {
        trigger: ".how-we-make-pstry",
        start: "top 85%",
        end: "top 35%",
        scrub: 1
    }
});

gsap.from(".how-we-make-pstry-rgt-txt", {
    x: 200,
    opacity: 0,
    scrollTrigger: {
        trigger: ".how-we-make-pstry",
        start: "top 85%",
        end: "top 35%",
        scrub: 1
    }
});