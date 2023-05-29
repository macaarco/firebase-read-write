import { crearProducto, onValue, productosRef } from "./firebase.js";

const formulario = document.getElementById("insertar-producto");
const listaProductos = document.getElementById("lista-productos");

window.addEventListener("DOMContentLoaded", () => {
  onValue(productosRef, (snapshot) => {
    let html = "";

    snapshot.forEach((snap) => {
      html += `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top img-thumnail" src="${
              snap.val().urlImagen
            }" />  
            <div class="card-body">      
              <h5 class="card-title">${snap.val().nombre}</h3>
              <p class="card-text">${snap.val().descripcion}</p>
            </div>
        </div>
        `;
    });

    listaProductos.innerHTML = html;
  });
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombreProducto = document.getElementById("nombre-producto").value;
  const descripcionProducto = document.getElementById(
    "descripcion-producto"
  ).value;
  const numeroCupos = document.getElementById("cupos").value;
  const imagen = document.getElementById("imagen").files;

  crearProducto(nombreProducto, descripcionProducto, imagen, numeroCupos);
  formulario.reset();
});
