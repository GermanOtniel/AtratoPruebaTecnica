export const userRules = [
  {
    name: 'email',
    // eslint-disable-next-line
    regExp: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    isRequired: true
  },
  {
    name: 'phone_number',
    regExp: /^\d+$/,
    isRequired: true
  },
  {
    name: 'first_name',
    regExp: /([^\s])/,
    isRequired: true
  },
  {
    name: 'second_name',
    regExp: /([^\s])/,
    isRequired: false
  },
  {
    name: 'first_last_name',
    regExp: /([^\s])/,
    isRequired: true
  },
  {
    name: 'second_last_name',
    regExp: /([^\s])/,
    isRequired: false
  },
  {
    name: 'birth_date',
    regExp: '',
    isRequired: true
  },
  {
    name: 'status',
    regExp: '',
    isRequired: true
  },
  {
    name: 'analist_id',
    regExp: '',
    isRequired: true
  }
];