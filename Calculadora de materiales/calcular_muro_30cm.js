document.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelector('#calcular');
    
    const lblSuperficie = document.querySelector('#res-superficie');
    const lblCemento = document.querySelector('#res-cemento');
    const lblArena = document.querySelector('#res-arena');
    const lblLadrillos = document.querySelector('#res-ladrillos');
    
    btn.addEventListener('click', () => {
        const largo = parseFloat(document.querySelector('#numero1').value) || 0;
        const alto = parseFloat(document.querySelector('#numero2').value) || 0;

        if (largo <= 0 || alto <= 0) {
            alert("Por favor ingresa medidas válidas mayores a 0.");
            return;
        }

        // 1. Cálculo de la superficie (Área)
        const superficie = largo * alto;

        // 2. Estimación de materiales para muro de 30 cm
        const cemento = superficie * 15.2;
        const arena = superficie * 0.115;
        const ladrillos = superficie * 120;

        // 3. Mostramos los resultados en la interfaz
        lblSuperficie.textContent = `Superficie: ${superficie.toFixed(2)} m²`;
        lblCemento.textContent = `Cemento: ${cemento.toFixed(1)} kg`;
        lblArena.textContent = `Arena: ${arena.toFixed(2)} m³`;
        lblLadrillos.textContent = `Ladrillos: ${Math.round(ladrillos)}`;

        // 4. Creamos el objeto JSON con los datos específicos de este cálculo
        const datosCalculo = {
            tipoCalculo: "Calculadora de Muro (30cm)",
            medidas: {
                largoMetros: largo,
                altoMetros: alto
            },
            resultados: {
                superficieM2: parseFloat(superficie.toFixed(2)),
                cementoKg: parseFloat(cemento.toFixed(1)),
                arenaM3: parseFloat(arena.toFixed(2)),
                ladrillosPiezas: Math.round(ladrillos)
            },
            fechaCalculo: new Date().toLocaleString()
        };

        // 5. Preparamos y ejecutamos la descarga automática del archivo .json
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datosCalculo, null, 2));
        
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "calculo_muro_30cm.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });
});