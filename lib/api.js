import {server} from '../config'
import {AWS_ENDPOINT} from '../config' 

export async function fetchRecipe(id, params) {
    return fetch(
      `https://www.hellofresh.com/gw/api/recipes/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NEXT_PUBLIC_HELLO_TOKEN,
          Accept: 'application/json, text/plain, */*',
          'User-Agent': '*',
        }
      }
    ).then((response) => response.json())
}

export async function getRecipes() {
  const res = await fetch(`${AWS_ENDPOINT}/recipes`, {
    method: "get",
    headers: {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': '*',
    }
  })
  const data = await res.json();

  return data;
}

export async function getRecipe(id) {
  const res = await fetch(`${AWS_ENDPOINT}/recipes/${id}`, {
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      }
  })
  const data = await res.json();

  return data;
}

export async function getRecipeIds() {
  const res = await fetch(`${AWS_ENDPOINT}/plan`, {
    method: "get",
    headers: {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': '*',
    }
  })

  const data = await res.json();

  return data;
}

export async function getListItems() {
  const res = await fetch(`${AWS_ENDPOINT}/list`, {
        method: 'get',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': '*',
        }
  });

  const data = await res.json();

  return data;
}