document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const squadra = params.get("squadra");

  if (!squadra) return;

  document.getElementById("nomeSquadra").textContent = `Rosa ${squadra.replace(/-/g, " ").toUpperCase()}`;

  fetch(`content/squadre/${squadra}.json`)
    .then(response => {
      if (!response.ok) throw new Error("File non trovato");
      return response.json();
    })
    .then(data => {
      const tbody = document.getElementById("tabellaRosa");
      tbody.innerHTML = "";

      if (!data.length) {
        for (let i = 0; i < 23; i++) {
          const row = document.createElement("tr");
          for (let j = 0; j < 8; j++) {
            const cell = document.createElement("td");
            cell.textContent = "";
            row.appendChild(cell);
          }
          tbody.appendChild(row);
        }
        return;
      }

      data.forEach(giocatore => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${giocatore.id || ""}</td>
          <td>${giocatore.nome || ""}</td>
          <td>${giocatore.ruolo || ""}</td>
          <td>${giocatore.vg || ""}</td>
          <td>${giocatore.potenziale || ""}</td>
          <td>${giocatore.ingaggio || ""}</td>
          <td>${giocatore.valore || ""}</td>
          <td>${giocatore.contratto || ""}</td>
        `;
        tbody.appendChild(row);
      });
const params = new URLSearchParams(window.location.search);
const squadra = params.get("squadra");

if (squadra) {
  const nome = squadra.toUpperCase();
  document.getElementById("nomeSquadra").textContent = "Rosa " + nome;
  document.getElementById("logoSquadra").src = `images/squadre/${squadra}.png`;

  const colori = {
    napoli: "#0074b7",
    juventus: "#111",
    roma: "#831d1c",
    fiorentina: "#58229d",
    bologna: "#bd2031",
    torino: "#781f1f",
    como: "#0e519e",
    udinese: "#bcbcbc",
    // aggiungi altre squadre
  };

  const colore = colori[squadra] || "#001f3f";
  document.querySelector("header").style.backgroundColor = colore;
}
