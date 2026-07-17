import { Routes, Route } from "react-router-dom"
import { MainMenu, SignIn } from "./pages"
import { ProductedRoute } from "./components"


const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route element={<ProductedRoute />}>
        <Route path="/" element={<MainMenu />} />
      </Route>
    </Routes>
  )
}

export default App