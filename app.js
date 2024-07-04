const encriptador = document.getElementById('encriptador');
const encriptar = document.getElementById('encriptar');
const desencriptar = document.getElementById('desencriptar');
const copiar = document.getElementById('copiar');
const resultado = document.getElementById('resultado');
const alerta = document.getElementById('alerta');
const imagenContainer = document.getElementById('imagen-container');
const mensajesContainer = document.getElementById('mensajes-container');

let mensaje = [];
mensajesContainer.style.display = "none"

function encriptarMensaje(texto) {
    return texto
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

function desencriptarMensaje(texto) {
    return texto
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}

function mostrarAlerta(mensaje) {
    alerta.style.display = 'block'
    alerta.style.backgroundColor = "#ff2f2f"
    alerta.textContent = mensaje;
    setTimeout(() => {
        alerta.textContent = '';
        alerta.style.display = 'none'
    }, 3000);

}

function validarTexto(texto) {
    const regex = /^[a-z\s]*$/;
    if (!texto) {
        mostrarAlerta('El campo no puede estar vacío');
        return false;
    } else if (!regex.test(texto)) {
        mostrarAlerta('El texto solo debe contener letras minúsculas y espacios');
        return false;
    }
    return true;
}

encriptar.addEventListener('click', () => {
    imagenContainer.style.display = "none"
    mensajesContainer.style.display = "block"
    alerta.style.display = 'none'

    const textoOriginal = encriptador.value;
    if (validarTexto(textoOriginal)) {
        const textoEncriptado = encriptarMensaje(textoOriginal);
        mensaje.push(textoEncriptado);
        resultado.textContent = textoEncriptado;
        console.log(mensaje);
    }
});

desencriptar.addEventListener('click', () => {
    imagenContainer.style.display = "none"
    mensajesContainer.style.display = "block"
    alerta.style.display = 'none'

    const textoOriginal = encriptador.value;
    if (validarTexto(textoOriginal)) {
        const textoDesencriptado = desencriptarMensaje(textoOriginal);
        mensaje.push(textoDesencriptado);
        resultado.textContent = textoDesencriptado;
        console.log(mensaje);
    }
});

copiar.addEventListener('click', () => {
    const texto = resultado.textContent;
    if (texto) {
        navigator.clipboard.writeText(texto).then(() => {
            mostrarAlerta('Texto copiado al portapapeles');
            alerta.style.backgroundColor = "green"
        }).catch(err => {
            mostrarAlerta('Error al copiar el texto');
            console.error('Error al copiar el texto: ', err);
        });
    } else {
        mostrarAlerta('No hay texto para copiar');
    }
});