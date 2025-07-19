const legheDisponibili = {
  inglese: "Lega Inglese",
  italiana: "Lega Italiana",
  spagnola: "Lega Spagnola",
  tedesca: "Lega Tedesca",
  francese: "Lega Francese",
  serieb: "Serie B"
};

// Popola i menu a tendina
window.onload = () => {
  const selectLega = document.getElementById("legaSelect");
  const selectStagione = document.getElementById("stagioneSelect");

  // Aggiungi leghe
  for (const [value, label] of Object.entries(legheDisponibili)) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    selectLega.appendChild(option);
  }

  // Aggiungi stagioni (1-5, puoi aumentare se vuoi)
  for (let i = 1; i <= 5; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `Stagione ${i}`;
    selectStagione.appendChild(option);
  }

  // Carica quando cambia qualcosa
  selectLega.addEventListener("change", caricaCalendario);
  selectStagione.addEventListener("change", caricaCalendario);
};

function caricaCalendario() {
  const lega = document.getElementById("legaSelect").value;
  const stagione = document.getElementById("stagioneSelect").value;

  if (!lega || !stagione) return;

  const file = `/calendari/lega-${lega}-stagione-${stagione}.json`;

  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("File non trovato");
      return response.json();
    })
    .then((data) => {
      mostraCalendario(data);
    })
    .catch((error) => {
      console.error("Errore nel caricamento calendario:", error);
      document.getElementById("calendarioOutput").innerHTML =
        "<p>⚠️ Calendario non disponibile</p>";
    });
}

function mostraCalendario(partite) {
  const container = document.getElementById("calendarioOutput");
  container.innerHTML = "";

  const giornate = {};

  partite.forEach((p) => {
    if (!giornate[p.giornata]) giornate[p.giornata] = [];
    giornate[p.giornata].push(p);
  });

  Object.keys(giornate)
    .sort((a, b) => a - b)
    .forEach((g) => {
      const blocco = document.createElement("div");
      blocco.className = "giornata-blocco";

      const titolo = document.createElement("h3");
      titolo.textContent = `Giornata ${g}`;
      blocco.appendChild(titolo);

      giornate[g].forEach((p) => {
        const par = document.createElement("p");
        par.textContent = `${p.casa} vs ${p.trasferta}${
          p.risultato ? " – Risultato: " + p.risultato : ""
        }`;
        blocco.appendChild(par);
      });

      container.appendChild(blocco);
    });
}
