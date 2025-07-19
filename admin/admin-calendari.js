document.getElementById("generaCalendarioAdmin").addEventListener("click", function () {
  const legaSelezionata = document.getElementById("legaAdmin").value;

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

  // Andata: giornate 1-7
  for (let giornata = 1; giornata <= 7; giornata++) {
    const mescolate = [...squadre].sort(() => Math.random() - 0.5);
    for (let i = 0; i < mescolate.length; i += 2) {
      calendario.push({
        giornata: giornata,
        lega: legaSelezionata,
        casa: mescolate[i],
        trasferta: mescolate[i + 1],
        risultato: "",
        data: ""
      });
    }
  }

  // Ritorno: giornate 8-14 (inverti casa e trasferta)
  for (let giornata = 8; giornata <= 14; giornata++) {
    const mescolate = [...squadre].sort(() => Math.random() - 0.5);
    for (let i = 0; i < mescolate.length; i += 2) {
      calendario.push({
        giornata: giornata,
        lega: legaSelezionata,
        casa: mescolate[i + 1],
        trasferta: mescolate[i],
        risultato: "",
        data: ""
      });
    }
  }

  mostraAnteprima(calendario);
  salvaCalendario(calendario);
});

function mostraAnteprima(partite) {
  const container = document.getElementById("anteprimaCalendario");
  container.innerHTML = "";

  const giornate = {};

  partite.forEach(p => {
    if (!giornate[p.giornata]) giornate[p.giornata] = [];
    giornate[p.giornata].push(p);
  });

  Object.keys(giornate).sort((a, b) => a - b).forEach(g => {
    const blocco = document.createElement("div");
    blocco.className = "giornata-blocco";
    const titolo = document.createElement("h3");
    titolo.textContent = `Giornata ${g}`;
    blocco.appendChild(titolo);

    giornate[g].forEach(p => {
      const par = document.createElement("p");
      par.textContent = `${p.casa} vs ${p.trasferta}`;
      blocco.appendChild(par);
    });

    container.appendChild(blocco);
  });
}

function salvaCalendario(partite) {
  const key = "numeroStagione";
  let stagioneNumero = parseInt(localStorage.getItem(key) || "0", 10) + 1;
  localStorage.setItem(key, stagioneNumero);

  const fileName = `lega-${legaSelezionata.toLowerCase().replace(/\s+/g, "-")}-stagione-${stagioneNumero}.json`;
  const fileContent = JSON.stringify(partite, null, 2);

  fetch('/.netlify/functions/saveCalendario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, content: fileContent })
  })
    .then(response => {
      if (!response.ok) throw new Error("Errore nel salvataggio su GitHub");
      return response.json();
    })
    .then(data => {
      alert(`✅ Calendario salvato come ${fileName}`);
    })
    .catch(error => {
      console.error("Errore:", error);
      alert("❌ Errore durante il salvataggio del calendario.");
    });
}
