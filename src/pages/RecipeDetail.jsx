import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PageShell, PrimaryButton } from "../components"
import { getMenuItemById } from "../data/menuData"
import { addSavedRecipeId, removeSavedRecipeId, getSavedRecipeIds } from "../utils/savedRecipes"

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = useMemo(() => getMenuItemById(id), [id])
  const [savedIds, setSavedIds] = useState(() => getSavedRecipeIds())

  if (!recipe) {
    return (
      <PageShell>
        <div className="w-full max-w-4xl space-y-6 px-4">
          <div className="rounded-[30px] border border-white/10 bg-slate-950/85 p-10 text-center">
            <p className="text-xl font-semibold text-white">Recipe not found</p>
            <p className="mt-3 text-sm text-slate-400">The recipe you are looking for does not exist.</p>
            <div className="mt-6 flex justify-center">
              <PrimaryButton type="button" onClick={() => navigate("/")}>Back to Menu</PrimaryButton>
            </div>
          </div>
        </div>
      </PageShell>
    )
  }

  const isSaved = savedIds.includes(String(recipe.id))

  const handleToggleSave = () => {
    if (isSaved) {
      removeSavedRecipeId(recipe.id)
    } else {
      addSavedRecipeId(recipe.id)
    }
    setSavedIds(getSavedRecipeIds())
  }

  return (
    <PageShell>
      <div className="w-full max-w-6xl space-y-8 px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-white transition hover:border-orange-400"
            >
              ← Back to Menu
            </button>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/saved-recipes")}
              className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-white transition hover:border-orange-400"
            >
              Saved Recipes
            </button>
            <PrimaryButton type="button" onClick={handleToggleSave} className="w-auto px-6">
              {isSaved ? "Saved" : "Save Recipe"}
            </PrimaryButton>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-slate-950/85 p-7 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="overflow-hidden rounded-[28px] bg-slate-950/90 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
              <img src={recipe.image} alt={recipe.name} className="h-full w-full object-cover" />
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300">{recipe.category}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${recipe.isVeg ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
                  {recipe.isVeg ? "Veg" : "Non-Veg"}
                </span>
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold text-white">{recipe.name}</h1>
                <p className="text-sm text-slate-400">{recipe.fullDescription}</p>
                <p className="text-sm text-slate-300">{recipe.servings}</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                <h2 className="text-xl font-semibold text-white">Ingredients</h2>
                <div className="mt-5 space-y-3">
                  {recipe.ingredients.map((ingredient) => (
                    <div key={ingredient.name} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
                      <span>{ingredient.name}</span>
                      <span className="text-slate-400">{ingredient.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default RecipeDetail
