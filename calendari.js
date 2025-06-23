async function caricaCalendario() {
  const response = await fetch('/content/data/calendari.json');
  const partite = await response.json();

  const container = document.getElementById('calendarioContainer');
  container.innerHTML = '';

  // Raggruppa partite per lega e giornata
  const partitePerLega = {};

  partite.forEach(partita => {
    const lega = partita.lega;
    if (!partitePerLega[lega]) {
      partitePerLega[lega] = {};
    }

    const giornata = partita.giornata;
    if (!partitePerLega[lega][giornata]) {
      partitePerLega[lega][giornata] = [];
    }

    partitePerLega[lega][giornata].push(partita);
  });

  // Mostra le partite
  for (const [lega, giornate] of Object.entries(partitePerLega)) {
    const legaDiv = document.createElement('div');
    legaDiv.classList.add('calendario', lega);
    legaDiv.innerHTML = `<h2>${lega}</h2>`;

    for (const [giornata, matches] of Object.entries(giornate)) {
      const giornataDiv = document.createElement('div');
      giornataDiv.innerHTML = `<h3>Giornata ${giornata}</h3>`;
      
      const table = document.createElement('table');
      table.classList.add('tabella-calendario');

      table.innerHTML = `
        <thead>
          <tr><th>Casa</th><th>Trasferta</th><th>Risultato</th><th>Data</th></tr>
        </thead>
        <tbody>
          ${matches.map(p => `
            <tr>
              <td>${p.casa}</td>
              <td>${p.trasferta}</td>
              <td>${p.risultato || '-'}</td>
              <td>${p.data || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      `;
      giornataDiv.appendChild(table);
      legaDiv.appendChild(giornataDiv);
    }

    container.appendChild(legaDiv);
  }
}

function filtraCalendario() {
  const selezione = document.getElementById("selezionaLega").value;
  const sezioni = document.querySelectorAll(".calendario");

  sezioni.forEach(sezione => {
    if (selezione === "tutte" || sezione.classList.contains(selezione)) {
      sezione.style.display = "block";
    } else {
      sezione.style.display = "none";
    }
  });
}

caricaCalendario();
