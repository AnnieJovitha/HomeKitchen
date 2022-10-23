import {server} from '../config'

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
  const res = await fetch(`${server}/api/recipes`, {
    method: "get",
  })
  const data = await res.json();

  return data;
}

export async function getRecipe(id) {
  const res = await fetch(`${server}/api/recipes/${id}`, {
      method: 'get',
  })
  const data = await res.json();

  return data;
}

export async function getRecipeIds() {
  const res = await fetch(`${server}/api/plan`, {
    method: "get",
  })

  const data = await res.json();

  return data;
}

export async function getListItems() {
  const res = await fetch(`${server}/api/list`, {
        method: 'get',
  });

  const data = await res.json();

  return data;
}