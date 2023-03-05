import React, { useState } from 'react'

export const SearchInput = ({
  valueInput,
  setValueInput,
  handleSearchFilmsChange,
  isLoading,
  setError,
}) => {
  const [inputValidation, setInputValidation] = useState('')

  const handleChangeInput = e => {
    const inputValue = e.target.value
    setValueInput(inputValue)
    handleInputValidation(inputValue)
    setError('')
  }

  const isSearcherDisabled = valueInput.length <= 2 || isLoading

  const onKeyDown = ({ key }) => {
    if (!isSearcherDisabled) {
      key === 'Enter' && handleSearchFilmsChange(1)
    }
  }

  const handleInputValidation = inputValue => {
    if (inputValue.length <= 2) {
      setInputValidation('Please, enter at least 3 characters.')
    } else {
      setInputValidation('')
    }
  }

  return (
    <div className="search-input-wrapper">
      <div className="search-input">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChangeInput}
          onKeyDown={onKeyDown}
        />
        {inputValidation && (
          <span className="search-input-span">{inputValidation}</span>
        )}
      </div>
      <button
        onClick={() => handleSearchFilmsChange(1)}
        disabled={isSearcherDisabled}
      >
        Search
      </button>
    </div>
  )
}
