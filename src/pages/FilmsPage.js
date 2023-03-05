import React, { useState } from 'react'
import { List, SearchInput } from '../components'
import { getFilms } from '../methods/getFilms'
import '../stylesheets/filmsPage.css'

export const FilmsPage = () => {
  const [data, setData] = useState({
    searchResult: null,
    lastPage: 1,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [valueInput, setValueInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const uniqueArray = arr => {
    const uniqueArray = arr.filter((value, index) => {
      const _value = JSON.stringify(value)
      return (
        index ===
        arr.findIndex(obj => {
          return JSON.stringify(obj) === _value
        })
      )
    })
    return uniqueArray
  }

  const search = async page => {
    setIsLoading(true)
    const { Search, totalResults, Error, error } = await getFilms(
      valueInput,
      page,
    )
    setData({
      searchResult: Search && uniqueArray(Search),
      lastPage: Math.round(parseInt(totalResults) / 10),
    })
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
      {!isLoading && data.searchResult && (
        <List
          data={data}
          currentPage={currentPage}
          handleSearchFilmsChange={handleSearchFilmsChange}
        />
      )}
      {!isLoading && !data.searchResult && !error && !valueInput && (
        <h1 className="title">The Open Movie Database, search for films!</h1>
      )}
    </div>
  )
}
