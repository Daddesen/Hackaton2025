// Hämta alla bilderna i slidern
const images = Array.from(document.querySelectorAll('.slide img'));

// Spara originalbildkällorna i en array
let imageSources = images.map(img => img.getAttribute('src'));

function updateImages() {
  images.forEach((img, index) => {
    img.setAttribute('src', imageSources[index]);
  });
}

function left() {
  // Flytta första bilden till slutet
  imageSources.push(imageSources.shift());
  updateImages();
}

function right() {
  // Flytta sista bilden till början
  imageSources.unshift(imageSources.pop());
  updateImages();
}

function updateImages() {
  images.forEach((img, index) => {
    // Starta fade-out
    img.classList.add('fade-out');

    // Efter fade-out, byt bild och fade in
    setTimeout(() => {
      img.setAttribute('src', imageSources[index]);
      img.classList.remove('fade-out');
    }, 250); // Halva transitiontiden (0.5s)
  });
}



/*================================================================*/

  const sideNav = document.querySelector(".sideNav")
  function toggleSideNav(){ 
    sideNav.classList.toggle("open")
  }



  
  function toggleContent(id) {
    const content = document.getElementById(id);
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  }