import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/features/categorySlice";

const SearchBar = ({ onChange, onCategoryChnage, onClear }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const { searchQuery, selectedCategory } = useSelector(
    (state) => state.search
  );

  const handleCategoryChange = (e) => {
    onCategoryChnage(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className='search-bar input-group input-group-sm'>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className='form-control-sm'>
        <option value='all'>All Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        type='text'
        value={searchQuery}
        onChange={onChange}
        className='form-control'
        placeholder='search for product(e.g. watch..)'
      />
      <button className='search-button' onClick={onClear}>
        Clear Filter
      </button>
    </div>
  );
};

export default SearchBar;
