export const getFilms = async (valueInput, page = 1) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=a461e386&s=${valueInput}&page=${page}`,
    )
    const { Search, totalResults, Error } = await response.json()
    return { Search, totalResults, Error }
  } catch (error) {
    return { error: 'Failed to fetch' }
  }
}
