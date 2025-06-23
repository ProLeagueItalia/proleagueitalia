document.addEventListener("DOMContentLoaded", () => {
  const contenitore = document.getElementById("contenitoreCalendari");

  fetch("content/calendari.json")
    .then(response => response.json())
    .then(dati => {
      contenitore.innerHTML = "";

      dati.forEach(partita => {
        const blocco = document.createElement("div");
        blocco.className = `calendario-blocco ${partita.lega.toLowerCase()}`;
        blocco.setAttribute("data-lega", partita.lega.toLowerCase());

        blocco.innerHTML = `
          <h3>Giornata ${partita.giornata} - ${partita.lega}</h3>
          <p><strong>${partita.casa}</strong> vs <strong>${partita.trasferta}</strong></p>
          <p>Risultato: ${partita.risultato || "-"}</p>
          <p>Data: ${partita.data || "Da definire"}</p>
        `;

        contenitore.appendChild(blocco);
      });
    })
    .catch(error => {
      contenitore.innerHTML = "<p>Errore nel caricamento del calendario.</p>";
      console.error(error);
    });
});

function filtraCalendario() {
  const selezione = document.getElementById("filtroLega").value;
  const blocchi = document.querySelectorAll(".calendario-blocco");

  blocchi.forEach(blocco => {
    if (selezione === "tutte" || blocco.dataset.lega === selezione) {
      blocco.style.display = "block";
    } else {
      blocco.style.display = "none";
    }
  });
}
