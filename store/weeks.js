export const state = () => ({
  weeks: [
    {
      week: {
        status: 'lastWeek',
        dates: '1 - 7 августа',
        menu: [
          {
            name: 'Оригинальное',
            recipes: []
          },
          {
            name: 'Семейное',
            recipes: []
          },
          {
            name: '20 минут',
            recipes: []
          },
          {
            name: 'Баланс',
            recipes: []
          }
        ]
      }
    },
    {
      week: {
        status: 'currentWeek',
        dates: '8 - 14 августа',
        menu: [
          {
            name: 'Оригинальное',
            recipes: []
          },
          {
            name: 'Семейное',
            recipes: []
          },
          {
            name: '20 минут',
            recipes: []
          },
          {
            name: 'Баланс',
            recipes: []
          }
        ]
      }
    },
    {
      week: {
        status: 'nextWeek',
        dates: '15 - 21 августа',
        menu: [
          {
            name: 'Оригинальное',
            recipes: []
          },
          {
            name: 'Семейное',
            recipes: []
          },
          {
            name: '20 минут',
            recipes: []
          },
          {
            name: 'Баланс',
            recipes: []
          }
        ]
      }
    }
  ],
  menuSets: ['Оригинальное', 'Семейное', '20 минут', 'Баланс']
})

export const getters = {
  menuSets(state) {
    return state.menuSets
  }
}
