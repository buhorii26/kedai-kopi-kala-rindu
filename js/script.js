//toggle class active untuk hamburger menu
const navbarList = document.querySelector
('.navbar-list');
//ketika hamburger menu di klik 
document.querySelector('#hamburger-menu').onclick = ()=> {
    navbarList.classList.toggle('active');
};

//toggle class active untuk search
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
//ketika search di klik
document.querySelector('#search-button').onclick = (e)=> {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
} 

//toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
const cardItem = document.querySelector('.cart-item');
//ketika icon shopping cart di klik
document.querySelector('#shopping-cart-button').onclick = (e)=> {
    shoppingCart.classList.toggle('active');
    cardItem.focus();
    e.preventDefault();
}

//klik diluar elemen
const hamburger = document.querySelector('#hamburger-menu');
const searchbtn = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-card-button');

document.addEventListener('click',function(e){
if(!hamburger.contains(e.target) && !navbarList.contains(e.target)){
    navbarList.classList.remove('active');
}

if(!searchbtn.contains(e.target) && !searchForm.contains(e.target)){
    searchForm.classList.remove('active');
}

if(!sc.contains(e.target) && !shoppingCart.contains(e.target)){
    shoppingCart.classList.remove('active');
}
});

//modal box
const itemDetailModal = document.querySelector('#item-detail-modal');
const detailBtn = document.querySelectorAll('.item-detail-btn');
detailBtn.forEach((btn) => {
btn.onclick = (e) => {
    itemDetailModal.style.display='flex';
    e.preventDefault();
};
})


//click tombol close
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
}

//klik diluar modal
window.onclick = (e) => {
    if (e.target === itemDetailModal)
    itemDetailModal.style.display ='none';
}