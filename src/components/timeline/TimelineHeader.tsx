import { SearchBar } from '~components/util/searchBar';

export function TimelineHeader() {
  return (
    <SearchBar
      searchFilters={['Title', 'Description']}
      searchPlaceHolder='Search for a memory'
      searchTitle='Your Timeline'
    />
  );
}
