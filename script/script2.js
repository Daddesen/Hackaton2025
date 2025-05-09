const sideNav = document.querySelector(".sideNav")
  function toggleSideNav(){ 
    sideNav.classList.toggle("open")
  }

  function toggleContent(id) {
    const content = document.getElementById(id);
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  }