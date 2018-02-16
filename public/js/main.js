    var ligthbox = document.querySelector('.ligthbox');
    var ligthbox_body = document.querySelector('.ligthbox_body');
    function show_modal(type, id) {
      ligthbox.style.display = "block";
      console.log(ligthbox_body);
      ligthbox_body.innerHTML = type+" id : "+id;

    }
    function hide_modal() {
      ligthbox.style.display = "none";
    }