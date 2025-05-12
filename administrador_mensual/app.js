// Proyecto: Administrador de Ingresos y Gastos Mensuales
const ingresos = [];
const gastos = [];

// Función para agregar un ingreso
function agregarIngreso(descripcion, monto) {
    ingresos.push({ descripcion, monto });
    actualizarListas();
}

// Función para agregar un gasto
function agregarGasto(descripcion, monto) {
    gastos.push({ descripcion, monto });
    actualizarListas();
}

// Función para eliminar un ingreso por índice
function eliminarIngreso(index) {
    ingresos.splice(index, 1);
    actualizarListas();
}

// Función para eliminar un gasto por índice
function eliminarGasto(index) {
    gastos.splice(index, 1);
    actualizarListas();
}

// Función para actualizar las listas en la interfaz
function actualizarListas() {
    const listaIngresos = document.getElementById("lista-ingresos");
    const listaGastos = document.getElementById("lista-gastos");
    const balance = document.getElementById("balance");

    listaIngresos.innerHTML = ingresos
        .map(
        (ingreso, index) => `<li>${index + 1}. ${ingreso.descripcion}: $${ingreso.monto} <button onclick="eliminarIngreso(${index})">Eliminar</button></li>`
        )
        .join("");

    listaGastos.innerHTML = gastos
        .map(
        (gasto, index) => `<li>${index + 1}. ${gasto.descripcion}: $${gasto.monto} <button onclick="eliminarGasto(${index})">Eliminar</button></li>`
        )
        .join("");

    const totalIngresos = ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
    const totalGastos = gastos.reduce((total, gasto) => total + gasto.monto, 0);
    const balanceFinal = totalIngresos - totalGastos;

    balance.textContent = `Balance: $${balanceFinal}`;
}

// Función para manejar el formulario
function manejarFormulario(event) {
    event.preventDefault();
    const descripcion = document.getElementById("descripcion").value;
    const monto = parseFloat(document.getElementById("monto").value);
    const tipo = document.getElementById("tipo").value;

    if (tipo === "ingreso") {
        agregarIngreso(descripcion, monto);
    } else {
        agregarGasto(descripcion, monto);
    }

    document.getElementById("formulario").reset();
}

document.getElementById("formulario").addEventListener("submit", manejarFormulario);

// Función para exportar los datos a un archivo TXT
function exportarDatosTxt() {
    let contenido = "Ingresos:\n";
    ingresos.forEach((ingreso, index) => {
        contenido += `${index + 1}. ${ingreso.descripcion}: $${ingreso.monto}\n`;
    });

    contenido += "\nGastos:\n";
    gastos.forEach((gasto, index) => {
        contenido += `${index + 1}. ${gasto.descripcion}: $${gasto.monto}\n`;
    });

    const totalIngresos = ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
    const totalGastos = gastos.reduce((total, gasto) => total + gasto.monto, 0);
    const balanceFinal = totalIngresos - totalGastos;

    contenido += `\nBalance Final: $${balanceFinal}`;

    const blob = new Blob([contenido], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "datos_financieros.txt";
    link.click();
}

// Agregar botón de exportación TXT
document.getElementById("exportar-btn-txt").addEventListener("click", exportarDatosTxt);
