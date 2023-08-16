const elemBusca = document.querySelector("#busca");
const elemSugestoes = document.querySelector(".sugestoes");
const elemHistorico = document.querySelector(".historico")
let historico = [];

elemBusca.addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        aliemntarHistorico(elemBusca.value);
    }

    if(elemBusca.value == "") {
        elemHistorico.classList.add("ativado");
        limparSugestoes();
    } else if (event.key != " ") {
        elemHistorico.classList.remove("ativado");
        criarSugestao(elemBusca.value);
    }
});

function aliemntarHistorico(texto) {
    if(historico.some(h => h == elemBusca.value)) return;
    historico.push(texto);

        elemHistorico.innerHTML = "";
        historico.forEach(historico => {
        const elemP = document.createElement("p");
        elemP.setAttribute("class", "sugestao");
        elemP.innerHTML = historico;
        elemHistorico.appendChild(elemP);
    })
}

function limparSugestoes() {
    elemSugestoes.innerHTML = "";
}

// <div class="sugestao">Texto de Sugestão</div>
async function criarSugestao(texto) {
    const palavras = await fetch("./palavras.json").then(async (dados) => {
        const r = await dados.json();
        return r.palavras;
    });

    let sugestoes = palavras.filter(palavra => palavra.startsWith(texto));
    criarElementos(sugestoes);
};

function criarElementos(sugestoes) {
    limparSugestoes();
    sugestoes.forEach(function(sugestao) {
        const elemDiv = document.createElement("div");
        elemDiv.setAttribute("class", "sugestao");
        elemDiv.innerHTML = sugestao;
    
        elemDiv.addEventListener("click", function() {
            elemBusca.value = sugestao;
            limparSugestoes();
            aliemntarHistorico(sugestao)
        });
    
        elemSugestoes.appendChild(elemDiv);
    })
}