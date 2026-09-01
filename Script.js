function Chat() {
    var Input = document.getElementById("Input").value.toLowerCase().trim();
    var HELP = ["hola", "ayuda", "ayudame", "que eres", "que haces", "tele", "television", "canales", "info", "informacion", "tienes", "alguna", "dato"];
    var LISTA = ["sugerencia", "recomiendas", "sugiere", "lista", "peliculas", "contenido", "filme", "serie", "pelis", "otras", "otros", "catalogo", "buscar"];
    
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
        Lista.appendChild(Bot);       
        Bot.scrollIntoView({ behavior: "smooth" }); 
    }, 1000);
   
    var TITULO = Input.replace('🍿', ''); 
    var ENLACE = `${'GOOGLE-S.html'}?texto=${TITULO}`;
    var BOT = "🤖: ";
    var Respuesta = BOT + `Encontraremos:<br/>"${Input}" Para Tí<br/><br/><a href="${ENLACE}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
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
    }

    var isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var PELIS = Lista1.concat(Lista2, Lista3); 
       
    // PELIS 
    PELIS.forEach(item => {
      var NN = item.name || item.NAME;
      var URL = item.url || item.URL;
      var incluyeÑ = Input.toLowerCase().includes("ñ");
      var In = Tildes(Input.replace(/🍿|📺|🌐|⚙️|🧋/g, '').replace(/\s+/g, ' '), incluyeÑ);   
      var Items = Tildes(NN.toLowerCase().replace(/🍿|📺|🌐|⚙️|🧋/g, '').replace(/\s+/g, ' '), incluyeÑ);

      if (In === Items) {
        var CADENA = ['play.vidyard', 'dropbox.com'];

        if (URL.includes('google.com/file')) { 
          var limpioURL = URL.substring(0, URL.indexOf('view?usp')) + 'preview';
          Respuesta = BOT + `Disfruta La Emisión: ${NN}`;
          Visual(limpioURL);
          No.style.display = 'none';
          Emision.play();
          Envio.play();
          Erro.pause();
        } else if (CADENA.some(dominio => URL.includes(dominio))) {
          Respuesta = BOT + `Disfruta de: "${NN}"`; 
          PANTALLA.style.display = "block";
          All.style.height = "40vh";
          FF.src = URL.replace('www.dropbox.com', 'dl.dropboxusercontent.com');  
          No.style.display = 'none';
          Emision.play();
          Envio.play();
          Erro.pause();    
          
          if (NN.includes('🧋')) {
             NN = NN.replace('🧋', '');
             URL = `https://lamovie.github.io/La-Movie-Delux/PLAY2.html?titulo=${NN}&url=${URL}`;
             Respuesta = BOT + `Aquí tienes el enlace a: 🧋${NN} <br/><br/><a href="${URL}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
             PANTALLA.style.display = "none";
             All.style.height = "60vh";
             FF.src = ''; 
             No.style.display = 'none';
             Enlace.play();
             Envio.play();
             Erro.pause(); 
             Emision.pause()
          } 
        } else if (NN.includes('📺')) {
          if (URL.includes('github')) {
              Respuesta = BOT + `Aquí tienes el enlace a: ${NN} <br/><br/><a href="${URL}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
              No.style.display = 'none';
              Enlace.play();
              Envio.play();
              Erro.pause();
          } else {
              Respuesta = BOT + `Disfruta de: "${item.name}"`;
              Visual(item.url);
              No.style.display = 'none';
              Emision.play()
              Envio.play();
              Erro.pause();
          }
        } else if (!isMobile && URL.includes('latino.solo')) {
          var URL = URL.replace('latino.solo-latino', 'h5.swplayer'); 
          Respuesta = BOT + `Aquí tienes el enlace a: ${NN} <br/><br/><a href="${URL}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
          No.style.display = 'none';
          Enlace.play();
          Envio.play();
          Erro.pause();
        } else if (URL.includes('pelisflix')) {
          URL = `https://lamovie.github.io/La-Movie-Delux/AUX.html?titulo=${NN}&url=${URL}`;    
          Respuesta = BOT + `Aquí tienes el enlace a: ${NN} <br/><br/><a href="${URL}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
          No.style.display = 'none';
          Enlace.play();
          Envio.play();
          Erro.pause();
        } else if (NN.includes('🌐')) {
          URL = `https://lamovie.github.io/PRE-ESTRENOS/?texto=${Items}`;    
          Respuesta = BOT + `Aquí tienes tu Estreno: ${NN} <br/><br/><a href="${URL}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
          No.style.display = 'none';
          Enlace.play();
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
          var CATALOGO_FILTRADO = [];
          var textoSugerencia = 'Hoy Te Sugiero Ver:<br/><br/>';
          var SERIE = ['folders', 'drama', 'publicfoldergrid'];
          var MOVIE = ['file', 'movie', 'vidyard.com', 'gallery=open'];

          if (item === "serie") {
              CATALOGO_FILTRADO = PELIS.filter(p => SERIE.some(sss => (p.url || p.URL || "").includes(sss)));
              textoSugerencia = 'Hoy Te Sugiero Ver Estas Series:<br/><br/>';
          } else if (item === "peliculas" || item === "pelis" || item === "filme") {
              CATALOGO_FILTRADO = PELIS.filter(p => MOVIE.some(mmm => (p.url || p.URL || "").includes(mmm)));
              textoSugerencia = 'Hoy Te Sugiero Ver Estas Películas:<br/><br/>';
          } else {
              CATALOGO_FILTRADO = PELIS; 
          }

          var sugeridas = [];
          var disponibles = [...CATALOGO_FILTRADO].sort(() => 0.5 - Math.random());

          for (var i = 0; i < disponibles.length; i++) {
              if (sugeridas.length >= 3) break; 
              var NNN = disponibles[i].name || disponibles[i].NAME;
              if (NNN) {
                  var NOMBRE = NNN.replace(/🍿|📺/g, '').trim();       
                  if (NOMBRE && !sugeridas.includes(NOMBRE)) {
                      sugeridas.push(NOMBRE);
                  }
              }
          }

          var SUGG = sugeridas.map(function(nombre) {
              return '<span style="color: #4f3">🍿' + nombre + '</span>';
          });

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
    document.getElementById("Input").value = '';             
};

// PREFIJO 
document.getElementById("Input").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
        event.preventDefault(); 
        var InputElement = document.getElementById("Input");
        var incluyeÑ = InputElement.value.includes("ñ");
        var TextPre = TildesFiltro(InputElement.value.replace(/🍿|🌐|📺|⚙️|🧋/g, '').trim(), incluyeÑ); 

        var DATA = Lista3.find(item => 
          TildesFiltro((item.NAME || item.name).replace('🧋', '').trim(), incluyeÑ) === TextPre
        );
        var PRE = Lista2.find(item => 
          TildesFiltro((item.NAME || item.name).replace('🌐', '').trim(), incluyeÑ) === TextPre
        );
        
        let Prefijo;
        if (TextPre.includes('tv')) {
            Prefijo = '📺';
        } else if (TextPre.includes('sofia')){
            Prefijo = '⚙️';
        } else if (PRE) {
            Prefijo = '🌐';
        } else if (DATA && DATA.CAPS){
            Prefijo = '🧋';
        } else {
            Prefijo = '🍿';
        }   
        var Texto = Prefijo + TextPre;       
        InputElement.value = Texto; 
        Chat();
    }
});     
   
var CADENA = ['🍿', '📺'];
document.getElementById("Lista").addEventListener("click", function (event) {
    var Text = event.target.textContent;
    var EMOJI = CADENA.find(emoji => Text.includes(emoji));
    var InputElement = document.getElementById("Input");

    if (EMOJI) {
        var SUGG = Text.split(EMOJI)[1];   
        InputElement.value = SUGG.trim(); 
    } else if (Text.includes('No tengo') || Text.includes('👉🏾') || Text.includes('Sugerencias')) {
        InputElement.value = '';
    }                     
});

function fullScreens() {
    var EMB = document.querySelector('embed');
    if (EMB.requestFullscreen) {
      EMB.requestFullscreen();
    } else if (EMB.mozRequestFullScreen) { 
      EMB.mozRequestFullScreen();
    } else if (EMB.webkitRequestFullscreen) { 
      EMB.webkitRequestFullscreen();
    } else if (EMB.msRequestFullscreen) { 
      EMB.msRequestFullscreen();
    }
}

// Detectar cuando entra o sale de fullscreen 
document.addEventListener('fullscreenchange', function() {
    if (document.fullscreenElement) {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape');
        }
    } else {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('portrait');
        }
    }
});

// --- MENSAJE DE BIENVENIDA INICIAL CON EFECTO DE ESCRITURA ---
window.addEventListener('DOMContentLoaded', () => {
    var UsuarioDummy = document.createElement('li');
    UsuarioDummy.style.display = 'none';
    document.getElementById("Lista").appendChild(UsuarioDummy);
    
    var BotInicial = document.createElement('li');
    document.getElementById("Lista").appendChild(BotInicial);
    
    var textoBienvenida = "🤖: ¡Hola! ¿Cómo estás? En qué te puedo ayudar?";
    var index = 0;
    
    function maquinaEscribir() {
        if (index < textoBienvenida.length) {
            BotInicial.textContent += textoBienvenida.charAt(index);
            index++;
            setTimeout(maquinaEscribir, 55); 
        } else {
            BotInicial.scrollIntoView({ behavior: "smooth" });
        }
    }
    
    setTimeout(() => {
        maquinaEscribir();
    }, 1000);
});

// 🦥 FILTRO función Chat()
function TildesFiltro(texto, preservarÑ = false) {
    let limpio = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (!preservarÑ) {
        limpio = limpio.replace(/ñ/g, "n");
    }
    return limpio;
}

// 2. Construir la lista oculta
function construirFiltroChat() {
    if (typeof Lista1 === 'undefined' || typeof Lista2 === 'undefined' || typeof Lista3 === 'undefined') {
        setTimeout(construirFiltroChat, 500); 
        return; 
    }

    var PELIS_TOTAL = Lista1.concat(Lista2, Lista3); 
    var listaSugerencias = document.getElementById("FiltroSugerencias");
    listaSugerencias.innerHTML = ''; 

    PELIS_TOTAL.forEach(item => {
        var li = document.createElement("li");
        var name = item.NAME || item.name || '';
        
        li.innerHTML = `<span class="titulo-txt">${name}</span>`;
        li.classList.add("Data-Filtro");
        li.style.display = "none";
        listaSugerencias.appendChild(li);
    });
}
construirFiltroChat();

// 3. Filtrado en tiempo real al escribir (Cambiado 'keyup' por 'input' para PC)
document.getElementById("Input").addEventListener("input", function(e) {
    var listaSugerencias = document.getElementById("FiltroSugerencias");
    
    // Evitar errores si se presiona Enter o el campo se limpia 
    if (e.target.value.trim() === '') {
        listaSugerencias.style.display = "none";
        return;
    }

    var In = e.target.value.toLowerCase().trim();
    var incluyeÑ = In.includes("ñ");
    var InputLimpiado = TildesFiltro(In.replace(/\s+/g, ' '), incluyeÑ);
    var itemsFiltro = document.querySelectorAll(".Data-Filtro");
    let foundMatch = false;

    listaSugerencias.style.display = "block";

    itemsFiltro.forEach(item => {
        let elTitulo = item.querySelector(".titulo-txt").textContent;
        let itemText = TildesFiltro(elTitulo.toLowerCase().trim(), incluyeÑ);

        if (itemText.includes(InputLimpiado)) {
            item.style.display = "block";
            foundMatch = true;
        } else {
            item.style.display = "none";
        }
    });

    if (!foundMatch) {
        listaSugerencias.style.display = "none";
    }
});

// Ocultar filtro al dar Enter (adicional para seguridad visual)
document.getElementById("Input").addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        document.getElementById("FiltroSugerencias").style.display = "none";
    }
});

// 4. Comportamiento al hacer clic en un resultado
document.getElementById("FiltroSugerencias").addEventListener("click", function(e) {
    var matchedItem = e.target.closest(".Data-Filtro");

    if (matchedItem) {
        var textoCrudo = matchedItem.textContent;
        var textoSinEmojis = textoCrudo.replace(/🍿|🌐|📺|⚙️|🧋/g, '').trim(); 
        
        var inputElement = document.getElementById("Input");
        document.getElementById("FiltroSugerencias").style.display = "none";

        var TextPre = textoSinEmojis.toLowerCase();
        
        var DATAS = (typeof Lista3 !== 'undefined') ? Lista3.find(item => (item.NAME || item.name).toLowerCase().trim().replace('🧋', '') === TextPre) : null;
        var PRES = (typeof Lista2 !== 'undefined') ? Lista2.find(item => (item.NAME || item.name).toLowerCase().trim().replace('🌐', '') === TextPre) : null;
        
        let Prefijo;
    if (TextPre.includes('tv')) {
            Prefijo = '📺';
        } else if (TextPre.includes('sofia')){
            Prefijo = '⚙️';    
        } else if (PRES) {
            Prefijo = '🌐';
        } else if (DATAS && DATAS.CAPS){
            Prefijo = '🧋';
        } else {
            Prefijo = '🍿';
        }   
        
        inputElement.value = Prefijo + TextPre;
        Chat(); 
    }
});

// 5. Ocultar el filtro si el usuario toca fuera de la caja (Uso de closest para PC)
document.addEventListener("click", function(e) {
    if (!e.target.closest("#Input") && !e.target.closest("#FiltroSugerencias")) {
        var filtro = document.getElementById("FiltroSugerencias");
        if(filtro) filtro.style.display = "none";
    }
});
