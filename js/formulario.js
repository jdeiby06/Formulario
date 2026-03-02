document.getElementById("imagen").addEventListener("change", function(event){
let file = event.target.files[0];
let preview = document.getElementById("previewImg")

if(file){
    let reader = new FileReader();
    reader.onload=function(e){
        preview.src=e.target.result;
        preview.style.display = "block";
    }
    reader.readAsDataURL(file)
}else{
    preview.src = "";
    preview.style.display = "none"
    }
});

//Validaciones

document.getElementById("productoForm").addEventListener("submit", function(event){
    event.preventDefault(); //Evita el envio del formulario y la recarga de la pagina

    let nombre = document.getElementById("nombre").value.trim();
    let precio = document.getElementById("nit").value.trim();
    let categoria = document.getElementById("categoria").value;
    let imagenInput = document.getElementById("imagen");
    let imagen = document.getElementById("previewImg").src;
     
    //Valida si hay una imagen
    if (imagenInput.files.length === 0){
        alert("Por favor, selecciona una imagen.");
        return;
    }

    //Valida que los campos no esten vacios
    if (!nombre || !precio || !categoria){
        alert("Por Favor, completa todos los campos.");
        return;
    }
    // Recupera el array de productos del localStorage si no existe crea un array vacio
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push((nombre,precio,categoria,imagen));

    //Guarda el array en el localstorage
    localStorage.setItem("productos", JSON.stringify(productos));
    
    alert("Producto guardado en localStorage ✅");

    location.reload()//recarga la pagina para mostrar el formulario vacio

});