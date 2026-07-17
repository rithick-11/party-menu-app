import { menus } from "../assets/constants"

const menuData = [...menus]

const filterMenuItems = ({ category = "all", name = "", diet = "all" }) => {
  const normalizedSearch = name.trim().toLowerCase()

  return menuData.filter((item) => {
    const categoryMatch = category === "all" || item.category === category
    const dietMatch =
      diet === "all" ||
      (diet === "veg" && item.isVeg) ||
      (diet === "nonveg" && !item.isVeg)
    const nameMatch =
      !normalizedSearch || item.name.toLowerCase().includes(normalizedSearch)

    return categoryMatch && dietMatch && nameMatch
  })
}

const getMenuItemById = (id) =>
  menuData.find((item) => String(item.id) === String(id)) || null

export { menuData, filterMenuItems, getMenuItemById }
