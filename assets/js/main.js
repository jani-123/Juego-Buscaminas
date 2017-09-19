function creaMatriz() {
    var matriz = [];
    for (var i = 0; i < 7; i++) {
        matriz[i] = [];
        for (var j = 0; j < 7; j++) {
            matriz[i][j] = 0;
        }
    }
    return matriz;
}

function creaMinas(elementoId) {
    var caja = document.getElementById(elementoId);
    caja.innerHTML = '';
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            caja.innerHTML += '<input type="button" name="btn" id="' + i + '_' + j + '" value=" "/>';
        }
        caja.innerHTML += '<br/>';
    }
}
function Aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}
function generaBuscanimas(maximoMinas) { // crea las posisiones aleatorias para las minas
    var campo = creaMatriz();
    var contadordeMinas = 0;
    while (contadordeMinas < maximoMinas) {
        var minasAleatorias = Aleatorio(0, 1);
        var posicionAleatoria = [Aleatorio(0, 7 - 1), Aleatorio(0, 7 - 1)];
        console.log("piscion aleatoria", posicionAleatoria);

        if (!campo[posicionAleatoria[0]][posicionAleatoria[1]]) {
            contadordeMinas += (minasAleatorias) ? 1 : 0;

            if (minasAleatorias) {
                campo[posicionAleatoria[0]][posicionAleatoria[1]] = '*';
                for (var x = posicionAleatoria[0] - 1; x <= posicionAleatoria[0] + 1; x++) {
                    for (var y = posicionAleatoria[1] - 1; y <= posicionAleatoria[1] + 1; y++) {
                        try {
                            campo[x][y] += (campo[x][y] != '*') ? 1 : '';
                        }
                        catch (e) { }//TypeError probablemente 
                    }
                }
            }
        }
    }
    return campo;
}
function jugar() {
    var numeroMinas = 7;
    var intentosTotales = (7 * 7) - numeroMinas;

    creaMinas('tableroBuscaminas');
    matrix = generaBuscanimas(numeroMinas);
    buttons = document.getElementsByName('btn');

    for (var i = 0; i < buttons.length; i++) {
        var eventoClick = document.getElementById(buttons[i].id);
        eventoClick.addEventListener("click", jugare, false);
        function jugare(e) {
            var punto = e.target.id.split('_');
            e.target.value = matrix[parseInt(punto[0])][parseInt(punto[1])];
            if (matrix[parseInt(punto[0])][parseInt(punto[1])] == '*') {
                alert('Esto ha explotado!');
                remover();
            };
            e.target.disabled = "true";
            intentosTotales--;
            if (!intentosTotales) {
                alert('Sorprendentemente Ganastes :)');
            }
        }
        function remover() {
            eventoClick.removeEventListener("click", jugare);
        }
    }
}
jugar();