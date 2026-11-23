// ============================================================================
// 🧠 MOTOR DE INTELIGENCIA ARTIFICIAL CINEMATOGRÁFICA - LA MOVIE
// ============================================================================

var MEMORIA_IA = {
    ultimoTitulo: null,
    ultimoObjeto: null,
    ultimaCategoria: null,
    ultimasSugerencias: [],
    historialIds: []
};

var CATALOGO_MAESTRO = [];

// 1. NORMALIZACIÓN Y LIMPIEZA DE TEXTO
function limpiarTexto(texto, preservarÑ = false) {
    if (!texto) return "";
    var limpio = texto.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (!preservarÑ) {
        limpio = limpio.replace(/ñ/g, "n");
    }
    return limpio.replace(/🍿|📺|🌐|⚙️|🧋|🎬|🔥|⭐/g, '').replace(/\s+/g, ' ').trim();
}

// 2. ALGORITMO DE SIMILITUD ORTOGRÁFICA (LEVENSHTEIN) PARA ERRORES DE TIPEO
function calcularSimilitud(a, b) {
    if (a === b) return 1;
    if (!a.length || !b.length) return 0;
    var matriz = [];
    for (var i = 0; i <= b.length; i++) matriz[i] = [i];
    for (var j = 0; j <= a.length; j++) matriz[0][j] = j;

    for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matriz[i][j] = matriz[i - 1][j - 1];
            } else {
                matriz[i][j] = Math.min(
                    matriz[i - 1][j - 1] + 1,
                    matriz[i][j - 1] + 1,
                    matriz[i - 1][j] + 1
                );
            }
        }
    }
    var maxLen = Math.max(a.length, b.length);
    return (maxLen - matriz[b.length][a.length]) / maxLen;
}

// 3. INDEXACIÓN INTELIGENTE DEL CATÁLOGO CON DETECCIÓN DE GÉNERO Y TIPO
function indexarCatalogoIA() {
    var mapaFuentes = [
        { arr: typeof TERROR !== 'undefined' ? TERROR : null, cat: 'terror', etiqueta: '👻 Terror' },
        { arr: typeof ACCION !== 'undefined' ? ACCION : null, cat: 'accion', etiqueta: '💥 Acción' },
        { arr: typeof FICCION !== 'undefined' ? FICCION : null, cat: 'ficcion', etiqueta: '🚀 Ciencia Ficción' },
        { arr: typeof COMEDY !== 'undefined' ? COMEDY : null, cat: 'comedia', etiqueta: '😂 Comedia' },
        { arr: typeof SERIES !== 'undefined' ? SERIES : null, cat: 'series', etiqueta: '📺 Serie' },
        { arr: typeof ANIME !== 'undefined' ? ANIME : null, cat: 'anime', etiqueta: '⛩️ Anime' },
        { arr: typeof TV !== 'undefined' ? TV : null, cat: 'tv', etiqueta: '📡 TV / Estreno' }
    ];

    var listos = mapaFuentes.every(f => Array.isArray(f.arr));
    if (!listos) {
        setTimeout(indexarCatalogoIA, 400);
        return;
    }

    CATALOGO_MAESTRO = [];
    var vistos = new Set();

    mapaFuentes.forEach(fuente => {
        fuente.arr.forEach(item => {
            var nombreOriginal = (item.NAME || item.name || '').trim();
            var urlOriginal = (item.URL || item.url || '').trim();
            if (!nombreOriginal) return;

            var claveUnica = limpiarTexto(nombreOriginal) + "|" + fuente.cat;
            if (vistos.has(claveUnica)) return;
            vistos.add(claveUnica);

            var esSerie = fuente.cat === 'series' || fuente.cat === 'anime' || Boolean(item.CAPS) ||
                          ['folders', 'drama', 'publicfoldergrid'].some(k => urlOriginal.includes(k));
            var esTV = fuente.cat === 'tv' && (nombreOriginal.includes('📺') || limpiarTexto(nombreOriginal).includes('tv'));
            var esEstreno = fuente.cat === 'tv' && nombreOriginal.includes('🌐');

            CATALOGO_MAESTRO.push({
                raw: item,
                nombreOriginal: nombreOriginal,
                nombreLimpio: nombreOriginal.replace(/🍿|📺|🌐|⚙️|🧋/g, '').trim(),
                busqueda: limpiarTexto(nombreOriginal, true),
                busquedaSinN: limpiarTexto(nombreOriginal, false),
                url: urlOriginal,
                categoria: fuente.cat,
                etiqueta: fuente.etiqueta,
                caps: item.CAPS || null,
                esSerie: esSerie,
                esTV: esTV,
                esEstreno: esEstreno
            });
        });
    });

    construirFiltroChat();
}

