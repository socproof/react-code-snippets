import {FormEvent, MouseEvent, useCallback, useState} from 'react';
import './Todo.css'

interface Item {
  text: string;
  isComplete: boolean;
}

const initialData = [{
  text: 'Share hooks with the brotherhood',
  isComplete: false
}, {
  text: 'Ask brother if you may have hook',
  isComplete: false
}];

export const Todo = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [todos, setTodos] = useState<Item[]>(initialData);

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.currentTarget.value)
  }

  const setComplete = useCallback(({text: itemText}: Item) => {
    return todos.map(({text, isComplete}) => {
      if (text === itemText) {
        isComplete = !isComplete;
      }
      return {text, isComplete};
    });
  }, [todos])

  const handleComplete = (event: MouseEvent<HTMLLIElement>, item: Item) => {
    event.stopPropagation();
    setTodos(() => setComplete(item))
  }

  const handleRemove = (event: MouseEvent<HTMLButtonElement>, item: Item) => {
    event.stopPropagation();
    setTodos((todos) => {
      return todos.filter((todo) => todo !== item)
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!inputValue) {
      return;
    }

    setTodos([...todos, {text: inputValue, isComplete: false} as Item]);
    setInputValue('');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={inputValue} onChange={handleInput}/>
      </form>
      <ul>
        {todos.map((todo) =>
          <TodoItem
            item={todo}
            key={todo.text}
            handleComplete={handleComplete}
            handleRemove={handleRemove}
          />)}
      </ul>
    </>
  )
};

type TodoItemType = {
  item: Item,
  handleComplete: (e: MouseEvent<HTMLLIElement>, item: Item) => void,
  handleRemove: (e: MouseEvent<HTMLButtonElement>, item: Item) => void
}

const TodoItem = ({item, handleComplete, handleRemove}: TodoItemType) => {
  const {text, isComplete} = item;

  return (
    <li className={isComplete ? 'complete' : undefined} aria-roledescription="button" onClick={(e) => handleComplete(e, item)}>
      <div>{text}</div>
      <button onClick={(event) => handleRemove(event, item)}>Remove</button>
    </li>
  )
}
