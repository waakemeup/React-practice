import { render, screen, cleanup } from "@testing-library/react"
import renderer from 'react-test-renderer'
import Todo from "../todo"

// this gonna run after each test
afterEach(()=>{
  cleanup()
})

test('should render non-completed component', () => {
    const todo = {id:1,title:'wash dishes',completed:false}
    // expect(true).toBe(true)
    render( < Todo todo={todo}/ > )
    const todoElement = screen.getByTestId('todo-1')
    expect(todoElement).toBeInTheDocument()
    expect(todoElement).toHaveTextContent('wash dishes')
    expect(todoElement).not.toContainHTML('<strike>')
})

test('should render completed component', () => {
    const todo = {id:2,title:'make dinner',completed:true}
    // expect(true).toBe(true)
    render( < Todo todo={todo}/ > )
    const todoElement = screen.getByTestId('todo-2')
    expect(todoElement).toBeInTheDocument()
    expect(todoElement).toHaveTextContent('make dinner')
    // expect(todoElement).toContainHTML('<strike>')   idk why it's failing
    // expect(todoElement).toContainHTML('</strike>') no i think it's wrong
    expect(todoElement.innerHTML.includes('<strike>')).toBeTruthy()
})

test('match snapshot',()=>{
  const todo = {id:1,title:'wash dishes',completed:false}
  const tree = renderer.create(<Todo todo={todo}/>).toJSON()
  // console.log(tree);
  expect(tree).toMatchSnapshot()
})