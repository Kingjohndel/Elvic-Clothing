'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/lib/types';
import {
  DEFAULT_MAX_PRICE,
  filterAndSortProducts,
  paginateProducts,
  parseSort,
  type SortKey,
} from '@/lib/catalog';

export function useProductCatalog(products: Product[], brandFilterEnabled: boolean) {
  const searchParams = useSearchParams();
  const allSizes = useMemo(
    () => [...new Set(products.flatMap((product) => product.sizes))],
    [products],
  );
  const allColors = useMemo(
    () => [...new Set(products.flatMap((product) => product.colors.map((color) => color.name)))],
    [products],
  );
  const allBrands = useMemo(
    () =>
      [...new Set(products.map((product) => product.brandName))].sort((a, b) => a.localeCompare(b)),
    [products],
  );
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const brand = searchParams.get('brand');
    const match = products.find(
      (product) => product.brand === brand || product.brandName === brand,
    );
    return match ? [match.brandName] : [];
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const category = searchParams.get('category');
    return category ? [category] : [];
  });
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [sort, setSort] = useState<SortKey>(() => parseSort(searchParams.get('sort')));
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const topPicksOnly = searchParams.get('edit') === 'top-picks';
  const saleOnly = searchParams.get('sale') === 'true';
  const filtered = useMemo(
    () =>
      filterAndSortProducts(
        products,
        {
          query,
          brands: brandFilterEnabled ? selectedBrands : [],
          categories: selectedCategories,
          collections: selectedCollections,
          sizes: selectedSizes,
          colors: selectedColors,
          maxPrice,
          topPicksOnly,
          saleOnly,
        },
        sort,
      ),
    [
      products,
      query,
      brandFilterEnabled,
      selectedBrands,
      selectedCategories,
      selectedCollections,
      selectedSizes,
      selectedColors,
      maxPrice,
      topPicksOnly,
      saleOnly,
      sort,
    ],
  );
  const pagination = paginateProducts(filtered, page);

  function toggle(list: string[], value: string, setList: (value: string[]) => void) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
    setPage(1);
  }
  function chooseSort(value: SortKey) {
    setSort(value);
    setPage(1);
  }
  function clearAll() {
    setQuery('');
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedCollections([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setPage(1);
  }
  const activeFilterCount =
    (brandFilterEnabled ? selectedBrands.length : 0) +
    selectedCategories.length +
    selectedCollections.length +
    selectedSizes.length +
    selectedColors.length +
    (maxPrice < DEFAULT_MAX_PRICE ? 1 : 0);

  return {
    allSizes,
    allColors,
    allBrands,
    query,
    setQuery,
    selectedBrands,
    setSelectedBrands,
    selectedCategories,
    setSelectedCategories,
    selectedCollections,
    setSelectedCollections,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    maxPrice,
    setMaxPrice,
    sort,
    chooseSort,
    setPage,
    filtersOpen,
    setFiltersOpen,
    toggle,
    clearAll,
    activeFilterCount,
    filtered,
    currentPage: pagination.page,
    pageCount: pagination.pageCount,
    visibleProducts: pagination.products,
  };
}

export type ProductCatalogState = ReturnType<typeof useProductCatalog>;
