document.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelector('#calcular');
    
    // Seleccionamos cada etiqueta donde ira un dato individual
    const lblVolumen = document.querySelector('#contrapiso-volumen');
    const lblCemento = document.querySelector('#contrapiso-cemento');
    const lblArena = document.querySelector('#contrapiso-arena');
    const lblPiedra = document.querySelector('#contrapiso-piedra');
    
    btn.addEventListener('click', () => {
        const espesor = parseFloat(document.querySelector('#numero1').value) || 0;
        const ancho = parseFloat(document.querySelector('#numero2').value) || 0;
        const largo = parseFloat(document.querySelector('#numero3').value) || 0;

        if (espesor <= 0 || ancho <= 0 || largo <= 0) {
            alert("Por favor ingresa medidas válidas mayores a 0.");
            return;
        }

        // 1. Cálculos de volumen y materiales para el contrapiso
        const volumen = espesor * ancho * largo;
        const cemento = volumen * 105;       
        const arena = volumen * 0.45;     
        const piedra = volumen * 0.9;

        // 2. Mostramos los resultados en la interfaz
        lblVolumen.textContent = `Volumen: ${volumen.toFixed(3)} m³`;
        lblCemento.textContent = `Cemento: ${cemento.toFixed(2)} kg`;
        lblArena.textContent = `Arena: ${arena.toFixed(3)} m³`;
        lblPiedra.textContent = `Piedra: ${piedra.toFixed(3)} m³`;

        // 3. Creamos el objeto JSON con los datos específicos de este cálculo de contrapiso
        const datosCalculo = {
            tipoCalculo: "Calculadora de Contrapiso",
            medidas: {
                espesorMetros: espesor,
                anchoMetros: ancho,
                largoMetros: largo
            },
            resultados: {
                volumenM3: parseFloat(volumen.toFixed(3)),
                cementoKg: parseFloat(cemento.toFixed(2)),
                arenaM3: parseFloat(arena.toFixed(3)),
                piedraM3: parseFloat(piedra.toFixed(3))
            },
            fechaCalculo: new Date().toLocaleString()
        };

        // 4. Preparamos y ejecutamos la descarga automática del archivo .json
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datosCalculo, null, 2));
        
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "calculo_contrapiso.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });
});