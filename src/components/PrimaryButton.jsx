const PrimaryButton = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
