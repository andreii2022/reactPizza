import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId, setCurrentPage} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/sceleton';
import Pagination from '../components/Pagination/index'
import {SearchContext} from '../App'

 const Home = () => {
    const dispatch = useDispatch();
    const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
    

    const {searchValue,} = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    
  

    const onChangeCategory = (id) =>{
      console.log(id)
      dispatch(setCategoryId(id));
    };

   const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
   }

  
    React.useEffect(() =>{
      setIsLoading(true);

      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const sortBy = sort.sortProperty.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue  ? `&search=${searchValue}` : '';

   

      axios.get(`https://6413417ea68505ea732e44de.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setItems(res.data);
          setIsLoading(false);
      })

    window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
                <Pagination currentPage={currentPage} onPageChange={onChangePage} />
               
        </div>
    );
};

export default Home;