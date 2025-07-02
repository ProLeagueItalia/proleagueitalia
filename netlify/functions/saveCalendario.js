const { Octokit } = require("@octokit/rest");

exports.handler = async (event) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = "ProLeagueitalia";
  const REPO_NAME = "proleagueitalia";
  const BRANCH = "main";
  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    const { fileName, content } = JSON.parse(event.body);
    const path = `calendari/${fileName}`;

    // Recupera l'hash (SHA) del file se esiste
    let sha;
    try {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path,
      });
      sha = data.sha;
    } catch (e) {
      sha = undefined; // il file non esiste ancora
    }

    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message: `Calendario aggiornato: ${fileName}`,
      content: Buffer.from(content).toString("base64"),
      sha,
      branch: BRANCH,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Salvato con successo" }),
    };
  } catch (error) {
    console.error("Errore salvataggio calendario:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

