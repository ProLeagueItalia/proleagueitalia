async function caricaCalendario() {
  const response = await fetch("/content/data/calendari.json");
  const partite = await response.json();

  const container = document.getElementById("calendarioContainer");
  container.innerHTML = '';

  const partitePerLega = {};

  // Raggruppa per lega e giornata
  partite.forEach(partita => {
    const lega = partita.lega.toLowerCase();
    const giornata = partita.giornata;

    if (!partitePerLega[lega]) partitePerLega[lega] = {};
    if (!partitePerLega[lega][giornata]) partitePerLega[lega][giornata] = [];

    partitePerLega[lega][giornata].push(partita);
  });

  const selezione = document.getElementById("filtrolega").value;
  for (const lega in partitePerLega) {
    if (selezione !== "tutte" && selezione !== lega) continue;

    const titolo = document.createElement("h2");
    titolo.textContent = `Calendario - Lega ${lega.charAt(0).toUpperCase() + lega.slice(1)}`;
    container.appendChild(titolo);

    for (let giornata = 1; giornata <= 14; giornata++) {
      const blocco = document.createElement("div");
      blocco.className = "giornata-blocco";

      const intestazione = document.createElement("h3");
      intestazione.textContent = `Giornata ${giornata}`;
      blocco.appendChild(intestazione);

      const partite = partitePerLega[lega][giornata] || [];
      partite.forEach(p => {
        const pTag = document.createElement("p");
        pTag.innerHTML = `<strong>${p.casa}</strong> vs <strong>${p.trasferta}</strong> – ${p.risultato || "—"} <br> <em>${p.data || ""}</em>`;
        blocco.appendChild(pTag);
      });

      container.appendChild(blocco);
    }
  }
}

function filtraCalendario() {
  caricaCalendario();
}

document.addEventListener("DOMContentLoaded", caricaCalendario);
document.getElementById("generaCalendario").addEventListener("click", function () {
  const legaSelezionata = document.getElementById("selezionalega").value;
  if (legaSelezionata === "tutte") {
    alert("Seleziona prima una lega specifica per generare il calendario.");
    return;
  }

  const squadrePerLega = {
    inglese: ["Liverpool", "Arsenal", "Manchester City", "Chelsea", "Newcastle", "Tottenham", "Manchester United", "Bournemouth"],
    italiana: ["Napoli", "Juventus", "Roma", "Fiorentina", "Bologna", "Como", "Torino", "Udinese"],
    spagnola: ["Barcellona", "Real Madrid", "Atl. Madrid", "Sporting Lisbona", "Villareal", "Porto", "Valencia", "Benfica"],
    tedesca: ["Bayern Monaco", "Bayer Leverkusen", "Francoforte", "B. Dortmund", "Friburgo", "PSV", "Ajax", "Feyenoord"],
    francese: ["PSG", "Marsiglia", "Monaco", "Nizza", "Lilla", "Lione", "Club Brugge", "Lens"],
    serieb: ["BSC Young Boys", "FC Basilea", "Red Bull Salzburg", "Fenerbahce", "Frosinone", "Galatasaray", "Palermo", "Paris FC"]
  };

  const squadre = squadrePerLega[legaSelezionata];
  const calendario = [];

  for (let giornata = 1; giornata <= 14; giornata++) {
    const partite = [];
    const mescolate = [...squadre].sort(() => Math.random() - 0.5);
    for (let i = 0; i < mescolate.length; i += 2) {
      const casa = mescolate[i];
      const trasferta = mescolate[i + 1];
      partite.push({ casa, trasferta });
    }
    calendario.push({ giornata, partite });
  }

  mostraCalendario(calendario, legaSelezionata);
});

function mostraCalendario(calendario, lega) {
  const container = document.getElementById("contenitoreCalendari");
  container.innerHTML = ""; // pulisce

  calendario.forEach(giornata => {
    const blocco = document.createElement("div");
    blocco.className = "giornata-blocco";

    const titolo = document.createElement("h3");
    titolo.textContent = `Giornata ${giornata.giornata} - ${lega.charAt(0).toUpperCase() + lega.slice(1)}`;
    blocco.appendChild(titolo);

    giornata.partite.forEach(match => {
      const par = document.createElement("p");
      par.textContent = `${match.casa} vs ${match.trasferta}`;
      blocco.appendChild(par);
    });

    container.appendChild(blocco);
  });
}
