export async function fetchRecipe(id, params) {
    return fetch(
      `https://www.hellofresh.com/gw/api/recipes/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTM5NzU1NDIsImlhdCI6MTY1MTM0NTc5OSwiaXNzIjoic2VuZiIsImp0aSI6IjZiYjJhZTAzLTExNmYtNDdmMC04YTlhLTVkNGI0MjJjZmM3MyJ9.iS1W1wInYFY9zQV1qYdnJXz-BEmoRW-sxy5BgxyXiTI`,
        }
      }
    ).then((response) => response.json())
}