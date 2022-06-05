export async function fetchRecipe(id, params) {
    return fetch(
      `https://www.hellofresh.com/gw/api/recipes/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NEXT_PUBLIC_HELLO_TOKEN,
        }
      }
    ).then((response) => response.json())
}