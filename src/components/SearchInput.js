import React, { useState } from 'react'

export const SearchInput = ({
  setValueInput,
  valueInput,
  search,
  isLoading,
}) => {
  const [inputValidation, setInputValidation] = useState('')

  const handleChangeInput = e => {
    const inputValue = e.target.value
    setValueInput(inputValue)
    handleInputValidation(inputValue)
  }

  const isSearcherDisabled = valueInput.length <= 2 || isLoading

  const onKeyDown = ({ key }) => {
    if (!isSearcherDisabled) {
      key === 'Enter' && search()
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
    <div className="search">
      <div className="searcherInput">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChangeInput}
          onKeyDown={onKeyDown}
        />
        {inputValidation && (
          <span className="searcherInputSpan">{inputValidation}</span>
        )}
      </div>
      <button onClick={() => search()} disabled={isSearcherDisabled}>
        Search
      </button>
    </div>
  )
}
