const MenuCard = ({ title, description, price, badge, onAction }) => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:border-orange-500/20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
        {badge ? <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300">{badge}</span> : null}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-2xl font-semibold text-white">{price}</span>
        <button
          type="button"
          onClick={onAction}
          className="rounded-3xl bg-white/5 px-4 py-2 text-sm font-semibold text-orange-300 transition hover:bg-orange-500/15"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default MenuCard
