document.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelector('#calcular');
    
    // Seleccionamos cada etiqueta donde ira un dato individual
    const lblCemento = document.querySelector('#columna-cemento');
    const lblArena = document.querySelector('#columna-arena');
    const lblPiedra = document.querySelector('#columna-piedra');
    const lblHierro10 = document.querySelector('#columna-hierro10');
    const lblHierro4 = document.querySelector('#columna-hierro4');
    
    btn.addEventListener('click', () => {
        const largo = parseFloat(document.querySelector('#numero1').value) || 0;

        if (largo <= 0) {
            alert("Por favor ingresa un largo de columna válido mayor a 0.");
            return;
        }

        // 1. Cálculos de materiales para la columna
        const cemento = largo * 7.5;       
        const arena = largo * 0.016;     
        const piedra = largo * 0.016;    
        const hierro10 = largo * 6;            
        const hierro4 = largo * 3;

        // 2. Mostramos los resultados en la interfaz
        lblCemento.textContent = `Cemento: ${cemento.toFixed(2)} kg`;
        lblArena.textContent = `Arena: ${arena.toFixed(3)} m³`;
        lblPiedra.textContent = `Piedra: ${piedra.toFixed(3)} m³`;
        lblHierro10.textContent = `Hierro 10: ${hierro10.toFixed(2)} m`;
        lblHierro4.textContent = `Hierro 4: ${hierro4.toFixed(2)} m`;

        // 3. Creamos el objeto JSON con los datos específicos de este cálculo de columna
        const datosCalculo = {
            tipoCalculo: "Calculadora de Columna",
            medidas: {
                largoMetros: largo
            },
            resultados: {
                cementoKg: parseFloat(cemento.toFixed(2)),
                arenaM3: parseFloat(arena.toFixed(3)),
                piedraM3: parseFloat(piedra.toFixed(3)),
                hierro10Metros: parseFloat(hierro10.toFixed(2)),
                hierro4Metros: parseFloat(hierro4.toFixed(2))
            },
            fechaCalculo: new Date().toLocaleString()
        };

        // 4. Preparamos y ejecutamos la descarga automática del archivo .json
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datosCalculo, null, 2));
        
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "calculo_columna.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });
});