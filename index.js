(function (doc) {
    const ajax = new XMLHttpRequest();
    let $item = doc.querySelector('[active="true"]');

    // let $itemAll2 = doc.querySelector(".buttons-choose");
    // console.log($itemAll2);
    let $itemAll = doc.querySelector(".buttons-choose");
    let $containerBalls = doc.querySelector(".container-balls");
    let $buttonCompleteGame = doc.querySelector(".button-complete-game");

    let chooseButtonCurrent = "";

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
            chooseButtonCurrent = event.target;

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
                    $div.setAttribute("style", "border: 2px solid #adc0c4");
                    let $span = doc.createElement("span");
                    $div.id = number;

                    $div.addEventListener("click", function ballButton(event) {
                        arrayTemp.push(event.target.innerText);
                        var newArr = arrayTemp.filter(function (item, index) {
                            return arrayTemp.indexOf(item) === index;
                        });

                        if (chooseGame === "lotofacil") {
                            let arr = [];
                            arr.push(...newArr, ...arrayLotofacil);
                            let r = arr.filter(function (item, index) {
                                return arr.indexOf(item) === index;
                            });

                            if ($div.style.border === "2px solid rgb(235, 235, 235)") {
                                $div.setAttribute("style", `border: 2px solid #7f3992`);
                                arrayLotofacil = r;
                            } else if ($div.style.border === "2px solid rgb(127, 57, 146)") {
                                $div.setAttribute("style", `border: 2px solid #adc0c4`);
                                // console.log($div.id);
                                let f = r.filter((item, index) => {
                                    return item !== $div.id;
                                });
                                // console.log("new Array de removido item", f);
                                arrayLotofacil = f;
                            } else {
                                $div.setAttribute("style", `border: 2px solid #7f3992`);
                                arrayLotofacil = r;
                            }
                        } else if (chooseGame === "mega-sena") {
                            // console.log("borda", $div.style.border);
                            let arr = [];
                            arr.push(...newArr, ...arrayMegasena);
                            let r = arr.filter(function (item, index) {
                                return arr.indexOf(item) === index;
                            });

                            if ($div.style.border === "2px solid rgb(235, 235, 235)") {
                                $div.setAttribute("style", "border: 2px solid #01ac66");
                                // console.log("borda para pintar", $div.style.border)
                                arrayMegasena = r;
                            } else if ($div.style.border === "2px solid rgb(1, 172, 102)") {
                                $div.setAttribute("style", `border: 2px solid #adc0c4`);
                                // console.log($div.id);
                                // console.log("borda pintada", $div.style.border)
                                let f = r.filter((item, index) => {
                                    return item !== $div.id;
                                });
                                // console.log("new Array de removido item", f);
                                arrayMegasena = f;
                            } else {
                                $div.setAttribute("style", "border: 2px solid #01ac66");
                                arrayMegasena = r;
                            }
                        } else if (chooseGame === "lotomania") {
                            console.log("borda pintada", $div.style.border);
                            let arr = [];
                            arr.push(...newArr, ...arrayLotomania);
                            let r = arr.filter(function (item, index) {
                                return arr.indexOf(item) === index;
                            });
                            if ($div.style.border === "2px solid rgb(235, 235, 235)") {
                                $div.setAttribute("style", "border: 2px solid #f79c31");
                                // console.log("borda para pintar", $div.style.border)
                                arrayLotomania = r;
                            } else if ($div.style.border === "2px solid rgb(247, 156, 49)") {
                                $div.setAttribute("style", `border: 2px solid #adc0c4`);
                                // console.log($div.id);
                                // console.log("borda pintada", $div.style.border)
                                let f = r.filter((item, index) => {
                                    return item !== $div.id;
                                });
                                // console.log("new Array de removido item", f);
                                arrayLotomania = f;
                            } else {
                                $div.setAttribute("style", "border: 2px solid #f79c31");
                                arrayLotomania = r;
                            }
                        }

                        console.log("loto fácil", arrayLotofacil);
                        console.log("mega-sena", arrayMegasena);
                        console.log("lotomania", arrayLotomania);
                        // showListGames();
                    });

                    $span.textContent = number;

                    $div.className = "ball";
                    $div.appendChild($span);
                    $containerBalls.appendChild($div);
                    // return console.log($containerBalls);
                });
                if (chooseGame === "lotofacil") {
                    arrayLotofacil.forEach((el, index) => {
                        let i = $containerBalls.getElementsByTagName("div").item(el - 1);
                        // console.log(i);
                        i.setAttribute("style", "border: 2px solid #7f3992;");
                    });
                }
                if (chooseGame === "mega-sena") {
                    arrayMegasena.forEach((el, index) => {
                        let i = $containerBalls.getElementsByTagName("div").item(el - 1);
                        // console.log(i);
                        i.setAttribute("style", "border: 2px solid #01ac66;");
                    });
                }
                if (chooseGame === "lotomania") {
                    arrayLotomania.forEach((el, index) => {
                        let i = $containerBalls.getElementsByTagName("div").item(el - 1);
                        // console.log(i);
                        i.setAttribute("style", "border: 2px solid #f79c31;");
                    });
                }
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

    $buttonCompleteGame.addEventListener("click", function completeGame() {
        // return console.log(chooseButtonCurrent)
        let optionDefaultButtonActive;
        if (chooseButtonCurrent === "" || chooseButtonCurrent === "lotofacil") {
            optionDefaultButtonActive = "lotofacil";
            arrayLotofacil = [];
            for (let index = 1; arrayLotofacil.length < 15; index++) {
                let number = Math.floor(Math.random() * 25 + 1);
                const found = arrayLotofacil.find((element) => element === number);
                if (!found) {
                    arrayLotofacil.push(number);
                }
                console.log(arrayLotofacil);
            }
        } else if (chooseButtonCurrent.id === "mega-sena") {
            optionDefaultButtonActive = "mega-sena";
            arrayMegasena = [];
            for (let index = 1; arrayMegasena.length < 6; index++) {
                let number = Math.floor(Math.random() * 60 + 1);
                const found = arrayMegasena.find((element) => element === number);
                if (!found) {
                    arrayMegasena.push(number);
                }
                console.log(arrayMegasena);
            }
        } else if (chooseButtonCurrent.id === "lotomania") {
            optionDefaultButtonActive = "lotomania";
            arrayLotomania = [];
            for (let index = 1; arrayLotomania.length < 20; index++) {
                let number = Math.floor(Math.random() * 50 + 1);
                const found = arrayLotomania.find((element) => element === number);
                if (!found) {
                    arrayLotomania.push(number);
                }
                console.log(arrayLotomania);
            }
        }
        // else {
        //     optionDefaultButtonActive = chooseButtonCurrent.id;
        // }

        loadNumbersGameLotofacil(optionDefaultButtonActive);
        showListGames();
    });
    function showListGames() {
        let $listNumbersLotofacil = doc.querySelector(".number-list-lotofacil");
        $listNumbersLotofacil.innerHTML = arrayLotofacil;
        let $listNumbersMegasena = doc.querySelector(".number-list-megasena");
        $listNumbersMegasena.innerHTML = arrayMegasena;
        let $listNumbersLotomania = doc.querySelector(".number-list-lotomania");
        $listNumbersLotomania.innerHTML = arrayLotomania;
    }
    init();
})(document);