// 4. CONSTRUIR LISTA DE AUTOCOMPLETADO EN TIEMPO REAL
function construirFiltroChat() {
    var listaSugerencias = document.getElementById("FiltroSugerencias");
    if (!listaSugerencias) return;
    listaSugerencias.innerHTML = '';

    CATALOGO_MAESTRO.forEach((item, idx) => {
        var li = document.createElement("li");
        li.innerHTML = `<span class="titulo-txt">${item.nombreOriginal}</span> <small style="color:#4f9; float:right; font-size:11px;">${item.etiqueta}</small>`;
        li.classList.add("Data-Filtro");
        li.dataset.index = idx;
        li.style.display = "none";
        listaSugerencias.appendChild(li);
    });
}

// 5. BUSCADOR INTELIGENTE DE TÍTULOS (EXACTO, PARCIAL Y DIFUSO)
function buscarEnCatalogoIA(consulta) {
    if (!CATALOGO_MAESTRO.length) return { exacto: null, candidatos: [] };
    var incluyeN = consulta.toLowerCase().includes("ñ");
    var q = limpiarTexto(consulta, incluyeN);
    if (!q) return { exacto: null, candidatos: [] };

    // A. Coincidencia exacta
    var exacto = CATALOGO_MAESTRO.find(item => (incluyeN ? item.busqueda : item.busquedaSinN) === q);
    if (exacto) return { exacto: exacto, candidatos: [exacto] };

    // B. Puntuación por coincidencia parcial + Levenshtein
    var puntuados = [];
    CATALOGO_MAESTRO.forEach(item => {
        var target = incluyeN ? item.busqueda : item.busquedaSinN;
        var score = 0;

        if (target.startsWith(q)) {
            score = 0.95;
        } else if (target.includes(q) && q.length >= 3) {
            score = 0.85;
        } else if (q.includes(target) && target.length >= 4) {
            score = 0.80;
        } else {
            score = calcularSimilitud(q, target);
        }

        if (score >= 0.62) {
            puntuados.push({ item: item, score: score });
        }
    });

    puntuados.sort((a, b) => b.score - a.score);

    if (puntuados.length > 0 && puntuados[0].score >= 0.86) {
        return { exacto: puntuados[0].item, candidatos: puntuados.slice(0, 5).map(p => p.item) };
    }

    return { exacto: null, candidatos: puntuados.slice(0, 5).map(p => p.item) };
}

