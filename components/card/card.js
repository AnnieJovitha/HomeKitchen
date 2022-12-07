import styles from './card.module.css';
import AddButton from './AddButton/AddButton';
import RemoveButton from './RemoveButton/RemoveButton';

export default function Card({recipe, action, onSelected}) {
 const helloFreshImageURL = `https://img.hellofresh.com/hellofresh_s3`;


  return (
    <div className={styles.background + " max-w-sm rounded overflow-hidden shadow-lg"}>
        <input id="vue-checkbox" onClick={onSelected} type="checkbox" value="" class={styles.checkBox +  " mt-6 ml-6 mb-6 w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"}/>
        <img classNameName="w-full" src={helloFreshImageURL + recipe.imagePath} alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{recipe.name}</div>
            <p className="text-white text-base">
                {recipe.prepTime.replace("PT", "").replace("M", " Minutes")}
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            {action=="Add" && <AddButton recipe={recipe}></AddButton>}

            {action=="Remove" && <RemoveButton recipe={recipe}></RemoveButton>}
        </div>
    </div>
  )
}

// May need to be more logical later on, but for now this works
function getURLSlug() {
    if(typeof window !== 'undefined') {
        const pathArray = window.location.pathname.split('/');
        return pathArray[1];
    }
}