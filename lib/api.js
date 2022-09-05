export async function fetchRecipe(id, params) {
  if(global.window){
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
  return;
}

export async function getRecipes() {
  if(global.window){
    const res = await fetch("http://localhost:3000/api/recipes", {
      method: "get",
    })
    const data = await res.json();
  
    return data;
  }
  return;
}

export async function getRecipe(id) {
  if(global.window){
    const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
        method: 'get',
    })
    const data = await res.json();

    return data;
  }
  return;
}

export async function getRecipeIds() {
  if(global.window){
    const res = await fetch("http://localhost:3000/api/plan", {
      method: "get",
    })

    const data = await res.json();

    return data;
  }
  return;
}

export async function getListItems() {
  if(global.window){
    const res = await fetch('http://localhost:3000/api/list', {
          method: 'get',
    });

    const data = await res.json();

    return data;
  }
  return;
}