const tareaInput = document.getElementById("tareaInput");
const fechaInput = document.getElementById("fechaInput");
const agregarBtn = document.getElementById("agregarBtn");
const listaTareas = document.getElementById("listaTareas");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas() {
  listaTareas.innerHTML = "";

  if (tareas.length === 0) {
    listaTareas.innerHTML = `
            <div class="vacio">
                No tienes tareas todavía 🎉
            </div>
        `;
    return;
  }

  tareas.forEach((tarea) => {
    const elemento = document.createElement("div");

    elemento.className = `tarea ${tarea.completada ? "completada" : ""}`;

    elemento.innerHTML = `
            <div class="info">
                <span class="nombre">${tarea.nombre}</span>
                <span class="fecha">
                    📅 ${tarea.fecha || "Sin fecha"}
                </span>
            </div>

            <div class="botones">
                <button class="completar" onclick="completarTarea(${tarea.id})">
                    ✓
                </button>

                <button class="eliminar" onclick="eliminarTarea(${tarea.id})">
                    🗑
                </button>
            </div>
        `;

    listaTareas.appendChild(elemento);
  });
}

function agregarTarea() {
  const nombre = tareaInput.value.trim();
  const fecha = fechaInput.value;

  if (nombre === "") {
    alert("Escribe una tarea primero.");
    return;
  }

  const nuevaTarea = {
    id: Date.now(),
    nombre: nombre,
    fecha: fecha,
    completada: false,
  };

  tareas.push(nuevaTarea);

  guardarTareas();
  mostrarTareas();

  tareaInput.value = "";
  fechaInput.value = "";
}

function completarTarea(id) {
  tareas = tareas.map((tarea) => {
    if (tarea.id === id) {
      tarea.completada = !tarea.completada;
    }

    return tarea;
  });

  guardarTareas();
  mostrarTareas();
}

function eliminarTarea(id) {
  tareas = tareas.filter((tarea) => tarea.id !== id);

  guardarTareas();
  mostrarTareas();
}

agregarBtn.addEventListener("click", agregarTarea);

tareaInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    agregarTarea();
  }
});

mostrarTareas();
