import axios from "axios";

export async function fetchRepos() {
  const url = "https://api.github.com/orgs/kuosc2005/repos";

  const res = await axios.get(url);
  return res.data.map((repo: any) => ({
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
  }));
}
