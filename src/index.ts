import { Octokit } from 'https://cdn.skypack.dev/@octokit/rest';

const repoContainer = document.getElementById('repositories') as HTMLDivElement;

const octokit = new Octokit();

async function getRepos() {
    const data = await octokit.repos.listForUser({
        username: 'ifouldm',
    });
    console.log(data);
    const cards = data.data.map((repo) => {
        const card = document.createElement('div');
        card.className = 'card';
        const repoName = document.createElement('h3');
        card.append(repoName);
        if (repo.language) {
            const language = document.createElement('a');
            language.textContent = `Language: ${repo.language}`;
            card.append(language);
        }
        repoName.textContent = repo.name;
        if (repo.has_pages) {
            const pagesLink = document.createElement('a');
            pagesLink.href = repo.html_url;
            pagesLink.textContent = 'Link to project';
            card.append(pagesLink);
        }
        if (repo.description) {
            const description = document.createElement('p');
            description.textContent = repo.description;
            card.append(description);
        }
        if (repo.created_at) {
            const created = document.createElement('time');
            created.textContent = repo.created_at;
            card.append(created);
        }
        return card;
    });
    repoContainer.append(...cards);
}

getRepos();
