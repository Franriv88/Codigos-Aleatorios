let codigosGenerados = [];

function generarCodigos() {
  const prefijo = document.getElementById("prefijo").value.toUpperCase();
  const cantidad = parseInt(document.getElementById("cantidad").value);

  // Validar longitud del prefijo
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
    const codigoAleatorio = Math.floor(Math.random() * 90000) + 10000;
    const codigoCompleto = `${prefijo}${codigoAleatorio}`;
    codigos.add(codigoCompleto);
  }

  codigosGenerados = Array.from(codigos); // Guardar los códigos generados para usarlos en copiar y descargar

  document.getElementById("codigoContainer").innerHTML = 
    codigosGenerados.map(codigo => `<p>${codigo}</p>`).join("");
}

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

function descargarCSV() {
  if (codigosGenerados.length === 0) {
    alert("No hay códigos generados para descargar.");
    return;
  }
  
  // Crear contenido del archivo CSV
  let csvContent = "code\n"; // Primera fila con el encabezado "code"
  csvContent += codigosGenerados.join("\n"); // Añadir cada código en una línea nueva
  
  // Crear un blob con el contenido del archivo
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
  // Crear enlace de descarga
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  // Usar el valor de `cantidad` para nombrar el archivo
  const cantidad = document.getElementById("cantidad").value;
  link.download = `${cantidad}_codigos_generados.csv`;
  
  link.click();
}

//mostrar instrucciones
function mostrarInstrucciones() {
    document.getElementById("instruccionesModal").style.display = "block";
  }
  
  function cerrarModal() {
    document.getElementById("instruccionesModal").style.display = "none";
  }
  
  // Cerrar el modal al hacer clic fuera de él
  window.onclick = function(event) {
    const modal = document.getElementById("instruccionesModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
  