// 6. GENERADOR DE REPRODUCTOR Y ENLACES (100% FIEL A TU ARQUITECTURA)
function generarRespuestaReproduccion(itemObj) {
    var NN = itemObj.nombreOriginal;
    var URL = itemObj.url;
    var Items = itemObj.busquedaSinN;
    var BOT = "🤖: ";
    var isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var CADENA = ['play.vidyard', 'dropbox.com', '.mp4'];

    MEMORIA_IA.ultimoTitulo = itemObj.nombreLimpio;
    MEMORIA_IA.ultimoObjeto = itemObj;
    MEMORIA_IA.ultimaCategoria = itemObj.categoria;

    function Visual(urlEmbed) {
        PANTALLA.style.display = "block";
        All.style.height = "40vh";
        FF.src = urlEmbed;
    }

    var botonInfo = `<br/><span onclick="pedirFichaDesdeChat('${itemObj.nombreLimpio.replace(/'/g, "\\'")}')" style="display:inline-block; margin-top:8px; padding:4px 10px; background:#000; color:#4f9; border:1px solid #4f9; border-radius:12px; font-size:12px; cursor:pointer;">📋 Ver Sinopsis y Póster</span>`;

    if (URL.includes('google.com/file')) {
        var limpioURL = URL.replace(/view.*/, 'preview');
        Visual(limpioURL);
        No.style.display = 'none';
        Emision.play();
        Envio.play();
        Erro.pause();
        return BOT + `Disfruta La Emisión: <span style="color:#4f9">${NN}</span>${botonInfo}`;
    } 
    else if (CADENA.some(dominio => URL.includes(dominio))) {
        if (NN.includes('🧋') || itemObj.caps) {
            var tituloLimpio = NN.replace('🧋', '').trim();
            var urlCaps = `https://lamovie.github.io/La-Movie-Delux/PLAY2.html?titulo=${encodeURIComponent(tituloLimpio)}`;
            PANTALLA.style.display = "none";
            All.style.height = "60vh";
            FF.src = '';
            No.style.display = 'none';
            Enlace.play();
            Envio.play();
            Erro.pause();
            Emision.pause();
            return BOT + `Aquí tienes los episodios de: 🧋<span style="color:#4f9">${tituloLimpio}</span> <br/><br/><a href="${urlCaps}" target="_blank" style="color:#4f3; text-decoration:none;">👉🏾 VER CAPÍTULOS 🔗👈🏾</a>${botonInfo}`;
        }
        Visual(URL.replace('www.dropbox.com', 'dl.dropboxusercontent.com'));
        No.style.display = 'none';
        Emision.play();
        Envio.play();
        Erro.pause();
        return BOT + `Reproduciendo ahora: <span style="color:#4f9">"${NN}"</span>${botonInfo}`;
    } 
    else if (NN.includes('📺') || itemObj.esTV) {
        if (URL.includes('github')) {
            No.style.display = 'none';
            Enlace.play();
            Envio.play();
            Erro.pause();
            return BOT + `Aquí tienes la señal de: ${NN} <br/><br/><a href="${URL}" target="_blank" style="color:#4f3; text-decoration:none;">👉🏾 ABRIR CANAL 🔗👈🏾</a>`;
        } else {
            Visual(URL);
            No.style.display = 'none';
            Emision.play();
            Envio.play();
            Erro.pause();
            return BOT + `Sintonizando en vivo: <span style="color:#4f9">"${NN}"</span>`;
        }
    } 
    else if (!isMobile && URL.includes('latino.solo')) {
        var urlPC = URL.replace('latino.solo-latino', 'h5.swplayer');
        No.style.display = 'none';
        Enlace.play();
        Envio.play();
        Erro.pause();
        return BOT + `Aquí tienes el enlace para PC de: <span style="color:#4f9">${NN}</span> <br/><br/><a href="${urlPC}" target="_blank" style="color:#4f3; text-decoration:none;">👉🏾 VER PELÍCULA 🔗👈🏾</a>${botonInfo}`;
    } 
    else if (URL.includes('pelisflix')) {
        var urlAux = `https://lamovie.github.io/La-Movie-Delux/AUX.html?titulo=${encodeURIComponent(NN)}&url=${encodeURIComponent(URL)}`;
        No.style.display = 'none';
        Enlace.play();
        Envio.play();
        Erro.pause();
        return BOT + `Aquí tienes el enlace a: <span style="color:#4f9">${NN}</span> <br/><br/><a href="${urlAux}" target="_blank" style="color:#4f3; text-decoration:none;">👉🏾 VER AHORA 🔗👈🏾</a>${botonInfo}`;
    } 
    else if (NN.includes('🌐') || itemObj.esEstreno) {
        var urlEstreno = `https://lamovie.github.io/PRE-ESTRENOS/?texto=${encodeURIComponent(Items)}`;
        No.style.display = 'none';
        Enlace.play();
        Envio.play();
        Erro.pause();
        return BOT + `Aquí tienes tu Estreno: <span style="color:#4f9">${NN}</span> <br/><br/><a href="${urlEstreno}" target="_blank" style="color:#4f3; text-decoration:none;">👉🏾 VER ESTRENO 🔗👈🏾</a>${botonInfo}`;
    } 
    else {
        No.style.display = 'none';
        Enlace.play();
        Envio.play();
        Erro.pause();
        return BOT + `Aquí tienes el enlace a: <span style="color:#4f9">${NN}</span> <br/><br/><a href="${URL}" target="_blank" style="color:#4f3; text-decoration:none;">👉🏾 ABRIR ENLACE 🔗👈🏾</a>${botonInfo}`;
    }
}

