let ingresos = Number(prompt("Ingresar la cantidad de tus ingresos mensuales"));
let gasto = prompt("Mencione en qué realizó un gasto");
let cantidadGasto = Number(prompt("Ingresar la cantidad del gasto"));
let masgastos = prompt("¿realizaste otro gasto más?(solo si/no)");

while (masgastos !== "no") {
  let otrogasto = prompt("Mencione en qué realizó un gasto");
  let otrocantidadGasto = Number(prompt("Ingresar la cantidad del gasto"));
  cantidadGasto = cantidadGasto + otrocantidadGasto;
  masgastos = prompt("¿realizaste otro gasto más?(solo si/no)");
}

if (ingresos - cantidadGasto > 0) {
  alert(
    "El dinero que le queda es de " + (ingresos - cantidadGasto) + ", puede crear una cuenta de ahorros para guardar su dinero");
} else {
  alert(
    "El dinero que le queda es de " + (ingresos - cantidadGasto) + ", le recomendamos llevar cursos de salud financiera");
}
