import React, {useState} from 'react';
import { nanoid } from 'nanoid'; 

const initProds = [
  {id: id(), name: 'prod1', catg: 'catg1', cost: 100},
  {id: id(), name: 'prod2', catg: 'catg2', cost: 200},
  {id: id(), name: 'prod3', catg: 'catg3', cost: 300},
];

function id() {
  return nanoid();
}
function initObj() {
  let obj = {
    id: id(),
    name: '',
    catg: '',
    cost: '',
  }
  return obj;
}

function App() {
  const [items, setItems] = useState(initProds);
  const [obj, setObj] = useState(initObj());
  const [itemId, setItemId] = useState(null);

  let res = items.map(item => {
    return <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.catg}</td>
      <td>{item.cost}</td>
      <td><button onClick={() => setItemId(item.id)}>Редактировать</button></td>
    </tr>
  });

  function getValue(value) {
    if (itemId !== null) {
      return items.reduce((res, item) => item.id === itemId ? item[value] : res, '');
    } else {
      return obj[value];
    } 
  }

  function changeValue(value, event) {
    if (itemId !== null) {
      setItems(items.map(item => {
        if (item.id === itemId) {
          return {...item, [value]: event.target.value};
        } else {
          return item;
        }
      }));
    } else {
      return setObj({...obj, [value]: event.target.value});
    } 
  }

  function saveItem() {
    if (itemId !== null) {
      setItemId(null)
    } else {
      setItems([...items, obj]);
      setObj(initObj());
    }
  }

  return <>
    <table>
      <tbody>{res}</tbody>
    </table>

    <br />

    <input 
      value={getValue('name')} 
      onChange={event => changeValue('name', event)}
    />
    <input 
      value={getValue('catg')} 
      onChange={event => changeValue('catg', event)}
    />
    <input 
      value={getValue('cost')} 
      onChange={event => changeValue('cost', event)}
    />
    <button onClick={saveItem}>Сохранить</button>
  </>;
} 

export default App;
