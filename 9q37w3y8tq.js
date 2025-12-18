const burger1 = document.getElementById('burger1');
const nav1 = document.getElementById('nav1');
burger1.addEventListener('click', function() {
    burger1.classList.toggle('active');
    nav1.classList.toggle('active');
});