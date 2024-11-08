let codigosGenerados = [];

// Función para generar códigos aleatorios
function generarCodigos() {
  const prefijo = document.getElementById("prefijo").value.toUpperCase();
  const cantidad = parseInt(document.getElementById("cantidad").value);

  // Verificar que el prefijo tenga un máximo de 5 caracteres
  if (prefijo.length > 5) {
    alert("El prefijo no puede tener más de 5 caracteres.");
    return;
  }

  if (!prefijo || isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingresa un prefijo y una cantidad válida.");
    return;
  }

  const codigos = new Set();
  while (codigos.size < cantidad) {
    const numero = Math.floor(Math.random() * 100); // Dos dígitos
    const letras = String.fromCharCode(65 + Math.floor(Math.random() * 26), 65 + Math.floor(Math.random() * 26));
    const cuatroDigitos = Math.floor(1000 + Math.random() * 9000); // Cuatro dígitos
    const codigoCompleto = `${prefijo}${numero}${letras}${cuatroDigitos}`;
    codigos.add(codigoCompleto);
  }

  codigosGenerados = Array.from(codigos);
  document.getElementById("codigoContainer").innerHTML = 
    codigosGenerados.map(codigo => `<p>${codigo}</p>`).join("");
}

// Función para copiar los códigos generados
function copiarCodigos() {
  if (codigosGenerados.length === 0) {
    alert("No hay códigos generados para copiar.");
    return;
  }
  const texto = codigosGenerados.join("\n");
  navigator.clipboard.writeText(texto)
    .then(() => alert("Códigos copiados al portapapeles."))
    .catch(err => alert("Error al copiar los códigos: " + err));
}

// Función para descargar los códigos en un archivo CSV
function descargarCSV() {
  if (codigosGenerados.length === 0) {
    alert("No hay códigos generados para descargar.");
    return;
  }
  let csvContent = "code\n" + codigosGenerados.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "codigos_generados.csv";
  link.click();
}

// Funciones para mostrar y cerrar el modal
function mostrarInstrucciones() {
  document.getElementById("modalInstrucciones").style.display = "block";
}

function cerrarInstrucciones() {
  document.getElementById("modalInstrucciones").style.display = "none";
}