// 7. CONSULTA DE FICHA TÉCNICA, PÓSTER Y SINOPSIS (TVMaze + iTunes/OMDb fallback sin bloqueo)
// 7. CONSULTA DE FICHA TÉCNICA, PÓSTER Y SINOPSIS CON TRADUCCIÓN AUTOMÁTICA AL ESPAÑOL
async function obtenerFichaTecnica(titulo) {
    var query = encodeURIComponent(titulo.replace(/\(.*\)/g, '').trim());
    var sinopsisFinal = "Sin sinopsis disponible.";
    var tituloFinal = titulo;
    var anioFinal = "";
    var generoFinal = "Cine y Series";
    var posterFinal = "";
    var encontrado = false;

    try {
        // 1. Buscar en iTunes (Películas / Contenido general)
        var resItunes = await fetch(`https://itunes.apple.com/search?term=${query}&media=movie&entity=movie&country=cl&lang=es_es&limit=1`);
        var dataItunes = await resItunes.json();

        if (dataItunes.results && dataItunes.results.length > 0) {
            var m = dataItunes.results[0];
            tituloFinal = m.trackName || titulo;
            anioFinal = m.releaseDate ? m.releaseDate.substring(0, 4) : '';
            generoFinal = m.primaryGenreName || 'Cine';
            posterFinal = m.artworkUrl100 ? m.artworkUrl100.replace('100x100bb', '400x400bb') : '';
            sinopsisFinal = m.longDescription || m.shortDescription || sinopsisFinal;
            encontrado = true;
        } else {
            // 2. Si no está en iTunes, buscar en TVMaze (Series y Anime)
            var resTv = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}`);
            if (resTv.ok) {
                var s = await resTv.json();
                tituloFinal = s.name || titulo;
                anioFinal = s.premiered ? s.premiered.substring(0, 4) : '';
                generoFinal = (s.genres && s.genres.length) ? s.genres.join(', ') : 'Serie';
                posterFinal = s.image ? s.image.medium : '';
                sinopsisFinal = (s.summary || "").replace(/<[^>]*>?/gm, '') || sinopsisFinal;
                encontrado = true;
            }
        }

        // 3. Traducir automáticamente al español si el texto viene en inglés u otro idioma
        if (encontrado && sinopsisFinal && sinopsisFinal !== "Sin sinopsis disponible.") {
            var urlTrad = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=${encodeURIComponent(sinopsisFinal)}`;
            var resTrad = await fetch(urlTrad);
            if (resTrad.ok) {
                var dataTrad = await resTrad.json();
                if (dataTrad && dataTrad[0]) {
                    var textoTraducido = dataTrad[0].map(item => item[0]).join('');
                    if (textoTraducido.trim()) {
                        sinopsisFinal = textoTraducido;
                    }
                }
            }
        }
    } catch (e) {
        console.log("Error en traducción o ficha:", e);
    }

    if (sinopsisFinal.length > 260) {
        sinopsisFinal = sinopsisFinal.substring(0, 257) + "...";
    }

    return {
        encontrado: encontrado,
        titulo: tituloFinal,
        anio: anioFinal,
        genero: generoFinal,
        poster: posterFinal,
        sinopsis: sinopsisFinal
    };
}


function pedirFichaDesdeChat(titulo) {
    var input = document.getElementById("Input");
    input.value = "de que trata " + titulo;
    procesarEntradaUsuario();
}

// 8. RECOMENDADOR INTELIGENTE POR GÉNERO, ESTADO DE ÁNIMO O CATEGORÍA
function generarRecomendacionesIA(categoriaFiltro, textoIntro) {
    var pool = CATALOGO_MAESTRO;

    if (categoriaFiltro === 'serie_solo') {
        pool = CATALOGO_MAESTRO.filter(i => i.esSerie && i.categoria !== 'anime');
    } else if (categoriaFiltro === 'pelicula_solo') {
        pool = CATALOGO_MAESTRO.filter(i => !i.esSerie && !i.esTV);
    } else if (categoriaFiltro) {
        pool = CATALOGO_MAESTRO.filter(i => i.categoria === categoriaFiltro);
    }

    if (!pool.length) pool = CATALOGO_MAESTRO;

    // Evitar repetir las últimas sugerencias dadas
    var filtrados = pool.filter(i => !MEMORIA_IA.ultimasSugerencias.includes(i.nombreLimpio));
    if (filtrados.length < 4) filtrados = pool;

    var mezclados = [...filtrados].sort(() => 0.5 - Math.random()).slice(0, 4);
    MEMORIA_IA.ultimasSugerencias = mezclados.map(m => m.nombreLimpio);
    if (categoriaFiltro) MEMORIA_IA.ultimaCategoria = categoriaFiltro;

    var htmlItems = mezclados.map(item => {
        var icono = item.esTV ? '📺' : (item.esSerie ? '🧋' : '🍿');
        return `<div style="margin:6px 0; padding:6px 10px; background:rgba(0,0,0,0.45); border-left:3px solid #4f3; border-radius:6px; cursor:pointer;" onclick="seleccionarSugerenciaIA('${item.nombreLimpio.replace(/'/g, "\\'")}')">
            <span style="color:#4f3;">${icono} ${item.nombreLimpio}</span>
            <span style="display:block; font-size:11px; color:#ccc; font-family:sans-serif;">${item.etiqueta} • Toca para ver</span>
        </div>`;
    }).join('');

    return `🤖: ${textoIntro}<br/>${htmlItems}<small style="color:#fff; font-family:sans-serif;">💡 También puedes decir <b>"dame más"</b> o <b>"de qué trata [título]"</b>.</small>`;
}

