import { AWS_ENDPOINT } from '../../../config';
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
    await fetch(`${AWS_ENDPOINT}/plan`, {
        method: 'post',
        body: JSON.stringify(res)
    })

    await fetch(`${AWS_ENDPOINT}/recipes/${res.recipeId}`, {
        method: 'get',
    }).then(response => response.json()).then((recipe) => {
        recipe[0].ingredients.map((i, index) => {
            i.amount = recipe[0].yields[0].ingredients[index].amount + " " + recipe[0].yields[0].ingredients[index].unit
        });

        const body = recipe[0].ingredients;

        fetch(`${AWS_ENDPOINT}/list`, {
            method: 'post',
            body: JSON.stringify(body)
        })
    })
}