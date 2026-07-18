import { useMemo, useState } from "react"
import { getCurrentUser } from "../api"
import { filterMenuItems } from "../data/menuData"
import { PageShell, PrimaryButton } from "../components"
import { useNavigate } from "react-router-dom"
import { removeAuthData } from "../api"

const categories = [
  { id: "all", label: "All" },
  { id: "starter", label: "Starter" },
  { id: "main", label: "Main" },
  { id: "sides", label: "Sides" },
  { id: "desert", label: "Desert" },
]

const diets = [
  { id: "all", label: "All" },
  { id: "veg", label: "Veg" },
  { id: "nonveg", label: "Non-Veg" },
]

const MainMenu = () => {
  const [category, setCategory] = useState("all")
  const [diet, setDiet] = useState("all")
  const [search, setSearch] = useState("")

  const user = getCurrentUser()
  const navigate = useNavigate()

  const onLogout = () => {
    removeAuthData()
    navigate("/signin")
  }

  const onViewSavedRecipes = () => navigate("/saved-recipes")

  const filteredItems = useMemo(
    () => filterMenuItems({ category, name: search, diet }),
    [category, diet, search]
  )

  return (
    <PageShell>
      <div className="w-full max-w-7xl space-y-10 px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Party Menu</h1>
            <p className="mt-2 text-sm text-slate-400">
              Welcome, {user?.name ?? "Admin User"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onViewSavedRecipes}
              className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-white transition hover:border-orange-400"
            >
              Saved Recipes
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-white transition hover:border-orange-400"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-slate-950/85 p-7 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
          <div className="">
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-orange-300/80">Category</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id)}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${category === item.id
                        ? "bg-orange-500 text-slate-950 shadow-[0_10px_35px_rgba(249,115,22,0.2)]"
                        : "border border-white/10 bg-slate-950/90 text-slate-300 hover:border-orange-400 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-orange-300/80">Diet</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {diets.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDiet(item.id)}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${diet === item.id
                        ? "bg-orange-500 text-slate-950 shadow-[0_10px_35px_rgba(249,115,22,0.2)]"
                        : "border border-white/10 bg-slate-950/90 text-slate-300 hover:border-orange-400 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        {item.id === "veg" ? "🥬" : item.id === "nonveg" ? "🍖" : null}
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-slate-400">Search menu</label>
                <div className="mt-3 flex gap-3">
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name or ingredient"
                    className="w-full rounded-3xl border border-white/10 bg-slate-900 px-5 py-3 text-white outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
                  />
                  <PrimaryButton className="px-2" type="button" onClick={() => { }}>
                    Search
                  </PrimaryButton>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="">
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-slate-400">No dishes found. Try different filters.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/menu/${item.id}`)}
                  className="group relative text-left rounded-[28px] border border-white/10 bg-slate-950/90 shadow-[0_20px_60px_rgba(15,23,42,0.35)] transition hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-t-[28px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-48 w-full object-cover"
                    />
                    <span
                      className={`absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-xs font-semibold ${item.isVeg ? "bg-emerald-500/90 text-emerald-100 shadow-lg shadow-emerald-500/20" : "bg-rose-500/90 text-rose-100 shadow-lg shadow-rose-500/20"}`}
                    >
                      {item.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300/80">
                          {item.category}
                        </p>
                        <h2 className="mt-2 text-xl font-semibold text-white">{item.name}</h2>
                      </div>

                    </div>

                    <p className="text-sm text-slate-400">{item.description}</p>

                    <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                      <span>{item.servings}</span>
                      <span className="text-xs text-slate-500 transition group-hover:text-orange-300">View recipe →</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </PageShell>
  )
}

export default MainMenu