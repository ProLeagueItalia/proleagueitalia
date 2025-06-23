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
