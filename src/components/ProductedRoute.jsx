import { Outlet, Navigate } from "react-router-dom"

const ProductedRoute = (props) => {
  if (!localStorage.getItem("jwt_token")) return <Navigate to="/signin" />

  return <Outlet {...props} />
}

export default ProductedRoute