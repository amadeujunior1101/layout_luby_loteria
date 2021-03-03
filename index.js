(function (doc) {
    const ajax = new XMLHttpRequest();
    let $item = doc.querySelector('[active="true"]');

    // let $itemAll2 = doc.querySelector(".buttons-choose");
    // console.log($itemAll2);
    let $itemAll = doc.querySelector(".buttons-choose");
    let $containerBalls = doc.querySelector(".container-balls");
    let $buttonCompleteGame = doc.querySelector(".button-complete-game");
    let $buttonClearGame = doc.querySelector(".button-clear-game");
    let $buttonAddToCart = doc.querySelector(".button-add-cart");
    let $textValueTotal = doc.querySelector(".span-value-total");
    let $iconRemove = doc.querySelector(".fa-trash-alt");
    // console.log($iconRemove)
    // let $titleCard = doc.querySelector(".title-card");
    // let $listGames = doc.querySelector(".list-games");

    let chooseButtonCurrent = "";

    let choosegame = "lotofacil";

    let arrayLotofacil = [];
    let arrayMegasena = [];
    let arrayLotomania = [];

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
            loadNumbersGames(event.target.id);
            return activeDefaultChoose(event.target);
        },
        false
    );
    function loadNumbersGames(chooseGame) {
        ajax.open("GET", "/game-rules.json", true);
        ajax.send();
        ajax.addEventListener(
            "readystatechange",
            function load() {
                // ajax.onload = "";
                if (!isReady.call()) return;
                const data = ajax.response;
                let rules = JSON.parse(data);
                const gameNumbers = rules[" numberBalls"][chooseGame];
                // console.log(rules[" numberBalls"].lotofacil);
                // let $containerBalls = doc.querySelector(".container-balls");
                $containerBalls.textContent = "";
                let arrayTemp = [];
                if (chooseGame === "lotofacil" && arrayLotofacil.length > 0) {
                    arrayTemp = arrayLotofacil;
                    console.log("Agora é lotofacil");
                }
                if (chooseGame === "mega-sena" && arrayMegasena.length > 0) {
                    arrayTemp = arrayMegasena;
                    console.log("Agora é mega-sena");
                }
                if (chooseGame === "lotomania" && arrayLotomania.length > 0) {
                    arrayTemp = arrayLotomania;
                    console.log("Agora é lotomania");
                }
                gameNumbers.map((number) => {
                    let $div = doc.createElement("div");
                    $div.setAttribute("style", "border: 2px solid #adc0c4");
                    let $span = doc.createElement("span");
                    $div.id = number;
                    // console.log("antes do event target");
                    $div.addEventListener(
                        "click",
                        function selectBall() {
                            //   console.log("div do target=> ", $div.id===event.target.innerText)
                            console.log("event target", $div.id);
                            arrayTemp.push($div.id);
                            var newArr = arrayTemp.filter(function (item, index) {
                                return arrayTemp.indexOf(item) === index;
                            });

                            // return console.log("newArr:::=>", arrayTemp);
                            // let div = $div;

                            if (chooseGame === "lotofacil") {
                                // if (arrayLotofacil.length > 0) {
                                //     newArr = [];
                                //     newArr = arrayLotofacil;
                                // }

                                if ($div.style.border === "2px solid rgb(127, 57, 146)") {
                                    console.log("desmarcado agora: newArr :", arrayTemp);
                                    $div.setAttribute("style", `border: 2px solid #adc0c4`);
                                    // removeItemArray(newArr, $div)
                                    console.log("passosu aqi");
                                    console.log("array original lotofcil:", arrayLotofacil);
                                    arrayTemp = [];
                                    arrayTemp = newArr;

                                    // console.log("id para remover", $div.id);
                                    arrayTemp.forEach(function (item, index, object) {
                                        if (item === $div.id) {
                                            // console.log("Item da comparação", index, item, $div.id);
                                            object.splice(index, 1);
                                        }
                                    });
                                    arrayLotofacil = arrayTemp;
                                    console.log("lotofacil apos a remoção:", arrayLotofacil);
                                } else {
                                    $div.setAttribute("style", `border: 2px solid #7f3992`);
                                    // console.log("marcado");

                                    arrayLotofacil = arrayTemp;
                                }
                            } else if (chooseGame === "mega-sena") {
                                if ($div.style.border === "2px solid rgb(1, 172, 102)") {
                                    $div.setAttribute("style", `border: 2px solid #adc0c4`);
                                    arrayTemp = [];
                                    arrayTemp = newArr;

                                    // console.log("id para remover", $div.id);
                                    arrayTemp.forEach(function (item, index, object) {
                                        if (item === $div.id) {
                                            // console.log("Item da comparação", index, item, $div.id);
                                            object.splice(index, 1);
                                        }
                                    });
                                    // console.log("Apos a remoção:", arrayTemp);
                                    arrayMegasena = arrayTemp;
                                } else {
                                    $div.setAttribute("style", "border: 2px solid #01ac66");
                                    arrayMegasena = arrayTemp;
                                }
                            } else if (chooseGame === "lotomania") {
                                if ($div.style.border === "2px solid rgb(247, 156, 49)") {
                                    $div.setAttribute("style", `border: 2px solid #adc0c4`);
                                    arrayTemp = [];
                                    arrayTemp = newArr;

                                    // console.log("id para remover", $div.id);
                                    arrayTemp.forEach(function (item, index, object) {
                                        if (item === $div.id) {
                                            // console.log("Item da comparação", index, item, $div.id);
                                            object.splice(index, 1);
                                        }
                                    });
                                    // console.log("Apos a remoção:", arrayTemp);
                                    arrayLotomania = arrayTemp;
                                } else {
                                    $div.setAttribute("style", "border: 2px solid #f79c31");
                                    arrayLotomania = arrayTemp;
                                }
                            }
                            addToCart();
                            // alterArrays(chooseGame, newArr, div);
                        },
                        false
                    );

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
                // sumCart();
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
        } else if (item.className === "choose-button-two") {
            activeDefault.setAttribute("style", styleActiveButtonMegasena);
        } else if (item.className === "choose-button-three") {
            activeDefault.setAttribute("style", styleActiveButtonLotomania);
        }
    }

    $buttonCompleteGame.addEventListener("click", function completeGame() {
        // return console.log(chooseButtonCurrent.id)
        let optionDefaultButtonActive;
        if (chooseButtonCurrent === "" || chooseButtonCurrent.id === "lotofacil") {
            optionDefaultButtonActive = "lotofacil";
            arrayLotofacil = [];
            while (arrayLotofacil.length < 15) {
                let number = Math.floor(Math.random() * 25 + 1);
                const found = arrayLotofacil.some((element) => element == number);
                console.log(found);
                if (!found) {
                    let newNumber = "";

                    number < 10
                        ? (newNumber = `${"0" + String(number)}`)
                        : (newNumber = String(number));
                    // console.log("number->", newNumber);
                    arrayLotofacil.push(newNumber);
                    console.log(chooseButtonCurrent);
                    // loadNumbersGames(chooseButtonCurrent.id)
                    // arrayTemp.push($div.id);
                    // var newArr = arrayTemp.filter(function (item, index) {
                    //     return arrayTemp.indexOf(item) === index;
                    // });
                }
                // console.log(arrayLotofacil);
            }
        } else if (chooseButtonCurrent.id === "mega-sena") {
            optionDefaultButtonActive = "mega-sena";
            arrayMegasena = [];
            for (let index = 1; arrayMegasena.length < 6; index++) {
                let number = Math.floor(Math.random() * 60 + 1);
                const found = arrayMegasena.some((element) => element === number);
                if (!found) {
                    let newNumber = "";

                    number < 10
                        ? (newNumber = `${"0" + String(number)}`)
                        : (newNumber = String(number));

                    arrayMegasena.push(newNumber);
                }
                // console.log(arrayMegasena);
            }
        } else if (chooseButtonCurrent.id === "lotomania") {
            optionDefaultButtonActive = "lotomania";
            arrayLotomania = [];
            for (let index = 1; arrayLotomania.length < 20; index++) {
                let number = Math.floor(Math.random() * 50 + 1);
                const found = arrayLotomania.some((element) => element === number);
                if (!found) {
                    let newNumber = "";

                    number < 10
                        ? (newNumber = `${"0" + String(number)}`)
                        : (newNumber = String(number));

                    arrayLotomania.push(newNumber);
                }
                // console.log(arrayLotomania);
            }
        }
        // else {
        //     optionDefaultButtonActive = chooseButtonCurrent.id;
        // }

        loadNumbersGames(optionDefaultButtonActive);
        // addToCart();
    });

    $buttonClearGame.addEventListener("click", function clearGame() {
        // return console.log(chooseButtonCurrent.id)
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

    $iconRemove.addEventListener("click", function clearGame() {
        let d = $iconRemove.parentElement;
        // console.log("Parent span lotofacil:=>", d.parentElement.getElementsByClassName);
        let s = d.parentElement
        if (
           s.getElementsByClassName("number-list-lotofacil")[0].className !==
            undefined
        ) {
            arrayLotofacil = [];
        }
        if (
           s.getElementsByClassName("number-list-megasena")[0].className !==
            undefined
        ) {
            arrayMegasena = [];
        }
        if (
           s.getElementsByClassName("number-list-lotomania")[0].className !==
            undefined
        ) {
            arrayLotomania = [];
        }
        // let optionDefaultButtonActive;
        // if (s === "lotofacil") {
        //     optionDefaultButtonActive = "lotofacil";
        // } else if (chooseButtonCurrent.id === "mega-sena") {
        //     optionDefaultButtonActive = "mega-sena";
        //     arrayMegasena = [];
        // } else if (chooseButtonCurrent.id === "lotomania") {
        //     optionDefaultButtonActive = "lotomania";
        //     arrayLotomania = [];
        // }

        // loadNumbersGames(optionDefaultButtonActive);
        addToCart();
    });

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

    function removeItemArray(arr, $div) {
        // console.log("RmoveItemArray");
        arr.forEach(function (item, index, object) {
            // console.log("YippeeeE!!!!!!!!!!!!!!!!");
            if (index === Number($div.id - 1)) {
                object.splice(index, 1);
            }
        });
        arrayLotofacil = arr;
    }

    function sumCart() {
        let price = 0;
        if (arrayLotofacil.length === 15) {
            price += 5;
        }
        if (arrayMegasena.length === 6) {
            price += 7.5;
        }
        if (arrayLotomania.length === 20) {
            price += 5.5;
        }

        // $titleCard.setAttribute("style", "display: flex");
        // console.log("lists", $listGames)
        // $listGames.setAttribute("style", "display: flex");
        $textValueTotal.innerHTML = price;
        console.log("Soma das apostas: ", price);
    }

    init();
})(document);
