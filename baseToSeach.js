/*
Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
salvando-os temporariamente na memória de um servidor.
Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
que possamos utilizar para salvar as informações dos nossos carros.
Para utilizá-lo, você vai precisar fazer o seguinte:
- Via terminal, acesse o diretório `server`;
- execute o comando `npm install` para instalar as dependências;
- execute `node app.js` para iniciar o servidor.
Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
`http://localhost:3000`
O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
As mudanças que você irá precisar fazer no seu projeto são:
- Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
`http://localhost:3000/car`
- Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
os seguintes campos:
  - `image` com a URL da imagem do carro;
  - `brandModel`, com a marca e modelo do carro;
  - `year`, com o ano do carro;
  - `plate`, com a placa do carro;
  - `color`, com a cor do carro.
Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.
Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
do pull request.
*/

(function (DOM) {
  "use strict";

  var app = (function () {
    let $tableCar = DOM('[data-js="table-car"]').get();
    let $formRegister = DOM('[data-js="form-register"]').get();
    let cars = [];
    let id_sequence = 0;
    return {
      init: function init() {
        console.log("app init");
        this.companyInfo();
        this.getLoadData();
        this.initEvents();
      },
      initEvents: function initEvents() {
        DOM('[data-js="form-register"]').on("submit", this.handleSubmit);
      },
      handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        $tableCar.appendChild(app.createNewCar());
      },
      createNewCar: function createNewCar() {
        $tableCar.setAttribute("style", "display: block");
        document
          .querySelector(".container")
          .setAttribute("style", "display: flex; justify-content: center;");

        $formRegister.setAttribute(
          "style",
          "width: 50%; display: flex; justify-content: center;"
        );

        let $fragment = document.createDocumentFragment();
        let $tr = document.createElement("tr");

        let $tdImage = document.createElement("td");
        let $image = document.createElement("img");
        let $tdBrand = document.createElement("td");
        let $tdYear = document.createElement("td");
        let $tdPlate = document.createElement("td");
        let $tdColor = document.createElement("td");
        let $tdButton = document.createElement("td");

        $image.src = DOM('[data-js="image"]').get().value;
        $tdImage.appendChild($image);
        id_sequence++;
        $tr.id = id_sequence;

        $tdBrand.textContent = DOM('[data-js="brand-model"]').get().value;
        $tdYear.textContent = DOM('[data-js="year"]').get().value;
        $tdPlate.textContent = DOM('[data-js="plate"]').get().value;
        $tdColor.textContent = DOM('[data-js="color"]').get().value;

        $tdButton = document.createElement("button");
        $tdButton.innerHTML = "Remover";
        $tdButton.addEventListener("click", this.removeRow, false);

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdButton);

        const ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3333/car", true);
        ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        ajax.send(
          JSON.stringify({
            id: id_sequence,
            image: $image.src,
            brandModel: $tdBrand.textContent,
            year: $tdYear.textContent,
            plate: $tdPlate.textContent,
            color: $tdColor.textContent,
          })
        );

        return $fragment.appendChild($tr);
      },
      companyInfo: function companyInfo() {
        const ajax = new XMLHttpRequest();
        ajax.open("GET", "/company.json", true);
        ajax.send();
        ajax.addEventListener("readystatechange", this.getCompanyInfo, false);
      },
      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this)) return;
        const data = JSON.parse(this.responseText);

        let $titlePage = DOM('[data-js="title-page"]').get();
        let $companyName = DOM('[data-js="company-name"]').get();
        let $companyPhone = DOM('[data-js="company-phone"]').get();

        $titlePage.textContent = data.name;
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },
      getLoadData: function getLoadData() {
        const ajax = new XMLHttpRequest();
        ajax.open("GET", "http://localhost:3333/", true);
        ajax.send();
        ajax.addEventListener("readystatechange", this.getData, true);
      },
      getData: function getData() {
        if (!app.isReady.call(this)) return;

        const data = this.responseText;
        cars = JSON.parse(data);
        console.log(cars);

        if (cars.length === 0) {
          $tableCar.setAttribute("style", "display: none");
          $formRegister.setAttribute(
            "style",
            "width: 100%; display: flex; justify-content: center;"
          );
        }

        cars.map((car) => {
          let $fragment = document.createDocumentFragment();
          let $tr = document.createElement("tr");
          $tr.id = car.id;
          let $tdImage = document.createElement("td");
          let $image = document.createElement("img");
          let $tdBrand = document.createElement("td");
          let $tdYear = document.createElement("td");
          let $tdPlate = document.createElement("td");
          let $tdColor = document.createElement("td");
          let $tdButton = document.createElement("td");
          $tdButton = document.createElement("button");

          $image.src = car.image;
          $tdImage.appendChild($image);

          $tdBrand.textContent = car.brandModel;
          $tdYear.textContent = car.brandModel;
          $tdPlate.textContent = car.brandModel;
          $tdColor.textContent = car.brandModel;

          $tdButton.innerHTML = "Remover";
          $tdButton.addEventListener("click", app.removeRow, false);

          $tr.appendChild($tdImage);
          $tr.appendChild($tdBrand);
          $tr.appendChild($tdYear);
          $tr.appendChild($tdPlate);
          $tr.appendChild($tdColor);
          $tr.appendChild($tdButton);

          $fragment.appendChild($tr);
          $tableCar.appendChild($fragment);
          id_sequence = car.id;
        });
      },
      removeRow: function removeRow() {
        const ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3333/remove-car", true);
        ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        ajax.send(
          JSON.stringify({
            id: this.parentElement.id,
          })
        );
        console.log(this.parentElement.id);
        this.parentElement.remove();

        if ($tableCar.rows.length === 1) {
          $tableCar.setAttribute("style", "display: none");
          $formRegister.setAttribute(
            "style",
            "width: 100%; display: flex; justify-content: center;"
          );
        }
      },
      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },
    };
  })();
  app.init();
})(window.DOM);
