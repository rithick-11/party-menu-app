const AuthCard = ({ children }) => {
  return (
    <div className="w-full max-w-md rounded-[30px] border border-white/10 shadow-2xl shadow-black bg-[#1A1A22] p-8 backdrop-blur-xl">
      {children}
    </div>
  )
}

export default AuthCard
