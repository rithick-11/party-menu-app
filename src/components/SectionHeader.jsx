const SectionHeader = ({ icon, title, subtitle }) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-14 items-center justify-center  text-3xl ">
        {icon}
      </div>
      <h1 className="mt-8 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-slate-400 sm:text-base">{subtitle}</p>
    </div>
  )
}

export default SectionHeader
