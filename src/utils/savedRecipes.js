const STORAGE_KEY = "party_menu_saved_recipes"

const parseSavedRecipeIds = (value) => {
  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    return parsed.map((id) => String(id))
  } catch {
    return []
  }
}

const getSavedRecipeIds = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  return parseSavedRecipeIds(raw)
}

const setSavedRecipeIds = (ids) => {
  const normalized = Array.isArray(ids) ? ids.map((id) => String(id)) : []
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
}

const addSavedRecipeId = (id) => {
  const savedIds = getSavedRecipeIds()
  const normalized = String(id)
  if (!savedIds.includes(normalized)) {
    savedIds.push(normalized)
    setSavedRecipeIds(savedIds)
  }
  return savedIds
}

const removeSavedRecipeId = (id) => {
  const normalized = String(id)
  const savedIds = getSavedRecipeIds().filter((savedId) => savedId !== normalized)
  setSavedRecipeIds(savedIds)
  return savedIds
}

const isRecipeSaved = (id) => getSavedRecipeIds().includes(String(id))

export {
  STORAGE_KEY,
  getSavedRecipeIds,
  setSavedRecipeIds,
  addSavedRecipeId,
  removeSavedRecipeId,
  isRecipeSaved,
}
