import { rest } from 'msw';

export const handlers = [
  rest.get('*/species/*', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        name: 'Droid',
        people: [
          'https://swapi.dev/api/people/2/',
          'https://swapi.dev/api/people/3/'
        ],
        url: 'https://swapi.dev/api/species/2/'
      })
    )
  ),
  rest.get('*/people/2', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        name: 'C-3PO',
        height: '167',
        mass: '75',
        hair_color: 'n/a',
        skin_color: 'gold',
        eye_color: 'yellow',
        birth_year: '112BBY',
        gender: 'n/a',
        films: ['https://swapi.dev/api/films/1/'],
        species: ['https://swapi.dev/api/species/2/'],
        url: 'https://swapi.dev/api/people/2/'
      })
    )
  ),
  rest.get('*/people/3', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        name: 'R2-D2',
        height: '96',
        mass: '32',
        hair_color: 'n/a',
        skin_color: 'white, blue',
        eye_color: 'red',
        birth_year: '33BBY',
        gender: 'n/a',
        films: ['https://swapi.dev/api/films/1/'],
        species: ['https://swapi.dev/api/species/2/'],
        url: 'https://swapi.dev/api/people/3/'
      })
    )
  ),
  rest.get('*/films/1', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        title: 'A New Hope',
        url: 'https://swapi.dev/api/films/1/'
      })
    )
  ),
  rest.get('*/people/*', (req, res, ctx) => {
    const search = req.url.searchParams.get('search');

    if (search === 'lu') {
      return res(
        ctx.status(200),
        ctx.json({
          count: 2,
          results: [
            {
              name: 'Luke Skywalker',
              height: '172',
              mass: '77',
              hair_color: 'blond',
              skin_color: 'fair',
              eye_color: 'blue',
              birth_year: '19BBY',
              gender: 'male',
              films: ['https://swapi.dev/api/films/1/'],
              species: [],
              url: 'https://swapi.dev/api/people/1/'
            },
            {
              name: 'Luminara Unduli',
              height: '170',
              mass: '56.2',
              hair_color: 'black',
              skin_color: 'yellow',
              eye_color: 'blue',
              birth_year: '58BBY',
              gender: 'female',
              films: ['https://swapi.dev/api/films/1/'],
              species: ['https://swapi.dev/api/species/29/'],
              url: 'https://swapi.dev/api/people/64/'
            }
          ]
        })
      );
    }

    if (search === 'luke') {
      return res(
        ctx.status(200),
        ctx.json({
          count: 1,
          results: [
            {
              name: 'Luke Skywalker',
              height: '172',
              mass: '77',
              hair_color: 'blond',
              skin_color: 'fair',
              eye_color: 'blue',
              birth_year: '19BBY',
              gender: 'male',
              films: ['https://swapi.dev/api/films/1/'],
              species: [],
              url: 'https://swapi.dev/api/people/1/'
            }
          ]
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        count: 0,
        results: []
      })
    );
  })
];
