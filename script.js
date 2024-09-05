const table = document.querySelector("#table");
const um = document.querySelector("#um");
const dois = document.querySelector("#dois");
const tres = document.querySelector("#tres");
let carros = [];

let pagina = 1;

renderizarTabela();

um.addEventListener("click", (e) => {
  e.preventDefault();
  pagina = 1;
  renderizarTabela();
});
dois.addEventListener("click", (e) => {
  e.preventDefault();
  pagina = 2;
  renderizarTabela();
});
tres.addEventListener("click", (e) => {
  e.preventDefault();
  pagina = 3;
  renderizarTabela();
});

async function fetchData(pagina) {
  const url = `http://localhost:3000/carros?_page=${pagina}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Status da resposta: ${response.status}`);
    }
    const json = await response.json();
    carros = json.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function renderizarTabela() {
  await fetchData(pagina);
  table.innerHTML = `<table>
        <thead>
            <tr>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Ano</th>
                <th scope="col">Cor</th>
                <th scope="col">Placa</th>
            </tr>
        </thead>
        <tbody>
            ${carros
              .map(
                (carro) => `
                <tr>
                    <th scope="row">${carro.marca}</th>
                    <td scope="row">${carro.modelo}</td>
                    <td scope="row">${carro.ano}</td>
                    <td scope="row">${carro.cor}</td>
                    <td scope="row">${carro.placa}</td>
                </tr>
            `
              )
              .join("")}
        </tbody>
    </table>
    `;
}
