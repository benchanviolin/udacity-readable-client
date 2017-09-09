import sortBy from 'sort-by'

export const sortPosts = (posts, filters) => {
  if (filters && filters.rows && posts && posts.rows) {
    const activeFilterRow = filters.rows.filter(filter => filter.id === filters.activeFilter)[0];
    posts.rows.sort(sortBy(...activeFilterRow.sortByFields));
  }
  return posts;
}
