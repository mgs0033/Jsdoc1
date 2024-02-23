/** 
 * @param setupGallery  * Función que inicializa la galería de imágenes y asigna la función de cambio de imagen al botón.

 * @callback setupGallery
 */
function setupGallery() {
    /** 
     * Array que contiene todas las rutas de las imágenes que se mostrarán.
     * @constant images 
     * @type {string[]} 
     */
    const images = [ 
        './images/imagen1.png', 
        './images/imagen2.jpg', 
        './images/imagen3.png' 
    ]; 

    /** 
     * Índice de la posición actual en el array de imágenes, se incializa a 0
     * @constant currentIndex 
     * @type {number}  
     */
    let currentIndex = 0; 

    /** 
     * @param changeImageOnClick      * Función que se ejecuta cuando se hace clic en el botón para cambiar a la siguiente imagen, incrementa el índice del array para seleccionar la siguiente imagen y actualiza la URL de la imagen.

     * @callback changeImageOnClick
     */
    function changeImageOnClick() {
        currentIndex = (currentIndex + 1) % images.length; 
        imageElement.src = images[currentIndex]; 
    }

    /** 
     * Elemento de imagen HTML que se encargará de mostrar las imágenes.
     * @constant imageElement 
     * @type {HTMLImageElement}  
     */
    const imageElement = document.createElement('img'); 
    imageElement.src = images[currentIndex]; 

    /** 
     * Contenedor en el que se mostrarán las imágenes.
     * @constant contentElement 
     * @type {HTMLElement}  
     */
    const contentElement = document.querySelector('.content');
    contentElement.appendChild(imageElement);

    /** 
     * Botón que se usará para avanzar a la siguiente imagen.
      @type {string}
      @constant buttonElement 
      @default 
     */
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Next Image';
    buttonElement.onclick = function() {
        changeImageOnClick();
    };

    // Agregar el botón al contenedor
    contentElement.appendChild(buttonElement);
}

setupGallery();
