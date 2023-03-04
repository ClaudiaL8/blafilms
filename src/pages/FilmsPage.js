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

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
    search(newPage)
  }

  return (
    <div className="filmPage">
      <SearchInput
        valueInput={valueInput}
        setValueInput={setValueInput}
        search={search}
      />
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && searchResult && (
        <List
          searchResult={searchResult}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          lastPage={lastPage}
        />
      )}
      {!isLoading && !searchResult && !error && (
        <h1 className="title">The Open Movie Database, search for films!</h1>
      )}
    </div>
  )
}
