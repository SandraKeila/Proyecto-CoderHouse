document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("ingresos")) {
        document.getElementById("ingresos").value = localStorage.getItem("ingresos");
    }
    if (localStorage.getItem("gastos")) {
        const gastos = JSON.parse(localStorage.getItem("gastos"));
        gastos.forEach(gasto => mostrarGasto(gasto.nombre, gasto.cantidad));
        calcularSaldo();
    }
});

function agregarGasto() {
    const nombreGasto = document.getElementById("nombre-gasto").value;
    const cantidadGasto = parseFloat(document.getElementById("cantidad-gasto").value);
    
    if (nombreGasto && cantidadGasto) {
        mostrarGasto(nombreGasto, cantidadGasto);
        guardarGasto(nombreGasto, cantidadGasto);
        calcularSaldo();
    } else {
        alert("Por favor, complete todos los campos del gasto.");
    }
}

function mostrarGasto(nombre, cantidad) {
    const gastoItem = document.createElement("div");
    gastoItem.className = "gasto-item";
    gastoItem.innerHTML = `${nombre} - $${cantidad.toFixed(2)} <button onclick="eliminarGasto(this)">Eliminar</button>`;
    document.getElementById("lista-gastos").appendChild(gastoItem);
}

function guardarGasto(nombre, cantidad) {
    let gastos = localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : [];
    gastos.push({ nombre, cantidad });
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

function eliminarGasto(elemento) {
    const gastoItem = elemento.parentElement;
    const nombreGasto = gastoItem.textContent.split(" - ")[0];
    gastoItem.remove();
    let gastos = JSON.parse(localStorage.getItem("gastos"));
    gastos = gastos.filter(gasto => gasto.nombre !== nombreGasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    calcularSaldo();
}

function calcularSaldo() {
    const ingresos = parseFloat(document.getElementById("ingresos").value) || 0;
    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    const totalGastos = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
    const saldoFinal = ingresos - totalGastos;
    document.getElementById("resultado").innerText = `Saldo Final: $${saldoFinal.toFixed(2)}`;
    localStorage.setItem("ingresos", ingresos);
}

document.getElementById("ingresos").addEventListener("input", calcularSaldo);