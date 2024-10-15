document.addEventListener('DOMContentLoaded', function() {
    const diccionario = {
        rápido: ['veloz', 'ligero'],
        feliz: ['contento', 'alegre'],
        grande: ['enorme', 'gigante'],
        pequeño: ['diminuto', 'chico'],
        hermoso: ['bello', 'precioso'],
        difícil: ['complicado', 'arduo'],
        fácil: ['simple', 'sencillo'],
        inteligente: ['listo', 'brillante'],
        fuerte: ['robusto', 'poderoso'],
        débil: ['frágil', 'endeble'],
        amable: ['cordial', 'atento'],
        interesante: ['atractivo', 'fascinante'],
        valiente: ['audaz', 'intrépido'],
        triste: ['melancólico', 'deprimido'],
        cansado: ['agotado', 'exhausto']
    };

    const selectPalabra = document.getElementById('selectPalabra');
    const selectSinonimo = document.getElementById('selectSinonimo');


    for (let palabra in diccionario) {
        const option = document.createElement('option');
        option.value = palabra;
        option.textContent = palabra;
        selectPalabra.appendChild(option);
    }

    selectPalabra.addEventListener('change', function() {
        const palabraSeleccionada = selectPalabra.value;
        const sinonimos = diccionario[palabraSeleccionada];


        selectSinonimo.innerHTML = '<option value="" disabled selected>Seleccione un sinónimo</option>';

        sinonimos.forEach(sinonimo => {
            const option = document.createElement('option');
            option.value = sinonimo;
            option.textContent = sinonimo;
            selectSinonimo.appendChild(option);
        });
    });


    document.getElementById('reemplazarTexto').addEventListener('click', function() {
        const texto = document.getElementById('texto').value.trim();
        const palabraSeleccionada = selectPalabra.value;
        const sinonimoSeleccionado = selectSinonimo.value;

        if (!texto) {
            Swal.fire('Error', 'Por favor ingresa un texto para reemplazar', 'error');
            return;
        }

        if (!palabraSeleccionada || !sinonimoSeleccionado) {
            Swal.fire('Error', 'Por favor selecciona una palabra y un sinónimo', 'error');
            return;
        }

        const validacion = palabraSeleccionada.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const expresion = new RegExp(validacion, 'gi');
        const nuevoTexto = texto.replace(expresion, sinonimoSeleccionado);

        Swal.fire('Reemplazo exitoso', `Se ha reemplazado "${palabraSeleccionada}" por "${sinonimoSeleccionado}"`, 'success');
        document.getElementById('texto').value = nuevoTexto;
    });

    document.getElementById('limpiarCampos').addEventListener('click', function() {
        document.getElementById('texto').value = '';
        selectPalabra.value = '';
        selectSinonimo.innerHTML = '<option value="" disabled selected>Seleccione un sinónimo</option>';
        Swal.fire('Campos Limpiados', 'Todos los campos han sido limpiados', 'success');
    });
});
