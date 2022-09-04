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

export async function getRecipes() {
  const res = await fetch("http://localhost:3000/api/recipes", {
    method: "get",
  })
  const data = await res.json();

  return data;
}

export async function getRecipeIds() {
  const res = await fetch("http://localhost:3000/api/plan", {
    method: "get",
  })

  const data = await res.json();

  return data;
}