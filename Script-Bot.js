function Chat() {
    var Input = document.getElementById("Input").value.toLowerCase().trim();
    
    var HELP = ["hola", "ayuda", "ayudame", "que eres", "que haces", "tele", "television", "canales", "info", "informacion", "tienes", "alguna", "dato"];
    
    var LISTA = ["sugerencia", "recomiendas", "sugiere", "lista", "peliculas", "contenido", "filme", "serie", "peli", "otras", "otros", "catalogo", "buscar"];
    
    var RESP = `Hola! Como estás?, Yo bien! <br/> Tengo juegos como: <br/> "TRES EN LINEA" <br/> "FLAPPY DINO" <br/> "AHORCADO" <br/> También contengo pelis, series & canales de Tv <br/><ul style="width: 70%;"><li>📺 Aida Tv</li><li>📺 IPTV</li><li>📺 Pop World Tv</li><li>📺 Universal Tv</li><li>📺 X tv</li><li>📺 Bass Nation tv</li><li>📺 Activa Tv</li><li>📺 Lilo Y Stitch Tv</li><li>📺 4Fun Tv</li><li>📺 Autentica Tv</li><li>📺 Fifa Spain Tv</li><li>📺 Studio Delta Tv</li><li>📺 Bum Tv</li></ul><br/><p style="color: red">recuerda usar texto en concreto</p>`;   
       
     
      var GAMES = [
      { name: "Tres En Linea", url: `<iframe src="3EnLinea.html" style="width: 50vh; height: 50vh;"></iframe>`}, 
      { name: "Flappy Dino", url: `<a href="https://codepen.io/mlho/full/zMejmo" style="color: #4f9; text-decoration: none">🦖 FLAPPY DINO</a>`}, 
      { name: "Ahorcado", url: `<a href="AHORCADO.html" style="color: #4f9; text-decoration: none">⛓️ AHORCADO</a>`}
      ];

       var Usuario = document.createElement('li');
    var Bot = document.createElement('li');    
    Lista.appendChild(Usuario); 
       
       setTimeout(() => { 
    Lista.appendChild(Bot);       Bot.scrollIntoView({ behavior: "smooth" }); 
     // Desplazar al último mensaje del bot 
    }, 1000);
   
   
 var TITULO = Input.replace('🍿', ''); 
 var ENLACE = 'go:GOOGLE';
    var BOT = "🤖: ";
    var Respuesta = BOT + `Aquí tienes el enlace a: ${Input}<br/><br/><a href="${ENLACE}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
      Envio.play();

      
      // MOSTRAR VIDEO
function Visual(url) {
  PANTALLA.style.display = "block";
  All.style.height = "40vh";
  FF.src = url;  
}


         // TILDES 
  function Tildes(texto, preservarÑ = false) {
  let limpio = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (!preservarÑ) {
    limpio = limpio.replace(/ñ/g, "n");
  }
  return limpio;
};

 
         // PELIS 
PELIS.forEach(item => {
  var NN = item.name || item.NAME;
  var URL = item.url || item.URL;
  
  var incluyeÑ = Input.toLowerCase().includes("ñ");
  
  var In = Tildes(Input.replace(/\s+/g, ' '), incluyeÑ);   
  var Items = Tildes(NN.toLowerCase().replace(/\s+/g, ' '), incluyeÑ);

  if (In === Items) {
    var CADENA = ['play.vidyard', 'dropboxuser'];

    if (URL.includes('file')) { 
      var limpioURL = URL.substring(0, URL.indexOf('view?usp')) + 'preview';
      Respuesta = BOT + `Disfruta La Emisión: ${NN}`;
      Visual(limpioURL);
      No.style.display = 'none';
      Emision.play();
      Envio.play();
      Erro.pause();
    } else if (CADENA.some(dominio => URL.includes(dominio))) {
      Respuesta = BOT + `Disfruta de: "${NN}"`; 
      Visual(URL);
      No.style.display = 'none';
      Emision.play();
      Envio.play();
      Erro.pause();         
    } else {
      Respuesta = BOT + `Aquí tienes el enlace a: ${NN} <br/><br/><a href="${URL}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
      No.style.display = 'none';
      Enlace.play();
      Envio.play();
      Erro.pause();
    }
  } 
});

 
        // LISTA 3 
    Lista3.forEach(item => {
  var NN = item.name || item.NAME;
  var URL = item.url || item.URL;
var In = Tildes(Input.replace(/\s+/g, ' '));   
var Items = Tildes(NN.toLowerCase().replace(/\s+/g, ' '));
   // PERMITE LOS ESPACIOS ENTRE MEDIOS 
    if (In === Items) {
  if (URL.includes('latino.solo-latino')) {
      Respuesta = BOT + `Aquí tienes el enlace a: ${NN} <br/><br/><a href="${URL}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
      No.style.display = 'none';
      Enlace.play();
      Envio.play();
      Erro.pause();
     } else if (URL.includes('limit')) {
      Respuesta = BOT + `Aquí tienes el enlace a: ${NN} <br/><br/><a href="${URL}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
      No.style.display = 'none';
      Enlace.play();
      Envio.play();
      Erro.pause();
     }  
   } 
});
 
 
       // CANALES TV 
    CANALES.forEach(item => {
var In = Tildes(Input.replace(/\s+/g, ' '));    
   var Items = Tildes(item.name.toLowerCase().replace(/\s+/g, ' '));
   // PERMITE LOS ESPACIOS ENTRE MEDIOS 
    if (In.includes(Items)) {
       Respuesta = BOT + `Disfruta de: "${item.name}"`;
       Visual(item.url);
       No.style.display = 'none';
          Emision.play()
          Envio.play();
          Erro.pause();
  }
});  

  
         // AYUDA 
   HELP.forEach((item) => {
var In = Tildes(Input.replace(/\s+/g, ' '));   
      if (In.includes(item)) {
       Respuesta = BOT + RESP;
       No.style.display = 'none';
          Ayuda.play();
          Envio.play();
          Erro.pause();
   };
});


       // SUGERENCIAS 
   LISTA.forEach((item) => {
      
      var In = Tildes(Input.replace(/\s+/g, ' '));      
      
      if (In.includes(item)) {
          // 1. Unimos todo el catálogo disponible
      var CATALOGO_COMPLETO = PELIS.concat(Lista3 || []);
      var CATALOGO_FILTRADO = [];
      var textoSugerencia = 'Hoy Te Sugiero Ver:<br/><br/>';

          // 2. Filtramos según la palabra clave detectada
          if (item === "serie") {
              // Solo enlaces que incluyan "folders"
              CATALOGO_FILTRADO = CATALOGO_COMPLETO.filter(p => (p.url || p.URL).includes('folders'));
              textoSugerencia = 'Hoy Te Sugiero Ver Estas Series:<br/><br/>';
          } 
          else if (item === "peliculas" || item === "peli" || item === "filme") {
              // Solo enlaces que incluyan "file"
              CATALOGO_FILTRADO = CATALOGO_COMPLETO.filter(p => (p.url || p.URL).includes('file'));
              textoSugerencia = 'Hoy Te Sugiero Ver Estas Películas:<br/><br/>';
          } 
          else {
        CATALOGO_FILTRADO = CATALOGO_COMPLETO; 
          }

      var sugeridas = [];
   for (var i = 0; i < 3; i++) {
              // Verificamos que haya elementos para evitar errores si el filtro queda vacío
              if (CATALOGO_FILTRADO.length > 0) {
                  var randomPeli = CATALOGO_FILTRADO[Math.floor(Math.random() * CATALOGO_FILTRADO.length)];
                  var NNN = randomPeli.name || randomPeli.NAME;
                  
                  var NOMBRE = NNN.replace(/🍿|📺/g, '').trim();       
                  
                  // Evitamos duplicados en las sugerencias
       if (NOMBRE && !sugeridas.includes(NOMBRE)) {
                      sugeridas.push(NOMBRE);
                  } else {
                      // Si era duplicado, restamos 1 a 'i' para que vuelva a intentar buscar otro
                      i--;
                  }
              }
          }

          var SUGG = sugeridas.map(function(nombre) {
              return '<span style="color: #4f3">🍿' + nombre + '</span>';
          });

          // Concatenamos el texto inicial personalizado con las sugerencias
          Respuesta = BOT + textoSugerencia + SUGG.join('<br/><br/>');
          
          No.style.display = 'none';
          Envio.play();
          Erro.pause();
      };
   });



     

         // GAMES 
   GAMES.forEach((item) => {
var In = Tildes(Input.replace(/\s+/g, ' '));
        var Items = Tildes(item.name.toLowerCase().replace(/\s+/g, ' '));
   // PERMITE LOS ESPACIOS ENTRE MEDIOS      
      if (In.includes(Items)) {
     Respuesta = BOT + item.url;
     No.style.display = 'none';
         Envio.play();
         Erro.pause();
   };
});
    


  // NO CONCATENAR RESPUESTA 
   Bot.innerHTML = Respuesta;
  Usuario.textContent = Input || "...";
  
  Usuario.scrollIntoView({ behavior: "smooth" }); 
    // Desplazar al último mensaje del usuario 
    document.getElementById("Input").value = '';             

        Input.value = '';
};

         // PREFIJO 
  Input.addEventListener('keydown', function(event) {
   if (event.key === 'Enter') { 
                event.preventDefault(); 
  var TextPre = Input.value.toLowerCase().trim(); 
  let Prefijo;
 
 if (TextPre.includes('tv')) {
         Prefijo = '📺';
     } else if(TextPre.includes('sofia')){
         Prefijo = '⚙️';
     } else {
         Prefijo = '🍿';
     }   
   var Texto = Prefijo + TextPre;       
   Input.value = Texto; 
         Chat();
  }
});     

   
   var CADENA = ['🍿', '📺'];

