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

  // Colori personalizzati per squadra
  const colori = {
    liverpool: "#d00027",
    arsenal: "#ef0107",
    "manchester-city": "#6cabdd",
    chelsea: "#034694",
    newcastle: "#241f20",
    tottenham: "#132257",
    "manchester-united": "#da291c",
    bournemouth: "#c8102e",
    
    napoli: "#0074b7",
    juventus: "#111",
    roma: "#831c1c",
    fiorentina: "#58229d",
    bologna: "#bd2031",
    torino: "#781f1f",
    como: "#0e519e",
    udinese: "#bcbcbc",

    barcellona: "#a50044",
    "real-madrid": "#febd11",
    "atl-madrid": "#d20a11",
    "sporting-lisbona": "#007f4e",
    villareal: "#fff200",
    porto: "#1a2b66",
    valencia: "#ffa500",
    benfica: "#d00000",

    "bayern-monaco": "#dc052d",
    "bayer-leverkusen": "#e3000f",
    francoforte: "#000000",
    "b-dortmund": "#fce100",
    friburgo: "#c8102e",
    psv: "#e30613",
    ajax: "#d00c33",
    feyenoord: "#f31830",

    psg: "#004170",
    marsiglia: "#00a5df",
    monaco: "#e4002b",
    nizza: "#ff0000",
    lilla: "#e30613",
    lione: "#001e61",
    "club-brugge": "#0c2e5c",
    lens: "#ffd800",

    "bsc-young-boys": "#fce600",
    "fc-basilea": "#c5003e",
    "fc-red-bull-salzburg": "#ee1c25",
    fenerbahce: "#ffc20e",
    "frosinone-calcio": "#2945a0",
    galatasaray: "#a32638",
    palermo: "#f2a0c1",
    "paris-fc": "#001c44"
  };

  const colore = colori[squadra] || "#001f3f"; // default blu scuro
document.querySelector("header").style.backgroundColor = colore;
}
