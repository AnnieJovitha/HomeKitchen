import Head from 'next/head'
import Image from 'next/image'
import Card from '../../components/card/card'
import Header from '../../components/header/header'
import { getRecipe, getRecipes } from '../../lib/api'
import styles from '../../styles/Recipe-Details.module.css'
import {server} from '../../config'

export default function Details({recipe}) {

  const helloFreshImageURL = `https://img.hellofresh.com/hellofresh_s3`;
  recipe = recipe?.data;
  const units = recipe?.yields[0]?.ingredients;
  return (
    <div className={styles.container}>
      <Head>
        <title>All Recipes | Benny Fresh</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className={styles.main}>
        <div className="flex flex-col text-center mb-6">
          <img className={styles.headerImage} src={helloFreshImageURL + recipe?.imagePath} />
          <h1 className="text-2xl">
            {recipe?.name}
          </h1>
        </div>
        <h2 className="text-xl">Ingredients</h2>
        <div className="flex flex-col mb-6">
            <div className={"flex flex-wrap flex-row " + styles.ingredientsContainer}>
                {recipe && recipe.ingredients?.map((i, index) => {
                    return (
                      <div key={i.id} className={styles.ingredient}>
                        <div className={styles.ingredientPhoto}>
                          <img src={helloFreshImageURL + i.imagePath} />
                        </div>
                        <div className="">
                          <p>{units[index].amount} {units[index].unit}(s)</p>
                          <p>{i.name}</p>
                        </div>
                      </div>
                    )
                })}
            </div>
            <div className={"flex flex-wrap flex-row " + styles.nutritionContainer}>
                {recipe && recipe.nutrition?.map((i) => {
                  return (
                    <div key={i.type} className={styles.nutrient}>
                        <span><strong>{i.name} </strong></span>
                        <span>{i.amount} {i.unit}</span>
                    </div>
                  )
                })}
            </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl">Directions</h2>
          <ol type="1">
            {recipe && recipe.steps?.map((i, index) => {
                return (
                  <div key={i.index} className={styles.instruction + " flex flex-wrap flex-row"}>
                    <div className={styles.instructionImage}>
                      <img src={helloFreshImageURL + i.images[0]?.path} />
                    </div>
                    <div className={styles.instructionText}>
                      <p>{i.instructions}</p>
                    </div>
                  </div>
                )
            })}
          </ol>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps({params}) {
  const recipe = await getRecipe(params.id);

  return {
    props: { 
      recipe,
      
    },
    
  }
}

export async function getStaticPaths() {
  const allRecipes = await getRecipes();
  try {
    return {
      paths: allRecipes["data"].map((r) => {return (`/recipes/${r.id}`)}) ?? [],
      fallback: true,
    }
  }
  catch (e) {
    error = e.toString();
  }
  return {
    paths: [],
    error,
  }
}
