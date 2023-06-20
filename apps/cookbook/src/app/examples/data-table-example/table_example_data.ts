export interface Person {
  name: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  skin_color: string;
  birth_year: string;
  height: string;
  mass: string;
}

export interface Heading {
  title: string;
  sortable: boolean;
  sortDirection?: 'asc' | 'desc';
  textAlignment: 'start' | 'center' | 'end';
}

export const table_example_heading_data: Heading[] = [
  {
    title: 'Name',
    sortable: true,
    sortDirection: 'asc',
    textAlignment: 'start',
  },
  {
    title: 'Eyes',
    sortable: false,
    sortDirection: 'asc',
    textAlignment: 'start',
  },
  {
    title: 'Gender',
    sortable: false,
    sortDirection: 'asc',
    textAlignment: 'start',
  },
  {
    title: 'Hair',
    sortable: false,
    sortDirection: 'asc',
    textAlignment: 'start',
  },
  {
    title: 'Skin',
    sortable: false,
    sortDirection: 'asc',
    textAlignment: 'start',
  },
  {
    title: 'Birth year',
    sortable: false,
    sortDirection: 'asc',
    textAlignment: 'start',
  },
  {
    title: 'Height (cm)',
    sortable: true,
    sortDirection: 'asc',
    textAlignment: 'end',
  },
  {
    title: 'Weight (kg)',
    sortable: true,
    sortDirection: 'desc',
    textAlignment: 'end',
  },
];

export const table_example_data: Person[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
  },
  {
    name: 'C-3PO',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
  },
  {
    name: 'R2-D2',
    height: '96',
    mass: '32',
    hair_color: 'n/a',
    skin_color: 'white, blue',
    eye_color: 'red',
    birth_year: '33BBY',
    gender: 'n/a',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
  },
  {
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'brown',
    birth_year: '19BBY',
    gender: 'female',
  },
  {
    name: 'Obi-Wan Kenobi',
    height: '182',
    mass: '77',
    hair_color: 'auburn, white',
    skin_color: 'fair',
    eye_color: 'blue-gray',
    birth_year: '57BBY',
    gender: 'male',
  },
];
