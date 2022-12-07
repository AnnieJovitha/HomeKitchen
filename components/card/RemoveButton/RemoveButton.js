import { AWS_ENDPOINT } from '../../../config';
import styles from './RemoveButton.module.css';

export default function RemoveButton({recipe}) {
  return (
    <form onSubmit={removeFromPlan}>
        <input type="hidden" name="freshID" value={recipe.id} className="form-input rounded" />
        <button className={styles.btnDanger}>Remove from Plan</button>
    </form>
  )
}

const removeFromPlan = async event => {
    event.preventDefault();
    const res = {id: event.target.freshID.value};

    await fetch(`${AWS_ENDPOINT}/plan/` + res.id, {
        method: 'delete'
    }).then(deletedItem => deletedItem.json()) ?? []
}