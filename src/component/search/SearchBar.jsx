import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/features/categorySlice";
import { clearSelectedBrands } from "../../store/features/productSlice";
import {
  setSearchQuery,
  setSelectedCategory,
  clearFilters,
} from "../../store/features/searchSlice";
import { useParams } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const categories = useSelector((state) => state.category.categories);
  const isLoading = useSelector((state) => state.category.isLoading);
  const { searchQuery, selectedCategory } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    if (categoryId && categories && categories.length > 0) {
      const selectedCategory = categories.find(
        (category) => category.id === parseInt(categoryId, 10)
      );

      if (selectedCategory) {
        dispatch(setSelectedCategory(selectedCategory.name));
      } else {
        dispatch(setSelectedCategory("all"));
      }
    }
  }, [categoryId, categories, dispatch]);

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(clearSelectedBrands());
    // navigate("/products");
  };

  const handleSearchQueryChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
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
       {isLoading ? (
  <option>Loading categories...</option>
) : (
  categories?.map((category) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ))
)}
      </select>

      <input
        type='text'
        value={searchQuery}
        onChange={handleSearchQueryChange}
        className='form-control'
        placeholder='search for product(e.g. watch..)'
      />
      <button className='search-button' onClick={handleClearFilters}>
        Clear Filter
      </button>
    </div>
  );
};

export default SearchBar;
