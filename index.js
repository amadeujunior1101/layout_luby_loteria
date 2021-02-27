(function (doc) {
    const ajax = new XMLHttpRequest();

    function init() {
        loadNumbersGameLotofacil();
    }

    function loadNumbersGameLotofacil() {
        ajax.open("GET", "/game-rules.json", true);
        ajax.send();
        ajax.addEventListener(
            "readystatechange",
            function load() {
                ajax.onload = "";
                if (!isReady.call()) return;
                const data = ajax.response;
                let rules = JSON.parse(data);
                const gameNumbers = rules[" numberBalls"]["mega-sena"];
                // console.log(rules[" numberBalls"].lotofacil);
                gameNumbers.map((number) => {
                    let $containerBalls = doc.querySelector(".container-balls");
                    let $div = doc.createElement("div");
                    let $span = doc.createElement("span");
                    $div.id = number;

                    $span.textContent = number;

                    $div.className = "ball";
                    $div.appendChild($span);
                    $containerBalls.appendChild($div);
                    return console.log($containerBalls);
                });
            },
            true
        );
    }
    function isReady() {
        return ajax.readyState === 4 && ajax.status === 200;
    }

    init();
})(document);
