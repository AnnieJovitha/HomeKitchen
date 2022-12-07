import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Card from "../components/card/card"
import Header from "../components/header/header"
import { fetchRecipe } from "../lib/api"
import Link from "next/link"
import {getRecipeIds} from '../lib/api';
import {getRecipes} from '../lib/api';

export default function Home({recipesBulk, planRecipes}) {
  const helloFreshImageURL = "https://img.hellofresh.com/hellofresh_s3";
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Kitchen | Let&apos;s Get Cooking</title>
        <meta name="description" content="Recipe app built by Ben Parsell" />
        <link rel="icon" href="/icons/favicon.png" />
      </Head>
      <Header />

      <main className={styles.main}>
        <div className="flex flex-row justify-center">
          <h1 className={styles.title}>
            Hi Ben, let&apos;s get cooking.
          </h1>
        </div>
        
        <div className={styles.quickAccess}>
          <h2 className="text-3xl">Quick Access</h2>
          <div className="flex flex-row">
            <Link href="/list"><a className="btn-submit" href="#">Shopping List</a></Link>
            <Link href="/recipes"><a className="btn-submit" href="#">Recipe List</a></Link>
            <Link href="/recipes/new"><a className="btn-submit" href="#">New Recipe</a></Link>
            <Link href="/plan"><a className="btn-submit" href="#">Current Meal Plan</a></Link>
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <h2 className="text-3xl mb-3">Current Meals</h2>
          <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
            { planRecipes && planRecipes.map((item) => {
              return (
                <a key={item.id} href={"/recipes/" + item.id}><Card recipe={item} action="Remove"></Card></a>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-3xl mb-3">Recipes</h2>
          <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
            { recipesBulk && recipesBulk?.map(
              (item, index) => {
                if(index < 4) {
                  return ( <a key={item.id} href={"/recipes/" + item.id}><Card recipe={item} action="Add"></Card></a> )
                } else {
                  return;
                }
              })}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  let recipesBulk = await getRecipes();
  recipesBulk = JSON.parse(recipesBulk.body);
  let recipeIds = await getRecipeIds();
  recipeIds = JSON.parse(recipeIds.body)
  let planRecipes = [];
  recipesBulk?.map((r) => {
    recipeIds?.map((id) => {
      if(r.id == id.recipeId) {
        planRecipes.push(r)
      }
    })
  })
  
  return {
    props: { 
      recipesBulk,
      planRecipes
    },
    
  }
  
}
