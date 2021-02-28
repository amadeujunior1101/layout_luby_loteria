(function (doc) {
    const ajax = new XMLHttpRequest();
    let $item = doc.querySelector('[active="true"]');
    let $itemAll = doc.querySelector(".buttons-choose");

    function init() {
        activeDefaultChoose($item);
        loadNumbersGameLotofacil();
        // modifyActiveButtonChoose();
    }

    $itemAll.addEventListener(
        "click",
        function modifyActiveButtonChoose(event) {
            let $itemLotofacil = doc.querySelector(".choose-button-one");
            let $itemMegasena = doc.querySelector(".choose-button-two");
            let $itemLotomania = doc.querySelector(".choose-button-three");

            $itemLotofacil.attributes.active.textContent = "false";
            $itemMegasena.attributes.active.textContent = "false";
            $itemLotomania.attributes.active.textContent = "false";

            event.target.attributes.active.textContent = "true";
                    return activeDefaultChoose(event.target);

            // return console.log($itemAll)
            // $item.forEach(function (item, index, array) {
            //     console.log(item[0]);
            // });
            // console.log($item);
            doc.querySelector(".buttons-choose").addEventListener(
                "click",
                function (event) {
                    event.target.attributes.active.textContent = "true";
                    return activeDefaultChoose(event.target);
                    // console.log(event.target.className); // este é o elemento clicado
                    // console.log(
                    //     "O elemento clicado foi o " + event.target.innerHTML
                    // );
                    // dentro desta função o "this" refere-se ao <li>
                }
            );

            // addEventListener("click", function () {
            //     console.log(doc.querySelectorAll("[active]"));
            // });
        },
        false
    );
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
                    // return console.log($containerBalls);
                });
            },
            true
        );
    }
    function isReady() {
        return ajax.readyState === 4 && ajax.status === 200;
    }
    function activeDefaultChoose(item) {
      
        let activeDefault = item;
        activeDefault.setAttribute(
            "style",
            `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
            background: #7f3992; cursor: pointer; text-align: center; 
            font: italic normal bold 14px Helvetica Neue; color: #fff`
        );
    }
    init();
})(document);
