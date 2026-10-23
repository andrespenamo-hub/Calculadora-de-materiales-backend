document.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelector('#calcular');
    
    // Seleccionamos cada etiqueta donde ira un dato individual
    const lblSuperficie = document.querySelector('#pisos-superficie');
    const lblExtra = document.querySelector('#pisos-extra');
    
    btn.addEventListener('click', () => {
        // Obtenemos los valores de los inputs (usando parseFloat para decimales)
        const ancho = parseFloat(document.querySelector('#numero1').value) || 0;
        const largo = parseFloat(document.querySelector('#numero2').value) || 0;

        if (ancho <= 0 || largo <= 0) {
            alert("Por favor ingresa medidas válidas mayores a 0.");
            return;
        }

        // 1. Cálculos de superficie y extra para pisos
        const superficie = ancho * largo;
        const extra = superficie * 1.10;

        // 2. Mostramos los resultados formateados con sus respectivas unidades
        lblSuperficie.textContent = `Superficie: ${superficie.toFixed(2)} m²`;
        lblExtra.textContent = `Con 10% extra: ${extra.toFixed(2)} m²`;

        // 3. Creamos el objeto JSON con los datos específicos de este cálculo de pisos
        const datosCalculo = {
            tipoCalculo: "Calculadora de Pisos",
            medidas: {
                anchoMetros: ancho,
                largoMetros: largo
            },
            resultados: {
                superficieM2: parseFloat(superficie.toFixed(2)),
                conDiezPorcientoExtraM2: parseFloat(extra.toFixed(2))
            },
            fechaCalculo: new Date().toLocaleString()
        };

        // 4. Preparamos y ejecutamos la descarga automática del archivo .json
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datosCalculo, null, 2));
        
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "calculo_piso.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });
});