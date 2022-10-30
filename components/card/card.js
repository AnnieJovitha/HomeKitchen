import styles from './card.module.css';
import AddButton from './AddButton/AddButton';
import RemoveButton from './RemoveButton/RemoveButton';

export default function Card({recipe, action}) {
 const helloFreshImageURL = `https://img.hellofresh.com/hellofresh_s3`;


  return (
    <div className={styles.background + " max-w-sm rounded overflow-hidden shadow-lg"}>
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