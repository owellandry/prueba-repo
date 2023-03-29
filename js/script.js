// Crear la base de datos
const dbName = "formularioDB";
const dbVersion = 1;
const request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = event => {
  const db = event.target.result;
  const objectStore = db.createObjectStore("formularios", { keyPath: "id", autoIncrement: true });
};

request.onerror = event => {
  console.error("Error al abrir la base de datos:", event.target.error);
};

// Agregar los datos del formulario a la base de datos
const form = document.querySelector("form");
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", event => {
  event.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const psicologa = document.querySelector("#psicologa").value;
  const tel = document.querySelector("#tel").value;
  const fecha = document.querySelector("#fecha").value;
  const hora = document.querySelector("#hora").value;
  const comentario = document.querySelector("#comentario").value;

  const formData = { nombre, psicologa, tel, fecha, hora, comentario };

  const transaction = request.result.transaction("formularios", "readwrite");
  const objectStore = transaction.objectStore("formularios");

  const requestAdd = objectStore.add(formData);

  requestAdd.onsuccess = event => {
    console.log("Formulario guardado correctamente en la base de datos");
    mostrarFormulariosGuardados();
  };

  requestAdd.onerror = event => {
    console.error("Error al guardar el formulario en la base de datos:", event.target.error);
  };
});

// Mostrar los formularios guardados en la base de datos
function mostrarFormulariosGuardados() {
  const transaction = request.result.transaction("formularios", "readonly");
  const objectStore = transaction.objectStore("formularios");

  const requestGetAll = objectStore.getAll();

  requestGetAll.onsuccess = event => {
    const formulariosGuardados = event.target.result;
    const ul = document.querySelector("#formularios-guardados");
    ul.innerHTML = "";
    formulariosGuardados.forEach(formulario => {
      const li = document.createElement("li");
      li.innerHTML = `
        <p>Hora: ${formulario.hora}</p>
        <p>Fecha: ${formulario.fecha}</p>
        <p>Nombre: ${formulario.nombre}</p>
        <p>tel: ${formulario.tel}</p>
        <p>Comentario: ${formulario.comentario}</p>
      `;
      ul.appendChild(li);
    });
  };
  {
    requestGetAll.onerror = event => {
      console.error("Error al obtener los formularios guardados:", event.target.error);
    };
  }
}