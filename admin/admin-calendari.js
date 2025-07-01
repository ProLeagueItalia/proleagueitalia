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

  // Giornate di andata
  const accoppiamenti = [];
  for (let i = 0; i < squadre.length; i++) {
    for (let j = i + 1; j < squadre.length; j++) {
      accoppiamenti.push({ casa: squadre[i], trasferta: squadre[j] });
    }
  }

  const giornateAndata = accoppiamenti
    .sort(() => Math.random() - 0.5)
    .slice(0, 28); // 7 giornate * 4 match = 28 partite

  for (let i = 0; i < 7; i++) {
    const partite = giornateAndata.slice(i * 4, i * 4 + 4);
    calendario.push({ giornata: i + 1, partite });
  }

  // Giornate di ritorno (invertite)
  const giornateRitorno = giornateAndata.map(p => ({ casa: p.trasferta, trasferta: p.casa }))
    .sort(() => Math.random() - 0.5);

  for (let i = 0; i < 7; i++) {
    const partite = giornateRitorno.slice(i * 4, i * 4 + 4);
    calendario.push({ giornata: i + 8, partite });
  }

  mostraAnteprima(calendario, legaSelezionata);
  salvaCalendarioNelCMS(calendario, legaSelezionata);
});


function mostraAnteprima(calendario, lega) {
  const container = document.getElementById("anteprimaCalendario");
  container.innerHTML = "";

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


function salvaCalendarioNelCMS(calendario, lega) {
  const partite = [];

  calendario.forEach(giornata => {
    giornata.partite.forEach(partita => {
      partite.push({
        giornata: giornata.giornata,
        casa: partita.casa,
        trasferta: partita.trasferta,
        risultato: "",
        data: ""
      });
    });
  });

  const payload = {
    data: {
      titolo: `Calendario ${lega.charAt(0).toUpperCase() + lega.slice(1)}`,
      lega: lega,
      partite: partite
    }
  };

  fetch("/admin/api/entries/calendari", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then(res => {
    if (res.ok) {
      alert("✅ Calendario salvato nel CMS con successo!");
    } else {
      alert("❌ Errore nel salvataggio del calendario.");
    }
  });
}
