const PAGE_SIZE = 10

// https://stackoverflow.com/questions/42761068/paginate-javascript-array
export function arrayPaginate(array, page_number) {
  if (!array) return []
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * PAGE_SIZE, page_number * PAGE_SIZE)
}

export function arrayNbrPages(array) {
  if (!array) return 1
  return Math.ceil(array.length / PAGE_SIZE)
}