function seleccionarSugerenciaIA(titulo) {
    var input = document.getElementById("Input");
    input.value = titulo;
    procesarEntradaUsuario();
}

// 9. PROCESADOR PRINCIPAL DE LENGUAJE NATURAL (NLU)
async function procesarEntradaUsuario() {
    var inputEl = document.getElementById("Input");
    var rawText = inputEl.value.trim();
    if (!rawText) return;

    document.getElementById("FiltroSugerencias").style.display = "none";
    inputEl.value = '';

    var textoUsuarioVisible = rawText.replace(/🍿|📺|🌐|⚙️|🧋/g, '').trim();
    var q = limpiarTexto(rawText, false);

    // Crear burbuja del usuario
    var Usuario = document.createElement('li');
    Usuario.textContent = textoUsuarioVisible;
    Lista.appendChild(Usuario);
    Usuario.scrollIntoView({ behavior: "smooth" });
    Envio.play();

    // Crear burbuja de "Escribiendo..." de la IA
    var Bot = document.createElement('li');
    Bot.innerHTML = `<span style="color:#4f9;">🤖 analizando...</span>`;
    setTimeout(() => {
        Lista.appendChild(Bot);
        Bot.scrollIntoView({ behavior: "smooth" });
    }, 250);

    // Esperar breve instante natural para respuesta IA
    await new Promise(r => setTimeout(r, 650));

    var respuestaHTML = "";

    // --- DETECCIÓN DE INTENCIONES ---

    // INTENCIÓN 1: SALUDOS Y AYUDA / CAPACIDADES
    var saludos = ["hola", "buenas", "hey", "que tal", "como estas", "quien eres", "que eres", "que haces", "ayuda", "comandos", "funciones"];
    if (saludos.some(s => q === s || q.startsWith(s + " ") || q.includes("ayuda") || q.includes("info") || q.includes("que puedes hacer"))) {
        No.style.display = 'none';
        Ayuda.play();
        respuestaHTML = `🤖: ¡Hola! Soy tu <b>Asistente IA de Cine y Series</b> 🎬.<br/><br/>
        Puedes hablarme con total naturalidad, por ejemplo:<br/>
        <span style="color:#4f9;">• "Ponme John Wick"</span> (aunque lo escribas mal 😉)<br/>
        <span style="color:#4f9;">• "Recomiéndame algo de terror"</span><br/>
        <span style="color:#4f9;">• "¿De qué trata Matrix?"</span> (póster y sinopsis)<br/>
        <span style="color:#4f9;">• "Quiero ver anime" o "Pon TV en vivo"</span><br/>
        <span style="color:#4f9;">• "Sorpréndeme"</span> o jugar <b>Tres en Línea</b>, <b>Flappy Dino</b> y <b>Ahorcado</b>.`;
    }

    // INTENCIÓN 2: JUEGOS INTEGRADOS
    else if (q.includes("tres en linea") || q.includes("gato")) {
        No.style.display = 'none';
        respuestaHTML = `🤖: ¡A jugar! 🎮<br/><iframe src="3EnLinea.html" style="width: 100%; height: 42vh; border:none; margin-top:8px;"></iframe>`;
    }
    else if (q.includes("flappy") || q.includes("dino")) {
        No.style.display = 'none';
        respuestaHTML = `🤖: ¡Suerte con los cactus! 🦖<br/><br/><a href="https://codepen.io/mlho/full/zMejmo" target="_blank" style="color: #4f9; text-decoration: none">🦖 JUGAR FLAPPY DINO</a>`;
    }
    else if (q.includes("ahorcado")) {
        No.style.display = 'none';
        respuestaHTML = `🤖: ¡Adivina la palabra antes de caer! ⛓️<br/><br/><a href="AHORCADO.html" target="_blank" style="color: #4f9; text-decoration: none">⛓️ JUGAR AHORCADO</a>`;
    }

    // INTENCIÓN 3: MEMORIA CONTEXTUAL ("PONLA", "REPRODUCIR", "VERLA")
    else if (["ponla", "ponlo", "reproducir", "verla", "verlo", "play", "dale", "quiero verla"].includes(q) && MEMORIA_IA.ultimoObjeto) {
        respuestaHTML = generarRespuestaReproduccion(MEMORIA_IA.ultimoObjeto);
    }

    // INTENCIÓN 4: PEDIR SINOPSIS / INFO / DE QUÉ TRATA
    else if (q.startsWith("de que trata") || q.startsWith("sinopsis") || q.startsWith("info de") || q.startsWith("informacion de") || q.startsWith("resumen de") || q === "sinopsis") {
        var tituloBuscado = q.replace(/^(de que trata|sinopsis de|sinopsis|info de|informacion de|resumen de)/, '').trim();
        if (!tituloBuscado && MEMORIA_IA.ultimoTitulo) {
            tituloBuscado = MEMORIA_IA.ultimoTitulo;
        }

        if (!tituloBuscado) {
            respuestaHTML = `🤖: Dime el título de la película o serie. Ejemplo: <span style="color:#4f9;">"¿De qué trata Interstellar?"</span>`;
        } else {
            var resBusqueda = buscarEnCatalogoIA(tituloBuscado);
            var objCatalogo = resBusqueda.exacto || (resBusqueda.candidatos[0] || null);
            var nombreParaApi = objCatalogo ? objCatalogo.nombreLimpio : tituloBuscado;

            if (objCatalogo) {
                MEMORIA_IA.ultimoTitulo = objCatalogo.nombreLimpio;
                MEMORIA_IA.ultimoObjeto = objCatalogo;
            }

            var ficha = await obtenerFichaTecnica(nombreParaApi);
            No.style.display = 'none';
            Enlace.play();

            if (ficha.encontrado) {
                var imgHtml = ficha.poster ? `<img src="${ficha.poster}" style="width:95px; border-radius:8px; float:left; margin-right:10px; margin-bottom:6px; border:1px solid #4f9;"/>` : '';
                var btnPlay = objCatalogo
                    ? `<div style="clear:both; padding-top:8px;"><span onclick="seleccionarSugerenciaIA('${objCatalogo.nombreLimpio.replace(/'/g, "\\'")}')" style="display:inline-block; padding:6px 14px; background:#4f3; color:#000; border-radius:15px; cursor:pointer; font-size:13px;">▶️ VER EN LA MOVIE</span></div>`
                    : `<div style="clear:both; padding-top:8px;"><a href="GOOGLE-S.html?texto=${encodeURIComponent(nombreParaApi)}" target="_blank" style="color:#4f9; text-decoration:none;">🔎 Buscar en Google-S</a></div>`;

                respuestaHTML = `🤖: <b>${ficha.titulo}</b> ${ficha.anio ? '(' + ficha.anio + ')' : ''}<br/>
                <small style="color:#4f9; font-family:sans-serif;">🎭 ${ficha.genero}</small><br/><br/>
                ${imgHtml}<span style="font-family:sans-serif; font-size:13px; color:#fff; line-height:1.3;">${ficha.sinopsis}</span>
                ${btnPlay}`;
            } else if (objCatalogo) {
                respuestaHTML = `🤖: Tengo <b>${objCatalogo.nombreLimpio}</b> (${objCatalogo.etiqueta}) lista para reproducir, aunque no encontré su sinopsis externa.<br/><br/>
                <span onclick="seleccionarSugerenciaIA('${objCatalogo.nombreLimpio.replace(/'/g, "\\'")}')" style="display:inline-block; padding:6px 14px; background:#4f3; color:#000; border-radius:15px; cursor:pointer;">▶️ REPRODUCIR AHORA</span>`;
            } else {
                respuestaHTML = `🤖: No encontré información exacta de <b>"${tituloBuscado}"</b>, pero puedes buscarla aquí:<br/><br/><a href="GOOGLE-S.html?texto=${encodeURIComponent(tituloBuscado)}" target="_blank">👉🏾🔗🔗🔗👈🏾</a>`;
            }
        }
    }

    // INTENCIÓN 5: CANALES DE TV EN VIVO
    else if (q === "tv" || q === "tele" || q === "television" || q === "canales" || q.includes("ver tele") || q.includes("canales de tv")) {
        No.style.display = 'none';
        Enlace.play();
        respuestaHTML = generarRecomendacionesIA('tv', '📡 Aquí tienes canales y estrenos destacados (toca uno para sintonizar):');
    }

    // INTENCIÓN 6: RECOMENDACIONES POR GÉNERO, ÁNIMO O "DAME MÁS"
    else if (
        ["mas", "otras", "otros", "otra", "siguiente", "dame mas", "mas opciones"].includes(q) ||
        q.includes("recomienda") || q.includes("sugiere") || q.includes("sugerencia") ||
        q.includes("sorprendeme") || q.includes("algo de") || q.includes("quiero ver") ||
        q.includes("ganas de") || q.includes("catalogo") || q.includes("lista") ||
        ["terror", "miedo", "susto", "accion", "disparos", "pelea", "ficcion", "ciencia ficcion", "espacio", "comedia", "risa", "reir", "graciosa", "anime", "otaku", "series", "serie", "peliculas", "pelis"].some(k => q === k || q.includes("de " + k) || q.includes("ver " + k))
    ) {
        No.style.display = 'none';
        Envio.play();

        var catDetectada = null;
        var intro = "🎬 Aquí tienes una selección elegida para ti:";

        if (q.includes("terror") || q.includes("miedo") || q.includes("susto") || q.includes("horror")) {
            catDetectada = 'terror';
            intro = "👻 Prepárate para no dormir con estas de <b>Terror</b>:";
        } else if (q.includes("accion") || q.includes("disparos") || q.includes("pelea") || q.includes("adrenalina")) {
            catDetectada = 'accion';
            intro = "💥 Pura adrenalina y <b>Acción</b>:";
        } else if (q.includes("ficcion") || q.includes("espacio") || q.includes("futuro") || q.includes("sci fi")) {
            catDetectada = 'ficcion';
            intro = "🚀 Viaja a otros mundos con <b>Ciencia Ficción</b>:";
        } else if (q.includes("comedia") || q.includes("risa") || q.includes("reir") || q.includes("gracios") || q.includes("humor")) {
            catDetectada = 'comedia';
            intro = "😂 Para pasar un buen rato con <b>Comedia</b>:";
        } else if (q.includes("anime") || q.includes("otaku") || q.includes("manga")) {
            catDetectada = 'anime';
            intro = "⛩️ Lo mejor del mundo <b>Anime</b>:";
        } else if (q.includes("serie")) {
            catDetectada = 'serie_solo';
            intro = "📺 <b>Series</b> recomendadas para maratonear:";
        } else if (q.includes("peli") || q.includes("filme")) {
            catDetectada = 'pelicula_solo';
            intro = "🍿 <b>Películas</b> recomendadas hoy:";
        } else if (["mas", "otras", "otros", "otra", "siguiente", "dame mas"].includes(q) && MEMORIA_IA.ultimaCategoria) {
            catDetectada = MEMORIA_IA.ultimaCategoria;
            intro = "🔄 Aquí tienes más opciones del mismo estilo:";
        }

        respuestaHTML = generarRecomendacionesIA(catDetectada, intro);
    }

    // INTENCIÓN 7: BÚSQUEDA DIRECTA O CONVERSACIONAL DE TÍTULO (CON TOLERANCIA A ERRORES)
    else {
        // Limpiar frases introductorias como "ponme", "buscar", "ver", "quiero", "dame"
        var consultaLimpia = q.replace(/^(ponme|pon|buscar|busca|ver|quiero ver|quiero|dame|reproduce|reproducir|tienes)\s+/, '').trim();
        var resultado = buscarEnCatalogoIA(consultaLimpia || q);

        if (resultado.exacto) {
            respuestaHTML = generarRespuestaReproduccion(resultado.exacto);
        } else if (resultado.candidatos.length > 0) {
            No.style.display = 'none';
            Enlace.play();
            MEMORIA_IA.ultimoTitulo = resultado.candidatos[0].nombreLimpio;
            MEMORIA_IA.ultimoObjeto = resultado.candidatos[0];

            var opcionesHtml = resultado.candidatos.map(c => {
                var ico = c.esTV ? '📺' : (c.esSerie ? '🧋' : '🍿');
                return `<div style="margin:6px 0; padding:6px 10px; background:rgba(0,0,0,0.45); border-left:3px solid #4f9; border-radius:6px; cursor:pointer;" onclick="seleccionarSugerenciaIA('${c.nombreLimpio.replace(/'/g, "\\'")}')">
                    <span style="color:#4f9;">${ico} ${c.nombreLimpio}</span>
                    <span style="display:block; font-size:11px; color:#ccc; font-family:sans-serif;">${c.etiqueta}</span>
                </div>`;
            }).join('');

            respuestaHTML = `🤖: ¿Te refieres a alguno de estos títulos? Toca el que quieras ver:<br/>${opcionesHtml}`;
        } else {
            // Búsqueda externa inteligente en GOOGLE-S.html + opción de ficha
            var tituloFallback = textoUsuarioVisible;
            var enlaceGoogleS = `GOOGLE-S.html?texto=${encodeURIComponent(tituloFallback)}`;
            No.style.display = 'none';
            Enlace.play();
            respuestaHTML = `🤖: No lo tengo indexado directo en el catálogo local, pero lo rastreé para ti:<br/>
            <span style="color:#4f9;">"${tituloFallback}"</span><br/><br/>
            <a href="${enlaceGoogleS}" target="_blank" style="color:#4f3; text-decoration:none;">👉🏾🔗 ABRIR BÚSQUEDA 🔗👈🏾</a>`;
        }
    }

    Bot.innerHTML = respuestaHTML;
    Bot.scrollIntoView({ behavior: "smooth" });
}

