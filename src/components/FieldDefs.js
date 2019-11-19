export default [
  {
    name: '__sequence',
    title: '#',
    titleClass: 'center aligned',
    dataClass: 'right aligned'
  },
  // handle for reorderable drag-and-drop lists (uses Sortable.js)
  // read more on implementation
  // {
  //   name: '__handle',
  //   dataClass: 'center aligned'
  // },
  {
    name: '__checkbox',// data will have to have id column or
    // use track-by="field_name" as vuetable ref="vuetable" attribute
    titleClass: 'center aligned',
    dataClass: 'center aligned'
  },
  {
    name: 'name',
    sortField: 'name'
  },
  {
    name: 'email',
    sortField: 'email'
  },
  {
    name: 'age',
    sortField: 'birthdate',
    dataClass: 'center aligned'
  },
  {
    name: 'birthdate',
    sortField: 'birthdate',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    callback: 'formatDate|DD-MM-YYYY'
  },
  {
    name: 'nickname',
    sortField: 'nickname',
    callback: 'allcap'
  },
  {
    name: 'gender',
    sortField: 'gender',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    callback: 'genderLabel'
  },
  {
    name: 'salary',
    sortField: 'salary',
    titleClass: 'center aligned',
    dataClass: 'right aligned',
    callback: 'formatNumber',
    // visible: false
  },
  {
    name: '__component:custom-actions',
    title: 'Actions',
    titleClass: 'center aligned',
    dataClass: 'center aligned'
  }
]
