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

  mostraAnteprima(calendario, legaSelezionata);
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
