const { Octokit } = require("@octokit/core");

exports.handler = async function(event) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = new Octokit({ auth: token });

    const repoOwner = "ProLeagueItalia";
    const repoName = "proleagueitalia";
    const branch = "main";

    const data = JSON.parse(event.body);
    const stagione = data.stagione || "1";
    const contenutoCalendario = JSON.stringify(data.calendario, null, 2);

    const fileName = `calendari/calendario_Stagione_${stagione}.json`;

    // Prendi lo SHA attuale del file se esiste (serve per aggiornare)
    let sha;
    try {
      const { data: existing } = await octokit.request(
        `GET /repos/${repoOwner}/${repoName}/contents/${fileName}`,
        { ref: branch }
      );
      sha = existing.sha;
    } catch (e) {
      sha = undefined; // file non esiste, verrà creato
    }

    await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: repoOwner,
      repo: repoName,
      path: fileName,
      message: `Salvataggio calendario stagione ${stagione}`,
      content: Buffer.from(contenutoCalendario).toString("base64"),
      branch: branch,
      sha: sha,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Calendario salvato su GitHub con successo." }),
    };
  } catch (error) {
    console.error("Errore nel salvataggio calendario:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Errore durante il salvataggio del calendario." }),
    };
  }
};
