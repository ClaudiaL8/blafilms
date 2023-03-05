import React from 'react'
import '../App.css'
import placeholderImg from '../placeholder.png'
import { ReactComponent as ChevronLeft } from '../chevron-left.svg'
import { ReactComponent as ChevronRight } from '../chevron-right.svg'

export const List = ({
  searchResult,
  currentPage,
  handleSearchFilmsChange,
  lastPage,
}) => {
  return (
    <>
      <div className="search-results">
        <div className="chevron">
          {currentPage > 1 && (
            <ChevronLeft
              onClick={() => {
                handleSearchFilmsChange(currentPage - 1)
              }}
            />
          )}
        </div>
        <div className="search-results-list">
          {searchResult?.map(result => (
            <div key={result.imdbID} className="search-item">
              <img
                src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                alt="poster"
              />
              <div className="search-item-data">
                <div className="title">{result.Title}</div>
                <div className="meta">{`${result.Type} | ${result.Year}`}</div>
              </div>
            </div>
          ))}
        </div>
        {lastPage > currentPage && (
          <div className="chevron">
            <ChevronRight
              onClick={() => {
                handleSearchFilmsChange(currentPage + 1)
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
