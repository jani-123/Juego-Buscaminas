class Buscaminas{
    
    creaMatriz()
    {
        let matriz = [];
        for (let i = 0; i < 7; i++) {
            matriz[i] = [];
            for (var j = 0; j < 7; j++) {
                matriz[i][j] = 0;
            }
        }
        return matriz;
    }
    creaMinas() 
    {
        let caja = document.getElementById('tableroBuscaminas');
        caja.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                caja.innerHTML += '<input type="button" name="btn" id="' + i+ '_' + j + '" value=" "/>';
            }
            caja.innerHTML += '<br/>';
        }
    }
    Aleatorio(min, max) 
    {
        return Math.floor(Math.random() * (max - min + 1));
    }
    generaBuscanimas(maximoMinas) 
    { 
        let campo = this.creaMatriz();
        let contadordeMinas = 0;
        while (contadordeMinas < maximoMinas) {
            let minasAleatorias = this.Aleatorio(0, 1);
            let posicionAleatoria = [this.Aleatorio(0, 7 - 1), this.Aleatorio(0, 7 - 1)];
            if (!campo[posicionAleatoria[0]][posicionAleatoria[1]]) {
                contadordeMinas += (minasAleatorias) ? 1 : 0;
                if (minasAleatorias) {
                    campo[posicionAleatoria[0]][posicionAleatoria[1]] = '*';
                    for (let x = posicionAleatoria[0] - 1; x <= posicionAleatoria[0] + 1; x++) {
                        for (let y = posicionAleatoria[1] - 1; y <= posicionAleatoria[1] + 1; y++) {
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
    jugar() 
    {
        let numeroMinas = 7;
        let intentosTotales = (7 * 7) - numeroMinas;
        this.creaMinas();
        let matrix = this.generaBuscanimas(numeroMinas);
        let buttons = document.getElementsByName('btn');
        for (let i = 0; i < buttons.length; i++) {
            let eventoClick = document.getElementById(buttons[i].id);
            eventoClick.addEventListener("click", jugare, false);
            function jugare(e) {
                let punto = e.target.id.split('_');
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
}
let jugador = new Buscaminas();
jugador.jugar();