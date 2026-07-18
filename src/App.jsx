import { Routes, Route } from "react-router-dom"
import { MainMenu, SignIn, RecipeDetail, SavedRecipes, NotFound } from "./pages"
import { ProductedRoute } from "./components"


const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route element={<ProductedRoute />}>
        <Route path="/" element={<MainMenu />} />
        <Route path="/menu/:id" element={<RecipeDetail />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App