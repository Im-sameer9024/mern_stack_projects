// hooks/useCategories.ts
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { 
  getAllCategories, 
   
} from "../operations/categoryOperations";
import { clearCategoryError } from "../slices/categorySlice";

export const useCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error, lastFetched } = useSelector(
    (state: RootState) => state.category
  );

  // Auto-fetch categories if not fetched in last 5 minutes
  const shouldRefetch = !lastFetched || Date.now() - lastFetched > 5 * 60 * 1000;

  useEffect(() => {
    if (shouldRefetch && categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [dispatch, shouldRefetch, categories.length]);

  const fetchCategories = useCallback(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const addCategory = useCallback(
    (categoryData: { name: string; description: string }) => {
      return dispatch(createCategory(categoryData)).unwrap();
    },
    [dispatch]
  );

  const editCategory = useCallback(
    (id: string, categoryData: any) => {
      return dispatch(updateCategory({ id, categoryData })).unwrap();
    },
    [dispatch]
  );

  const removeCategory = useCallback(
    (categoryId: string) => {
      return dispatch(deleteCategory(categoryId)).unwrap();
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch(clearCategoryError());
  }, [dispatch]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
    clearError,
    lastFetched,
  };
};