import styles from './AddButton.module.css';

export default function AddButton({recipe}) {
  return (
    <form onSubmit={addToPlan}>
        <input type="hidden" name="freshID" value={recipe.id} className="form-input rounded" />
        <button className="btn-submit">Add to Plan</button>
    </form>
  )
}

const addToPlan = async event => {
    event.preventDefault();
    const res = {recipeId: event.target.freshID.value, obj_id: event.target.freshID.value};
    const response = await fetch('http://localhost:3000/api/plan', {
        method: 'post',
        body: JSON.stringify(res)
    })

    const recipe = await fetch('http://localhost:3000/api/recipes/' + res.recipeId, {
        method: 'get',
    }).then(recipe => recipe.json()) ?? []

    recipe.data.ingredients.map((i, index) => {
        i.amount = recipe.data.yields[0].ingredients[index].amount + " " + recipe.data.yields[0].ingredients[index].unit
    });
    if(response.status == "200") {
        const r = await fetch('http://localhost:3000/api/list', {
            method: 'post',
            body: JSON.stringify(recipe.data.ingredients)
        })
    }
}