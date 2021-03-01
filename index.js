(function (doc) {
    const ajax = new XMLHttpRequest();
    let $item = doc.querySelector('[active="true"]');
    let $itemAll = doc.querySelector(".buttons-choose");
    let $containerBalls = doc.querySelector(".container-balls");

    let choosegame = "lotofacil";

    let arrayLotofacil = [];
    let arrayMegasena = [];
    let arrayLotomania = [];

    let styleNoActiveButtonLotofacil = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    border: 2px solid #7f3992; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #7f3992`;

    let styleActiveButtonLotofacil = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    background: #7f3992; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #fff`;

    let styleActiveButtonMegasena = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    background: #01ac66; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #fff`;

    let styleNoActiveButtonMegasena = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    border: 2px solid #01ac66; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #01ac66`;

    let styleActiveButtonLotomania = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    background: #f79c31; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #fff`;

    let styleNoActiveButtonLotomania = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    border: 2px solid #f79c31; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #f79c31`;

    function init() {
        activeDefaultChoose($item);
        loadNumbersGameLotofacil(choosegame);
        // modifyActiveButtonChoose();
    }

    $itemAll.addEventListener(
        "click",
        function modifyActiveButtonChoose(event) {
            let $itemLotofacil = doc.querySelector(".choose-button-one");
            let $itemMegasena = doc.querySelector(".choose-button-two");
            let $itemLotomania = doc.querySelector(".choose-button-three");

            $itemLotofacil.setAttribute("style", styleNoActiveButtonLotofacil);
            $itemMegasena.setAttribute("style", styleNoActiveButtonMegasena);
            $itemLotomania.setAttribute("style", styleNoActiveButtonLotomania);

            $itemLotofacil.attributes.active.textContent = "false";
            $itemMegasena.attributes.active.textContent = "false";
            $itemLotomania.attributes.active.textContent = "false";

            event.target.attributes.active.textContent = "true";
            // console.log(event.target.id);
            loadNumbersGameLotofacil(event.target.id);
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
    function loadNumbersGameLotofacil(chooseGame) {
        ajax.open("GET", "/game-rules.json", true);
        ajax.send();
        ajax.addEventListener(
            "readystatechange",
            function load() {
                ajax.onload = "";
                if (!isReady.call()) return;
                const data = ajax.response;
                let rules = JSON.parse(data);
                const gameNumbers = rules[" numberBalls"][chooseGame];
                // console.log(rules[" numberBalls"].lotofacil);
                // let $containerBalls = doc.querySelector(".container-balls");
                $containerBalls.textContent = "";
                let arrayTemp = [];
                gameNumbers.map((number) => {
                    let $div = doc.createElement("div");
                    let $span = doc.createElement("span");
                    $div.id = number;
                    $div.addEventListener("click", function ballButton(event) {
                        arrayTemp.push(event.target.innerText);
                        var newArr = arrayTemp.filter(function (item, index) {
                            return arrayTemp.indexOf(item) === index;
                        });
                        // console.log(arrayTemp);
                        // let t = []
                        // if (chooseGame === "lotofacil") return t = arrayLotofacil
                        // if (chooseGame === "mega-sena") return t = arrayMegasena
                        // if (chooseGame === "lotomania") return t = arrayLotomania
                        arrayLotofacil.forEach((el, index) => {
                            console.log("Foreach lotofacil", el);
                            let i = $containerBalls
                                .getElementsByTagName("div")
                                .item(el - 1);
                            console.log(i);
                            i.setAttribute(
                                "style",
                                "border: 2px solid #7f3992;"
                            );
                        });

                        if (chooseGame === "lotofacil") {
                            $div.setAttribute(
                                "style",
                                "border: 2px solid #7f3992"
                            );
                            let arr = [];
                            arr.push(...newArr, ...arrayLotofacil);
                            let r = arr.filter(function (item, index) {
                                return arr.indexOf(item) === index;
                            });
                            arrayLotofacil = r;
                        } else if (chooseGame === "mega-sena") {
                            $div.setAttribute(
                                "style",
                                "border: 2px solid #01ac66"
                            );

                            let arr = [];
                            arr.push(...newArr, ...arrayMegasena);
                            let r = arr.filter(function (item, index) {
                                return arr.indexOf(item) === index;
                            });
                            arrayMegasena = r;
                        } else if (chooseGame === "lotomania") {
                            $div.setAttribute(
                                "style",
                                "border: 2px solid #f79c31"
                            );
                            let arr = [];
                            arr.push(...newArr, ...arrayLotomania);
                            let r = arr.filter(function (item, index) {
                                return arr.indexOf(item) === index;
                            });
                            arrayLotomania = r;
                        }

                        console.log("loto fácil", arrayLotofacil);
                        console.log("mega-sena", arrayMegasena);
                        console.log("lotomania", arrayLotomania);
                    });

                    $span.textContent = number;

                    $div.className = "ball";
                    $div.appendChild($span);
                    $containerBalls.appendChild($div);
                    // return console.log($containerBalls);
                });
            },
            false
        );
    }
    function isReady() {
        return ajax.readyState === 4 && ajax.status === 200;
    }
    function activeDefaultChoose(item) {
        let activeDefault = item;
        // console.log(item.id);
        console.log("loto fácil", arrayLotofacil);
        console.log("mega-sena", arrayMegasena);
        console.log("lotomania", arrayLotomania);

        if (item.className === "choose-button-one") {
            activeDefault.setAttribute("style", styleActiveButtonLotofacil);
            /* arrayLotofacil.forEach((el, index) => {
                console.log("Foreach lotofacil", el);
                //   return console.log("element: ", el, "=>",  $div)
                // return item.setAttribute("style", "border: 2px solid #7f3992");
                let i = $containerBalls
                    .getElementsByTagName("div")
                    .item(el - 1);
                console.log(i);
                i.setAttribute("style", "border: 2px solid #7f3992;");
               
            });*/
            // console.log($containerBalls.getElementsByTagName("div").item(0));
        } else if (item.className === "choose-button-two") {
            activeDefault.setAttribute("style", styleActiveButtonMegasena);
            // console.log($containerBalls);
            // activeDefault.setAttribute("style", styleActiveButtonMegasena);
        } else if (item.className === "choose-button-three") {
            activeDefault.setAttribute("style", styleActiveButtonLotomania);
            // console.log($containerBalls);
        }
    }
    init();
})(document);
