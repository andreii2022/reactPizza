import React from 'react'
import { SearchContext } from '../../App';
import debaunce from 'lodash.debounce';

import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  
  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue  = React.useCallback (
    debaunce((str) => {
      setSearchValue(str);
      
    }, 1000),
    [],
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
    };
  

    return (
       <div className={styles.root}> 
        <svg
         className={styles.icon}
         class="feather feather-search" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>
         </svg>
        <input 
         ref={inputRef}
         value={value}
         onChange={onChangeInput}
         className={styles.input} 
         placeholder='Поиск пиццы...'
          />
          {value && (
          <svg 
           onClick={onClickClear}
           className={styles.clearIcon}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg">
           <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
         </svg>
         )}

    </div> 
    );
};

export default Search;