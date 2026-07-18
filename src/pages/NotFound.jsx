import { useNavigate } from "react-router-dom"
import { PageShell, PrimaryButton } from "../components"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <PageShell>
      <div className="w-full max-w-4xl p-6">
        <div className="rounded-[30px] border border-white/10 bg-slate-950/85 p-10 text-center shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
          <p className="text-4xl font-semibold text-white">404</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Page not found</h1>
          <p className="mt-3 text-sm text-slate-400">
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <PrimaryButton type="button" onClick={() => navigate("/")}>Back to Menu</PrimaryButton>
            <button
              type="button"
              onClick={() => navigate("/saved-recipes")}
              className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-white transition hover:border-orange-400"
            >
              Saved Recipes
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default NotFound
