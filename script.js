const malla = document.getElementById("malla");

const ramos = [
  { nombre: "Fundamentos de la Psicología", semestre: 1 },
  { nombre: "Psicología del Desarrollo I", semestre: 1, abre: ["Psicología del Desarrollo II"] },
  { nombre: "Antropología Social", semestre: 1 },
  { nombre: "Taller de Competencias Comunicativas", semestre: 1 },
  { nombre: "Taller de Competencias para el Aprendizaje", semestre: 1 },
  { nombre: "Taller de Desarrollo personal I", semestre: 1, abre: ["Taller del Desarrollo Personal II"] },
  { nombre: "Taller 1: Autoconocimiento", semestre: 1, abre: ["Taller 2: Relaciones Humanas"] },

  { nombre: "Psicobiología", semestre: 2 },
  { nombre: "Psicología del Desarrollo II", semestre: 2 },
  { nombre: "Teorías Cognitivas", semestre: 2 },
  { nombre: "Teorías Psicoanalíticas", semestre: 2 },
  { nombre: "Pensamiento Matemático para Ciencias Sociales", semestre: 2 },
  { nombre: "Taller del Desarrollo Personal II", semestre: 2 },
  { nombre: "Taller 2: Relaciones Humanas", semestre: 2, abre: ["Taller 3: Identidad Profesional"] },

  { nombre: "Procesos Neuropsicológicos I", semestre: 3, abre: ["Procesos Neuropsicológicos II"] },
  { nombre: "Psicología de la Personalidad", semestre: 3 },
  { nombre: "Teorías Humanistas", semestre: 3 },
  { nombre: "Teorías Sistémicas", semestre: 3 },
  { nombre: "Epistemología de la Ciencia Psicológica", semestre: 3 },
  { nombre: "Cultura y Valores", semestre: 3 },
  { nombre: "Inglés Básico I", semestre: 3, abre: ["Inglés Básico II"] },

  { nombre: "Procesos Neuropsicológicos II", semestre: 4 },
  { nombre: "Psicología Social", semestre: 4 },
  { nombre: "Psicopatología del Adulto", semestre: 4 },
  { nombre: "Investigación Cualitativa", semestre: 4 },
  { nombre: "Persona y Sentido", semestre: 4 },
  { nombre: "Inglés Básico II", semestre: 4 },
  { nombre: "Evaluación del Desarrollo de Competencias I", semestre: 4, abre: ["Evaluación del Desarrollo de Competencias II"] },

  { nombre: "Políticas Sociales", semestre: 5 },
  { nombre: "Psicología Comunitaria", semestre: 5, abre: ["Diagnóstico en Psicología Comunitaria"] },
  { nombre: "Evaluación Psicológica Cognitiva", semestre: 5, abre: ["Evaluación Socioafectiva"] },
  { nombre: "Psicopatología Infanto Juvenil", semestre: 5 },
  { nombre: "Investigación Cuantitativa", semestre: 5 },
  { nombre: "Psicología Organizacional y del Trabajo", semestre: 5, abre: ["Diagnóstico en Psicología Organizacional"] },

  { nombre: "Psicología Educacional", semestre: 6, abre: ["Diagnóstico en Psicología Educacional"] },
  { nombre: "Diagnóstico en Psicología Comunitaria", semestre: 6 },
  { nombre: "Evaluación Socioafectiva", semestre: 6, abre: ["Diagnóstico en Psicología Clínica"] },
  { nombre: "Estadística para la Psicología", semestre: 6 },
  { nombre: "Diagnóstico en Psicología Organizacional", semestre: 6 },

  { nombre: "Diagnóstico en Psicología Educacional", semestre: 7 },
  { nombre: "Diagnóstico en Psicología Clínica", semestre: 7 },
  { nombre: "Psicología Clínica y Psicoterapia", semestre: 7 },
  { nombre: "Psicometría", semestre: 7 },
  { nombre: "Electivo 1", semestre: 7, abre: ["Electivo 2"] },
  { nombre: "Taller 3: Identidad Profesional", semestre: 7, abre: ["Taller 4: Ética Profesional en Psicología"] },
  { nombre: "Evaluación del Desarrollo de Competencias II", semestre: 7 },

  { nombre: "Intervención Psicológica I", semestre: 8, abre: ["Intervención Psicológica II"] },
  { nombre: "Proyecto de Investigación en Psicología", semestre: 8, abre: ["Seminario de Investigación en Psicología"] },
  { nombre: "Electivo 2", semestre: 8, abre: ["Electivo 3"] },
  { nombre: "Taller 4: Ética Profesional en Psicología", semestre: 8, abre: ["Taller 5: Autocuidado"] },

  { nombre: "Intervención Psicológica II", semestre: 9 },
  { nombre: "Seminario de Investigación en Psicología", semestre: 9 },
  { nombre: "Electivo 3", semestre: 9 },
  { nombre: "Taller 5: Autocuidado", semestre: 9 },

  { nombre: "Práctica Profesional Psicológica", semestre: 10, requiereTodos: true },
  { nombre: "Examen de Título y Grado", semestre: 10, requiereTodos: true },
];

const guardado = JSON.parse(localStorage.getItem("ramos_aprobados")) || [];

function renderMalla() {
  for (let i = 1; i <= 10; i++) {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    semestreDiv.innerHTML = `<h2>Semestre ${i}</h2>`;

    ramos.filter(r => r.semestre === i).forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo.nombre;
      div.dataset.nombre = ramo.nombre;

      if (!puedeActivarse(ramo)) {
        div.classList.add("disabled");
      }

      if (guardado.includes(ramo.nombre)) {
        div.classList.add("aprobado");
      }

      div.addEventListener("click", () => manejarClick(div, ramo));
      semestreDiv.appendChild(div);
    });

    malla.appendChild(semestreDiv);
  }
}

function puedeActivarse(ramo) {
  if (ramo.requiereTodos) {
    return ramos.every(r => !r.abre || guardado.includes(r.nombre));
  }
  if (!ramos.some(r => r.abre?.includes(ramo.nombre))) return true;
  return ramos.every(r => !r.abre?.includes(ramo.nombre) || guardado.includes(r.nombre));
}

function manejarClick(div, ramo) {
  if (div.classList.contains("disabled")) return;

  const aprobado = div.classList.toggle("aprobado");

  if (aprobado) {
    guardado.push(ramo.nombre);
  } else {
    const index = guardado.indexOf(ramo.nombre);
    if (index !== -1) guardado.splice(index, 1);
  }

  localStorage.setItem("ramos_aprobados", JSON.stringify(guardado));
  recargarMalla();
}

function recargarMalla() {
  malla.innerHTML = "";
  renderMalla();
}

renderMalla();

