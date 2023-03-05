import React, { useState } from 'react'
import { List, SearchInput } from '../components'
import { getFilms } from '../methods/getFilms'

export const FilmsPage = () => {
  const [searchResult, setSearchResult] = useState(null)
  const [valueInput, setValueInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const search = async page => {
    setIsLoading(true)
    const { Search, totalResults, Error, error } = await getFilms(
      valueInput,
      page,
    )
    setSearchResult(Search)
    setLastPage(Math.round(parseInt(totalResults) / 10))
    setError(Error || error)
    setIsLoading(false)
  }

  const handleSearchFilmsChange = newPage => {
    setCurrentPage(newPage)
    search(newPage)
  }

  return (
    <div className="films-page">
      <SearchInput
        valueInput={valueInput}
        setValueInput={setValueInput}
        handleSearchFilmsChange={handleSearchFilmsChange}
        isLoading={isLoading}
        setError={setError}
      />
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && searchResult && (
        <List
          searchResult={searchResult}
          currentPage={currentPage}
          handleSearchFilmsChange={handleSearchFilmsChange}
          lastPage={lastPage}
        />
      )}
      {!isLoading && !searchResult && !error && !valueInput && (
        <h1 className="title">The Open Movie Database, search for films!</h1>
      )}
    </div>
  )
}
