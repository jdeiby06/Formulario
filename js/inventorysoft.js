document.addEventListener("DOMContentLoaded", function () {

  // Se tuvo que modificar el codigo para que se adapte a los cambios realizados en el html, mas que todo por la adiccion del cuadro de texto para la categoria "otros".
  let tipoSelect = document.getElementById("tipo");
  let otroTipoContainer = document.getElementById("otroTipoContainer");
  let otroTipoInput = document.getElementById("otroTipo");
  let reporteForm = document.getElementById("reporteForm");
  let imagenInput = document.getElementById("imagen");
  let previewImg = document.getElementById("previewImg");

  // oculta el campo de texto para "otros" al cargar la pagina y hace que no sea requerido, ademas de ocultar la imagen de preview
  otroTipoContainer.style.display = "none";
  otroTipoInput.required = false;
  previewImg.style.display = "none";

  //preview de la imagen
  imagenInput.addEventListener("change", function(event){
      let file = event.target.files[0];
      if(file){
          let reader = new FileReader();
          reader.onload = function(e){
              previewImg.src = e.target.result;
              previewImg.style.display = "block";
          }
          reader.readAsDataURL(file);
      } else {
          previewImg.src = "";
          previewImg.style.display = "none";
      }
  });

  // mostrar u ocultar el campo de texto para "otros" dependiendo de la seleccion en el select de categorias
  tipoSelect.addEventListener("change", function () {
    if (this.value === "otros") {
      otroTipoContainer.style.display = "block";
      otroTipoInput.required = true;
    } else {
      otroTipoContainer.style.display = "none";
      otroTipoInput.required = false;
      otroTipoInput.value = "";
    }
  });

  // Guardar el reporte en localStorage con validaciones
  reporteForm.addEventListener("submit", function(event){
      event.preventDefault();

      let nombre = document.getElementById("nombre").value.trim();
      let nit = document.getElementById("nit").value.trim();
      let direccion = document.getElementById("direccion").value.trim();
      let correo = document.getElementById("correo").value.trim();
      let tipo = tipoSelect.value.trim();
      let descripcion = document.getElementById("descripcion").value.trim();

      // VALIDACIÓN DE CAMPOS VACÍOS
      if (!nombre || !nit || !direccion || !correo || !tipo || !descripcion){
          alert("Por favor, completa todos los campos.");
          return;
      }

      if (imagenInput.files.length === 0){
          alert("Por favor, selecciona una imagen.");
          return;
      }

      // VALIDAR CAMPO OTROS
      if (tipo === "otros" && !otroTipoInput.value.trim()) {
          alert("Por favor, especifique su tipo de problema.");
          return;
      }

      // GUARDAR EN LOCALSTORAGE
      let reportes = JSON.parse(localStorage.getItem("reportes")) || [];
      reportes.push({
          nombre,
          nit,
          direccion,
          correo,
          tipo: tipo === "otros" ? otroTipoInput.value.trim() : tipo,
          descripcion,
          imagen: previewImg.src
      });

      localStorage.setItem("reportes", JSON.stringify(reportes));
      alert("Reporte guardado en localStorage ✅ Gracias por tu colaboración, nuestro equipo te contactara por medio del correo para ayudarte con tu problema.");
      location.reload();
  });

});