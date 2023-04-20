import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/sceleton';
import Pagination from '../components/Pagination/index'
import {SearchContext} from '../App'

 const Home = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort.sortProperty);

    

    const {searchValue,} = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
  

    const onChangeCategory = (id) =>{
      console.log(id)
      dispatch(setCategoryId(id));
    };

  
    React.useEffect(() =>{
      setIsLoading(true);

      const order = sortType.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue  ? `&search=${searchValue}` : '';

      fetch(`https://6413417ea68505ea732e44de.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
            )
    .then((res) =>  res.json())
    .then((arr) => {
      setItems(arr);
      setIsLoading(false);
    })
    window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);

    const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
      <div className="container">
             <div className="content__top">
              <Categories value={categoryId} onChangeCategory={onChangeCategory } />
              <Sort />  
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">{isLoading ? sceletons : pizzas }</div>
                <Pagination onPageChange={(number) => setCurrentPage(number)} />
               
        </div>
    );
};

export default Home;