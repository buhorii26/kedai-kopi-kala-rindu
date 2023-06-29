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
document.querySelector('#search-btn').onclick = (e)=> {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
} 

//klik diluar elemen
const hamburger = document.querySelector('#hamburger-menu');
const searchbtn = document.querySelector('#search-btn');

document.addEventListener('click',function(e){
if(!hamburger.contains(e.target) && !navbarList.contains(e.target)){
    navbarList.classList.remove('active');
}

if(!searchbtn.contains(e.target) && !searchForm.contains(e.target)){
    searchForm.classList.remove('active');
}
});