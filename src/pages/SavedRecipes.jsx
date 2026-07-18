import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageShell } from "../components"
import { getMenuItemById } from "../data/menuData"
import { getSavedRecipeIds, removeSavedRecipeId } from "../utils/savedRecipes"

const SavedRecipes = () => {
  const navigate = useNavigate()
  const [savedIds, setSavedIds] = useState(() => getSavedRecipeIds())

  const savedItems = useMemo(
    () => savedIds.map((id) => getMenuItemById(id)).filter(Boolean),
    [savedIds]
  )

  const handleRemove = (id) => {
    removeSavedRecipeId(id)
    setSavedIds(getSavedRecipeIds())
  }

  return (
    <PageShell>
      <div className="w-full max-w-7xl space-y-8 px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Saved Recipes</h1>
            <p className="mt-2 text-sm text-slate-400">{savedItems.length} recipe{savedItems.length === 1 ? "" : "s"} saved</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-white transition hover:border-orange-400"
          >
            Back to Menu
          </button>
        </div>

        {savedItems.length === 0 ? (
          <div className="p-14 text-center">
            <p className="text-lg font-semibold text-white">No saved recipes yet.</p>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-orange-500 text-lg font-medium"
            >
              Browse the menu
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-[28px] border border-white/10 bg-slate-950/90 shadow-[0_20px_60px_rgba(15,23,42,0.35)] transition hover:-translate-y-1"
              >
                <button
                  type="button"
                  onClick={() => navigate(`/menu/${item.id}`)}
                  className="block text-left"
                >
                  <div className="relative overflow-hidden rounded-t-[28px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-48 w-full object-cover"
                    />
                    <span
                      className={`absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-xs font-semibold ${item.isVeg ? "bg-emerald-500/90 text-emerald-100" : "bg-rose-500/90 text-rose-100"}`}
                    >
                      {item.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </div>
                  <div className="space-y-4 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-orange-300/80">{item.category}</p>
                    <h2 className="text-2xl font-semibold text-white">{item.name}</h2>
                    <p className="text-sm text-slate-400">{item.description}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.servings}</p>
                  </div>
                </button>
                <div className="border-t border-white/10 px-5 py-4">
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="w-full rounded-3xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/15"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  )
}

export default SavedRecipes
