
/** 
 * Función que se ejecuta cuando el documento HTML ha sido completamente cargado
 * @callback DOMContentLoadedCallback
 */

/** 
 * Este elemento hace referencia a una etiqueta de html con el siguiente id contactForm al seleccionarlo ya podemos modificarlo
 * @constant contactForm
 */
const contactForm = document.getElementById('contactForm');

/** 
 * Aqui hacemos referencia a la llamada de el formulario, es decir al submit, al enviarlo se modificaran
 * @callback submitCallback
 * @param {Event} event - Este es el evento de envio de formulario
 */

/**
 * Coge el valor de el elemento nombre 
 * @constant name
 *       @type {string}
 * @default 
 */
/**
 * Coge el valor de el elemento message 
 * @constant message
 *       @type {string}
 * @default 
 */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    // Verifica si el nombre y el mensaje no están vacíos
    if (name.trim() !== '' && message.trim() !== '') {
        alert(`¡Gracias por tu mensaje, ${name}!`);
        contactForm.reset(); 
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

