(function (doc) {
    const ajax = new XMLHttpRequest();
    let $item = doc.querySelector('[active="true"]');

    let $itemAll = doc.querySelector(".buttons-choose");

    let $containerBalls = doc.querySelector(".container-balls");
    let $buttonCompleteGame = doc.querySelector(".button-complete-game");
    let $buttonClearGame = doc.querySelector(".button-clear-game");
    let $buttonAddToCart = doc.querySelector(".button-add-cart");
    let $textValueTotal = doc.querySelector(".span-value-total");
    let $iconRemove = doc.querySelectorAll(".game-icon");

    let chooseButtonCurrent = "";

    let choosegame = "lotofacil";

    let arrayLotofacil = [];
    let arrayMegasena = [];
    let arrayLotomania = [];

    let priceGameLotofacil = 0;
    let priceGameMegasena = 0;
    let priceGameLotomania = 0;

    let styleNoActiveButtonLotofacil = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    border: 2px solid #7f3992; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #7f3992`;

    let styleActiveButtonLotofacil = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    border: 2px solid #7f3992; background: #7f3992; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #fff`;

    let styleActiveButtonMegasena = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    background: #01ac66; cursor: pointer; text-align: center; border: 2px solid #01ac66;
    font: italic normal bold 14px Helvetica Neue; color: #fff`;

    let styleNoActiveButtonMegasena = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    border: 2px solid #01ac66; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #01ac66`;

    let styleActiveButtonLotomania = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    background: #f79c31; cursor: pointer; text-align: center; border: 2px solid #f79c31;
    font: italic normal bold 14px Helvetica Neue; color: #fff`;

    let styleNoActiveButtonLotomania = `width: 113px; height: 34px; border-radius: 30px; border-width: 0;
    border: 2px solid #f79c31; cursor: pointer; text-align: center; 
    font: italic normal bold 14px Helvetica Neue; color: #f79c31`;

    function init() {
        activeDefaultChoose($item);
        loadNumbersGames(choosegame);
        getPrices();
    }
    let elementItemAll = 0;
    while (elementItemAll < $itemAll.children.length) {
        $itemAll.children[elementItemAll].addEventListener(
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

                loadNumbersGames(event.target.id);
                return activeDefaultChoose(event.target);
            },
            false
        );
        elementItemAll++;
    }

    function loadNumbersGames(chooseGame) {
        ajax.open("GET", "/game-rules.json", true);
        ajax.send();
        ajax.addEventListener(
            "readystatechange",
            function load() {
                if (!isReady.call()) return;
                const data = ajax.response;
                let rules = JSON.parse(data);
                const gameNumbers = rules[" numberBalls"][chooseGame];

                $containerBalls.textContent = "";
                let arrayTemp = [];
                if (chooseGame === "lotofacil" && arrayLotofacil.length > 0) {
                    arrayTemp = arrayLotofacil;
                }
                if (chooseGame === "mega-sena" && arrayMegasena.length > 0) {
                    arrayTemp = arrayMegasena;
                }
                if (chooseGame === "lotomania" && arrayLotomania.length > 0) {
                    arrayTemp = arrayLotomania;
                }
                gameNumbers.map((number) => {
                    let $div = doc.createElement("div");
                    $div.setAttribute("style", "border: 2px solid #adc0c4");
                    let $span = doc.createElement("span");
                    $div.id = number;

                    $div.addEventListener(
                        "click",
                        function selectBall() {
                            arrayTemp.push($div.id);
                            let newArr = arrayTemp.filter(function (item, index) {
                                return arrayTemp.indexOf(item) === index;
                            });

                            if (chooseGame === "lotofacil") {
                                if ($div.style.border === "2px solid rgb(127, 57, 146)") {
                                    $div.setAttribute("style", `border: 2px solid #adc0c4`);

                                    arrayTemp = [];
                                    arrayTemp = newArr;

                                    arrayTemp.forEach(function (item, index, object) {
                                        if (item === $div.id) {
                                            object.splice(index, 1);
                                        }
                                    });
                                    arrayLotofacil = arrayTemp;
                                    addToCart();
                                } else {
                                    $div.setAttribute("style", `border: 2px solid #7f3992`);

                                    arrayLotofacil = arrayTemp;
                                }
                            } else if (chooseGame === "mega-sena") {
                                if ($div.style.border === "2px solid rgb(1, 172, 102)") {
                                    $div.setAttribute("style", `border: 2px solid #adc0c4`);
                                    arrayTemp = [];
                                    arrayTemp = newArr;

                                    arrayTemp.forEach(function (item, index, object) {
                                        if (item === $div.id) {
                                            object.splice(index, 1);
                                        }
                                    });
                                    arrayMegasena = arrayTemp;
                                    addToCart();
                                } else {
                                    $div.setAttribute("style", "border: 2px solid #01ac66");
                                    arrayMegasena = arrayTemp;
                                }
                            } else if (chooseGame === "lotomania") {
                                if ($div.style.border === "2px solid rgb(247, 156, 49)") {
                                    $div.setAttribute("style", `border: 2px solid #adc0c4`);
                                    arrayTemp = [];
                                    arrayTemp = newArr;

                                    arrayTemp.forEach(function (item, index, object) {
                                        if (item === $div.id) {
                                            object.splice(index, 1);
                                        }
                                    });
                                    arrayLotomania = arrayTemp;
                                    addToCart();
                                } else {
                                    $div.setAttribute("style", "border: 2px solid #f79c31");
                                    arrayLotomania = arrayTemp;
                                }
                            }
                        },
                        false
                    );

                    $span.textContent = number;

                    $div.className = "ball";
                    $div.appendChild($span);
                    $containerBalls.appendChild($div);
                });
                if (chooseGame === "lotofacil") {
                    arrayLotofacil.forEach((el, index) => {
                        let i = $containerBalls.getElementsByTagName("div").item(el - 1);
                        i.setAttribute("style", "border: 2px solid #7f3992;");
                    });
                }
                if (chooseGame === "mega-sena") {
                    arrayMegasena.forEach((el, index) => {
                        let i = $containerBalls.getElementsByTagName("div").item(el - 1);
                        i.setAttribute("style", "border: 2px solid #01ac66;");
                    });
                }
                if (chooseGame === "lotomania") {
                    arrayLotomania.forEach((el, index) => {
                        let i = $containerBalls.getElementsByTagName("div").item(el - 1);
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

        if (item.className === "choose-button-one") {
            activeDefault.setAttribute("style", styleActiveButtonLotofacil);
        } else if (item.className === "choose-button-two") {
            activeDefault.setAttribute("style", styleActiveButtonMegasena);
        } else if (item.className === "choose-button-three") {
            activeDefault.setAttribute("style", styleActiveButtonLotomania);
        }
    }

    $buttonCompleteGame.addEventListener("click", function completeGame() {
        let optionDefaultButtonActive;
        if (chooseButtonCurrent === "" || chooseButtonCurrent.id === "lotofacil") {
            optionDefaultButtonActive = "lotofacil";
            arrayLotofacil = [];
            while (arrayLotofacil.length < 15) {
                let number = Math.floor(Math.random() * 25 + 1);
                const found = arrayLotofacil.some((element) => element == number);

                if (!found) {
                    arrayLotofacil.push(number < 10 ? `${"0" + String(number)}` : String(number));
                }
            }
        } else if (chooseButtonCurrent.id === "mega-sena") {
            optionDefaultButtonActive = "mega-sena";
            arrayMegasena = [];
            while (arrayMegasena.length < 6) {
                let number = Math.floor(Math.random() * 60 + 1);
                const found = arrayMegasena.some((element) => element === number);
                if (!found) {
                    arrayMegasena.push(number < 10 ? `${"0" + String(number)}` : String(number));
                }
            }
        } else if (chooseButtonCurrent.id === "lotomania") {
            optionDefaultButtonActive = "lotomania";
            arrayLotomania = [];
            while (arrayLotomania.length < 20) {
                let number = Math.floor(Math.random() * 50 + 1);
                const found = arrayLotomania.some((element) => element === number);
                if (!found) {
                    arrayLotomania.push(number < 10 ? `${"0" + String(number)}` : String(number));
                }
            }
        }

        loadNumbersGames(optionDefaultButtonActive);
    });

    $buttonClearGame.addEventListener("click", function clearGame() {
        let optionDefaultButtonActive;
        if (chooseButtonCurrent === "" || chooseButtonCurrent.id === "lotofacil") {
            optionDefaultButtonActive = "lotofacil";
            arrayLotofacil = [];
        } else if (chooseButtonCurrent.id === "mega-sena") {
            optionDefaultButtonActive = "mega-sena";
            arrayMegasena = [];
        } else if (chooseButtonCurrent.id === "lotomania") {
            optionDefaultButtonActive = "lotomania";
            arrayLotomania = [];
        }

        loadNumbersGames(optionDefaultButtonActive);
        addToCart();
    });

    for (let elementIconRemove = 0; elementIconRemove < 3; elementIconRemove++) {
        console.log('iconRemove', $iconRemove)
        $iconRemove[elementIconRemove].addEventListener("click", function clearGame() {
            let optionDefaultButtonActive = $iconRemove[
                elementIconRemove
            ].parentNode.firstElementChild.children[0].className.split(" ", 3)[2];

            if (
                $iconRemove[elementIconRemove].parentNode.firstElementChild.children[0]
                    .className === "fas fa-trash-alt lotofacil" &&
                arrayLotofacil.length > 0
            ) {
                arrayLotofacil = [];
                loadNumbersGames(optionDefaultButtonActive);
                addToCart();
            }
            if (
                $iconRemove[elementIconRemove].parentNode.firstElementChild.children[0]
                    .className === "fas fa-trash-alt mega-sena" &&
                arrayMegasena.length > 0
            ) {
                arrayMegasena = [];
                loadNumbersGames(optionDefaultButtonActive);
                addToCart();
            }
            if (
                $iconRemove[elementIconRemove].parentNode.firstElementChild.children[0]
                    .className === "fas fa-trash-alt lotomania" &&
                arrayLotomania.length > 0
            ) {
                arrayLotomania = [];
                loadNumbersGames(optionDefaultButtonActive);
                addToCart();
            }
        });
    }

    $buttonAddToCart.addEventListener("click", function clearGame() {
        addToCart();
    });

    function addToCart() {
        let $listNumbersLotofacil = doc.querySelector(".number-list-lotofacil");
        $listNumbersLotofacil.innerHTML = arrayLotofacil;
        let $listNumbersMegasena = doc.querySelector(".number-list-megasena");
        $listNumbersMegasena.innerHTML = arrayMegasena;
        let $listNumbersLotomania = doc.querySelector(".number-list-lotomania");
        $listNumbersLotomania.innerHTML = arrayLotomania;

        sumCart();
    }

    function sumCart() {
        let price = 0;
        if (arrayLotofacil.length === 15) {
            price += priceGameLotofacil;
        }
        if (arrayMegasena.length === 6) {
            price += priceGameMegasena;
        }
        if (arrayLotomania.length === 20) {
            price += priceGameLotomania;
        }

        $textValueTotal.innerHTML = price;
    }

    function getPrices() {
        ajax.open("GET", "/game-rules.json", true);
        ajax.send();
        ajax.addEventListener("readystatechange", function load() {
            if (!isReady.call()) return;
            const data = ajax.response;
            let prices = JSON.parse(data);

            priceGameLotofacil = prices.price[0].lotofacil;
            priceGameMegasena = prices.price[1]["mega-sena"];
            priceGameLotomania = prices.price[2].lotomania;
        });
    }

    init();
})(document);
