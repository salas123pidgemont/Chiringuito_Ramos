function inicializarFooter() {
    function actualizarEstadoHorario() {
        const ahora = new Date();
        const diaSemana = ahora.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
        const hora = ahora.getHours();
        const minutos = ahora.getMinutes();
        const horaActual = hora + minutos / 60;

        // Convertir a hora local española
        const opciones = { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit' };
        const horaLocal = ahora.toLocaleTimeString('es-ES', opciones);

        let estado = '';
        let claseCSS = '';
        let mensajeExtra = '';

        console.log('Día:', diaSemana, 'Hora actual:', horaActual, 'Hora local:', horaLocal);

        // Verificar si es martes (cerrado)
        if (diaSemana === 2) { // 2 = Martes
            estado = 'CERRADO';
            claseCSS = 'cerrado';
            mensajeExtra = 'Abre mañana a las 11:00';
        } 
        // Verificar horario especial de viernes (abre a las 10:30)
        else if (diaSemana === 5) { // 5 = Viernes
            const horaApertura = 10.5; // 10:30
            const horaCierre = 23;
            
            if (horaActual >= horaApertura && horaActual < horaCierre) {
                estado = 'ABIERTO';
                claseCSS = 'abierto';
                mensajeExtra = 'Cierra a las 23:00';
            } else if (horaActual < horaApertura) {
                estado = 'CERRADO';
                claseCSS = 'cerrado';
                mensajeExtra = 'Abre hoy a las 10:30';
            } else {
                estado = 'CERRADO';
                claseCSS = 'cerrado';
                mensajeExtra = 'Abre el miércoles a las 11:00';
            }
        }
        // Horario normal (miércoles a lunes: 11:00 - 23:00)
        else {
            const horaApertura = 11;
            const horaCierre = 23;
            
            if (horaActual >= horaApertura && horaActual < horaCierre) {
                estado = 'ABIERTO';
                claseCSS = 'abierto';
                mensajeExtra = 'Cierra a las 23:00';
            } else if (horaActual < horaApertura) {
                estado = 'CERRADO';
                claseCSS = 'cerrado';
                mensajeExtra = 'Abre hoy a las 11:00';
            } else {
                estado = 'CERRADO';
                claseCSS = 'cerrado';
                // Determinar próximo día de apertura
                if (diaSemana === 1) { // Lunes por la noche
                    mensajeExtra = 'Abre el miércoles a las 11:00';
                } else {
                    mensajeExtra = 'Abre mañana a las 11:00';
                }
            }
        }

        // Actualizar el DOM - con más comprobaciones
        const elementoEstado = document.getElementById('estado-restaurante');
        const elementoMensaje = document.getElementById('mensaje-horario');
        const elementoHora = document.getElementById('hora-actual');

        console.log('Elementos encontrados:', {
            estado: !!elementoEstado,
            mensaje: !!elementoMensaje,
            hora: !!elementoHora
        });

        if (elementoEstado) {
            elementoEstado.textContent = estado;
            elementoEstado.className = 'estado ' + claseCSS;
            console.log('Estado actualizado:', estado);
        }

        if (elementoMensaje) {
            elementoMensaje.textContent = mensajeExtra;
        }

        if (elementoHora) {
            elementoHora.textContent = 'Hora actual: ' + horaLocal;
        }
    }

    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(actualizarEstadoHorario, 100);
        });
    } else {
        setTimeout(actualizarEstadoHorario, 100);
    }

    // Actualizar cada minuto
    setInterval(actualizarEstadoHorario, 60000);
}

// Inicializar cuando se cargue el script
inicializarFooter();