// ============================================================================
// EVENTOS DE INTERFAZ Y AUTOCOMPLETADO EN TIEMPO REAL
// ============================================================================

document.getElementById("Input").addEventListener("input", function(e) {
    var listaSugerencias = document.getElementById("FiltroSugerencias");
    var val = e.target.value.trim();

    if (val === '') {
        listaSugerencias.style.display = "none";
        return;
    }

    var incluyeN = val.toLowerCase().includes("ñ");
    var inputLimpiado = limpiarTexto(val, incluyeN);
    var itemsFiltro = document.querySelectorAll(".Data-Filtro");
    var coincidencias = 0;

    listaSugerencias.style.display = "block";

    itemsFiltro.forEach(item => {
        var elTitulo = item.querySelector(".titulo-txt").textContent;
        var itemText = limpiarTexto(elTitulo, incluyeN);

        if (itemText.includes(inputLimpiado) && coincidencias < 25) {
            item.style.display = "block";
            coincidencias++;
        } else {
            item.style.display = "none";
        }
    });

    if (coincidencias === 0) {
        listaSugerencias.style.display = "none";
    }
});

// Clic en sugerencia del desplegable
document.getElementById("FiltroSugerencias").addEventListener("click", function(e) {
    var matchedItem = e.target.closest(".Data-Filtro");
    if (matchedItem) {
        var textoCrudo = matchedItem.querySelector(".titulo-txt").textContent;
        document.getElementById("FiltroSugerencias").style.display = "none";
        document.getElementById("Input").value = textoCrudo;
        procesarEntradaUsuario();
    }
});

