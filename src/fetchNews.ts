import axios from "axios";

export async function fetchNews() {
  const topStories = await axios.get(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );

  const top5 = topStories.data.slice(0, 5);

  const stories = await Promise.all(
    top5.map(async (id: number) => {
      const story = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return {
        title: story.data.title,
        url: story.data.url,
      };
    })
  );

  return stories;
}
