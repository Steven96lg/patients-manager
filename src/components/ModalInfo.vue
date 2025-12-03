
<script setup>

const props = defineProps({
    actionType: {
        type: String,
        required: true
    }
});

</script>

<template>
    <div class="modal-info" v-if="actionType !== ''">
        <div class="modal-content-success" v-if="actionType === 'success'">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 36 36"><path fill="#ffffff" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m0 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14" class="clr-i-outline clr-i-outline-path-1"/><path fill="#ffffff" d="M28 12.1a1 1 0 0 0-1.41 0l-11.1 11.05l-6-6A1 1 0 0 0 8 18.53L15.49 26L28 13.52a1 1 0 0 0 0-1.42" class="clr-i-outline clr-i-outline-path-2"/><path fill="none" d="M0 0h36v36H0z"/></svg>
            <strong>{{ actionType }}</strong>
            <p>La nueva consulta se ha guardado correctamente.</p>
        </div>
        <div class="modal-content-error" v-if="actionType === 'error'">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 16 16"><path fill="#ffffff" fill-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4s-3.2.1-4.6-.7s-2.5-2-3.1-3.5S.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1S2.7 4.9 2.3 6.3c-.4 1.3-.4 2.7.2 4q.9 1.95 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z" clip-rule="evenodd"/></svg>
            <strong>{{ actionType }}</strong>
            <p>Error al guardar la consulta. Intentelo nuevamente.</p>
        </div>
    </div>
</template>

<style>
.modal-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,.2);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Animación del overlay */
    animation: modal-overlay-fade 0.25s ease-out;
}

.modal-content-success,
.modal-content-error {
    width: 500px;
    height: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;

    /* Animación del contenido */
    animation: modal-pop 0.45s ease-out;
    transform-origin: center;
}

.modal-content-success {
    background-color: #22F06E;
}

.modal-content-error {
    background-color: #e11d48;
}

/* Animación: fondo aparece suavemente */
@keyframes modal-overlay-fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Animación: modal hace un pequeño zoom */
@keyframes modal-pop {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(10px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

</style>