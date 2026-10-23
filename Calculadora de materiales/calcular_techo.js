document.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelector('#calcular');
    
    // Seleccionamos cada etiqueta donde ira un dato individual
    const lblSuperficie = document.querySelector('#techo-superficie');
    const lblCemento = document.querySelector('#techo-cemento');
    const lblArena = document.querySelector('#techo-arena');
    const lblPiedra = document.querySelector('#techo-piedra');
    const lblHierro8 = document.querySelector('#techo-hierro8');
    const lblHierro6 = document.querySelector('#techo-hierro6');
    
    btn.addEventListener('click', () => {
        const espesor = parseFloat(document.querySelector('#numero1').value) || 0;
        const ancho = parseFloat(document.querySelector('#numero2').value) || 0;
        const largo = parseFloat(document.querySelector('#numero3').value) || 0;

        if (espesor <= 0 || ancho <= 0 || largo <= 0) {
            alert("Por favor ingresa medidas válidas mayores a 0.");
            return;
        }

        // 1. Cálculos de superficie y materiales para el techo
        const superficie = ancho * largo;
        const cemento = superficie * 33;       
        const arena = superficie * 0.072;     
        const piedra = superficie * 0.072;
        const hierro8 = superficie * 7;
        const hierro6 = superficie * 4;

        // 2. Mostramos los resultados en la interfaz
        lblSuperficie.textContent = `Superficie: ${superficie.toFixed(3)} m²`;
        lblCemento.textContent = `Cemento: ${cemento.toFixed(2)} kg`;
        lblArena.textContent = `Arena: ${arena.toFixed(3)} m³`;
        lblPiedra.textContent = `Piedra: ${piedra.toFixed(3)} m³`;
        lblHierro8.textContent = `Hierro 8: ${hierro8.toFixed(2)} m`;
        lblHierro6.textContent = `Hierro 6: ${hierro6.toFixed(2)} m`;

        // 3. Creamos el objeto JSON con los datos específicos de este cálculo de techo
        const datosCalculo = {
            tipoCalculo: "Calculadora de Techo",
            medidas: {
                espesorMetros: espesor,
                anchoMetros: ancho,
                largoMetros: largo
            },
            resultados: {
                superficieM2: parseFloat(superficie.toFixed(3)),
                cementoKg: parseFloat(cemento.toFixed(2)),
                arenaM3: parseFloat(arena.toFixed(3)),
                piedraM3: parseFloat(piedra.toFixed(3)),
                hierro8Metros: parseFloat(hierro8.toFixed(2)),
                hierro6Metros: parseFloat(hierro6.toFixed(2))
            },
            fechaCalculo: new Date().toLocaleString()
        };

        // 4. Preparamos y ejecutamos la descarga automática del archivo .json
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datosCalculo, null, 2));
        
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "calculo_techo.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });
});