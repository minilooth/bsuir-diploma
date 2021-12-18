export enum SortDirection {
  ASC = 'По возр.',
  DESC = 'По убыв.'
}

export const SortDirections = [
  {key: SortDirection.ASC, label: 'По возр.', query: 'asc'},
  {key: SortDirection.DESC, label: 'По убыв.', query: 'desc'}
]
