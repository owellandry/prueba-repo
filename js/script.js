const form = document.querySelector('#myForm');
const formDataContainer = document.querySelector('#form-data');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // evita el comportamiento predeterminado de envío del formulario

  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;
  const date = document.querySelector('#date').value;
  const time = document.querySelector('#time').value;
  const comment = document.querySelector('#comment').value;

  // Crear un elemento de lista y agregar los datos del formulario como elementos de lista
  const formDataList = document.createElement('ul');
  const nameItem = document.createElement('li');
  const ageItem = document.createElement('li');
  const dateItem = document.createElement('li');
  const timeItem = document.createElement('li');
  const commentItem = document.createElement('li');

  nameItem.textContent = `Nombre: ${name}`;
  ageItem.textContent = `Edad: ${age}`;
  dateItem.textContent = `Fecha: ${date}`;
  timeItem.textContent = `Hora: ${time}`;
  commentItem.textContent = `Comentario: ${comment}`;

  formDataList.appendChild(nameItem);
  formDataList.appendChild(ageItem);
  formDataList.appendChild(dateItem);
  formDataList.appendChild(timeItem);
  formDataList.appendChild(commentItem);

  // Agregar los datos del formulario a un contenedor de datos del formulario existente en la página
  formDataContainer.appendChild(formDataList);

  // Restablecer los valores del formulario después de enviar
  form.reset();
});
