export async function fetchRecipe(id, params) {
    return fetch(
      `https://www.hellofresh.com/gw/api/recipes/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTcwMDE5OTUsImlhdCI6MTY1NDM3MjI1MiwiaXNzIjoic2VuZiIsImp0aSI6Ijk4MzgyZTkwLThiYTMtNDBiOS1hYzA2LTMwMjg5ZWJjMzNiZCJ9.hbdTzIjxWEKMsj5mJjpE1Xa-X58y1sfsGWAZp5JbNK0`,
        }
      }
    ).then((response) => response.json())
}