Lista.addEventListener("click", function (event) {
    var Text = event.target.textContent;
    
    var EMOJI = CADENA.find(emoji => Text.includes(emoji));

        if (EMOJI) {
  var SUGG = Text.split(EMOJI)[1];   
        Input.value = SUGG.trim(); 
    } else if (Text.includes('No tengo')) {
        Input.value = '';
    } else if (Text.includes('👉🏾')) {
        Input.value = '';
    } else if (Text.includes('Sugerencias')) {
        Input.value = '';
    }                     
});


  function fullScreens() {
    var EMB = document.querySelector('embed');
    if (EMB.requestFullscreen) {
      EMB.requestFullscreen();
    } else if (EMB.mozRequestFullScreen) { // Firefox
      EMB.mozRequestFullScreen();
    } else if (EMB.webkitRequestFullscreen) { // Chrome, Safari and Opera
      EMB.webkitRequestFullscreen();
    } else if (EMB.msRequestFullscreen) { // IE/Edge
      EMB.msRequestFullscreen();
    }
  }


// Detectar cuando entra o sale de fullscreen 
document.addEventListener('fullscreenchange', function() {
  if (document.fullscreenElement) {
    // Si estamos en pantalla completa, bloquear orientación horizontal 
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape');
    }
  } else {
    // Si salimos de pantalla completa, volver a orientación vertical 
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('portrait');
    }
  }
});



// --- MENSAJE DE BIENVENIDA INICIAL CON EFECTO DE ESCRITURA ---
window.addEventListener('DOMContentLoaded', () => {
       // 1. Creamos un elemento fantasma para ocupar el puesto impar (usuario) 
   var UsuarioDummy = document.createElement('li');
    UsuarioDummy.style.display = 'none';
    Lista.appendChild(UsuarioDummy);
    
  // 2. Creamos la burbuja del bot
    var BotInicial = document.createElement('li');
    Lista.appendChild(BotInicial);
    
    // Texto de bienvenida
    var textoBienvenida = "🤖: ¡Hola! ¿Cómo estás? En que te puedo ayudar?";
    var index = 0;
    
    // 3. Función de animación de escritura
    function maquinaEscribir() {
        if (index < textoBienvenida.length) {
            BotInicial.textContent += textoBienvenida.charAt(index);
            index++;
            setTimeout(maquinaEscribir, 55); // Velocidad de escritura en milisegundos
        } else {
            BotInicial.scrollIntoView({ behavior: "smooth" });
        }
    }
    
    maquinaEschibir = maquinaEscribir; // Referencia interna
    setTimeout(() => {
        maquinaEscribir();
    }, 1000);
});







  