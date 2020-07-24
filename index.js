import {Select} from './select/select'
import './select/select.scss'

const select = new Select('#select',{
  placeholder: 'Выбери пиво',
  selectedId: 4,
  data : [
    {id: 1,value: 'Жигуль'},
    {id: 2,value: 'Очакого'},
    {id: 3,value: 'Клинское'},
    {id: 4,value: 'Bud'},
    {id: 5,value: 'Heniken'},
    {id: 6,value: 'Gold Corona'},
  ],
  onSelect(item){
    console.log(item)
  }
});