document.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelector('#calcular');
    
    // Seleccionamos cada etiqueta donde ira un dato individual
    const lblPintura = document.querySelector('#pintura-pintura');
    
    btn.addEventListener('click', () => {
        const superficie = parseFloat(document.querySelector('#numero1').value) || 0;

        if (superficie <= 0) {
            alert("Por favor ingresa una superficie válida mayor a 0.");
            return;
        }

        // 1. Cálculo de la pintura necesaria (rendimiento aproximado)
        const pintura = superficie / 6;

        // 2. Mostramos el resultado formateado en la interfaz
        lblPintura.textContent = `Pintura necesaria: ${pintura.toFixed(1)} L`;

        // 3. Creamos el objeto JSON con los datos específicos de este cálculo de pintura
        const datosCalculo = {
            tipoCalculo: "Calculadora de Pintura",
            medidas: {
                superficieM2: superficie
            },
            resultados: {
                pinturaNecesariaLitros: parseFloat(pintura.toFixed(1))
            },
            fechaCalculo: new Date().toLocaleString()
        };

        // 4. Preparamos y ejecutamos la descarga automática del archivo .json
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datosCalculo, null, 2));
        
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "calculo_pintura.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });
});