import styles from './card.module.css';

export default function Card({recipe}) {
 const helloFreshImageURL = `https://img.hellofresh.com/hellofresh_s3`;


  return (
    <div className={styles.background + " max-w-sm rounded overflow-hidden shadow-lg mr-5"}>
        <div className="px-6 py-4">
            <img className="w-100 m-auto" src={helloFreshImageURL + recipe.imagePath} alt=""/>
        </div>
        <div className="px-6 py-4">
            <div className={styles.header + " font-bold text-xl mb-2 text-center"}>{recipe.name}</div>
            <p>{recipe.prepTime.replace("PT", "").replace("M", " Minutes")}</p>
            {getURLSlug() === 'recipes' &&
                    <form onSubmit={addToPlan}>
                        <input type="hidden" name="freshID" value={recipe.id} className="form-input rounded" />
                        <button className="btn-submit">Add to Plan</button>
                    </form>
            }

            {getURLSlug() === 'plan' &&
                <form onSubmit={removeFromPlan}>
                    <input type="hidden" name="freshID" value={recipe.id} className="form-input rounded" />
                    <button className="btn-danger">Remove from Plan</button>
                </form>
            }
        </div>
    </div>
  )
}

const addToPlan = async event => {
    event.preventDefault();
    const res = {recipeId: event.target.freshID.value, obj_id: event.target.obj_id.value};
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

// May need to be more logical later on, but for now this works
function getURLSlug() {
    if(typeof window !== 'undefined') {
        const pathArray = window.location.pathname.split('/');
        return pathArray[1];
    }
}

const removeFromPlan = async event => {
    event.preventDefault();
    const res = {id: event.target.freshID.value};
    //console.log(res.id)

    const deletedItem = await fetch('http://localhost:3000/api/plan/' + res.id, {
        method: 'delete'
    }).then(deletedItem => deletedItem.json()) ?? []
}