// Clic en elementos sugeridos dentro del historial del chat
document.getElementById("Lista").addEventListener("click", function(event) {
    var text = event.target.textContent;
    if ((text.includes('🍿') || text.includes('📺')) && !event.target.closest('[onclick]')) {
        var limpio = text.replace(/🍿|📺/g, '').trim();
        if (limpio) {
            document.getElementById("Input").value = limpio;
        }
    }
});

// Ocultar desplegable al hacer clic fuera
document.addEventListener("click", function(e) {
    if (!e.target.closest("#Input") && !e.target.closest("#FiltroSugerencias")) {
        var filtro = document.getElementById("FiltroSugerencias");
        if (filtro) filtro.style.display = "none";
    }
});

// Fullscreen y orientación
function fullScreens() {
    var EMB = document.querySelector('embed') || document.getElementById('FF');
    if (EMB && EMB.requestFullscreen) {
        EMB.requestFullscreen();
    } else if (EMB && EMB.webkitRequestFullscreen) {
        EMB.webkitRequestFullscreen();
    }
}

document.addEventListener('fullscreenchange', function() {
    if (document.fullscreenElement) {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(() => {});
        }
    } else {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('portrait').catch(() => {});
        }
    }
});

// Mensaje de bienvenida inicial con efecto máquina de escribir + arranque de indexación
window.addEventListener('DOMContentLoaded', () => {
    indexarCatalogoIA();

    var UsuarioDummy = document.createElement('li');
    UsuarioDummy.style.display = 'none';
    document.getElementById("Lista").appendChild(UsuarioDummy);

    var BotInicial = document.createElement('li');
    document.getElementById("Lista").appendChild(BotInicial);

    var textoBienvenida = "🤖: ¡Hola! Soy tu IA de Cine y Series 🎬. Pídeme una peli, un género, una sinopsis o dime 'sorpréndeme'.";
    var index = 0;

    function maquinaEscribir() {
        if (index < textoBienvenida.length) {
            BotInicial.textContent += textoBienvenida.charAt(index);
            index++;
            setTimeout(maquinaEscribir, 40);
        } else {
            BotInicial.scrollIntoView({ behavior: "smooth" });
        }
    }

    setTimeout(maquinaEscribir, 800);
});