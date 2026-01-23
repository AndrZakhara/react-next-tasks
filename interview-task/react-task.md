# React Live Coding Tasks - 35 Questions

## Task 1: Fix the Counter Component

```jsx
function Counter() {
  let count = 0;

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => count++}>Increment</button>
    </div>
  );
}
```

## Task 2: Fix the Event Handler

```jsx
function Button() {
  const handleClick = () => {
    console.log("Clicked!");
  };

  return <button onClick={handleClick()}>Click me</button>;
}
```

## Task 3: Fix the Conditional Rendering

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1>}
    </div>
  );
}
```

## Task 4: Fix the List Rendering

```jsx
function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}
```

## Task 5: Fix the useEffect Hook

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

## Task 6: Fix the Form Input

```jsx
function Form() {
  const [name, setName] = useState("");

  return (
    <form>
      <input value={name} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Task 7: Fix the Props Destructuring

```jsx
function UserCard(props) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
```

## Task 8: Fix the State Update

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    setTodos(todos);
  };

  return <div>{/* render todos */}</div>;
}
```

## Task 9: Fix the Component Export

```jsx
const Header = () => {
  return <h1>My App</h1>;
}

export Header;
```

## Task 10: Fix the JSX Syntax

```jsx
function Card() {
  return (
    <div class="card">
      <h2>Title</h2>
      <p>Description</p>
    </div>
  );
}
```

## Task 11: Fix the useEffect Cleanup

```jsx
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
  }, []);

  return <div>Width: {width}</div>;
}
```

## Task 12: Fix the Callback Function

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return <Child onClick={setCount(count + 1)} />;
}
```

## Task 13: Fix the Async State Update

```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch("/api/data");
    const result = await response.json();
    setData(result);
  };

  fetchData();

  return <div>{data}</div>;
}
```

## Task 14: Fix the Key Prop

```jsx
function Items({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

## Task 15: Fix the Default Props

```jsx
function Button({ text, color }) {
  return <button style={{ color }}>{text}</button>;
}

Button.defaultProps = {
  text: "Click me",
  color: blue,
};
```

## Task 16: Fix the Context Usage

```jsx
const ThemeContext = createContext();

function ThemedButton() {
  const theme = useContext();
  return <button className={theme}>Click me</button>;
}
```

## Task 17: Fix the Ref Usage

```jsx
function Input() {
  const inputRef = useRef();

  const focus = () => {
    inputRef.focus();
  };

  return <input ref={inputRef} />;
}
```

## Task 18: Fix the Component Composition

```jsx
function App() {
  return (
    <div>
      <Header />
      <Main>
        <p>Content goes here</p>
      <Main />
      <Footer />
    </div>
  );
}
```

## Task 19: Fix the Multiple State Updates

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const incrementTwice = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={incrementTwice}>Count: {count}</button>;
}
```

## Task 20: Fix the Inline Style

```jsx
function Box() {
  return <div style="background-color: red; padding: 20px">Content</div>;
}
```

## Task 21: Fix the useMemo Hook

```jsx
function ExpensiveComponent({ items }) {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  });

  return <div>Total: {total}</div>;
}
```

## Task 22: Fix the useCallback Hook

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  });

  return <Child onClick={handleClick} />;
}
```

## Task 23: Fix the Fragment Syntax

```jsx
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}
```

## Task 24: Fix the Controlled Component

```jsx
function Checkbox() {
  const [checked, setChecked] = useState(false);

  return <input type="checkbox" checked={checked} />;
}
```

## Task 25: Fix the Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

## Task 26: Fix the Portal Usage

```jsx
function Modal({ children }) {
  return ReactDOM.createPortal(children, document.getElementById("modal-root"));
}
```

## Task 27: Fix the Custom Hook

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return [value, setValue];
}
```

## Task 28: Fix the Lazy Loading

```jsx
const LazyComponent = React.lazy(() => import("./Component"));

function App() {
  return (
    <div>
      <LazyComponent />
    </div>
  );
}
```

## Task 29: Fix the forwardRef

```jsx
const Input = forwardRef((props) => {
  return <input {...props} />;
});

function Parent() {
  const ref = useRef();
  return <Input ref={ref} />;
}
```

## Task 30: Fix the Reducer

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      state.count++;
      return state;
    case "decrement":
      return { count: state.count - 1 };
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return <div>{state.count}</div>;
}
```

## Task 31: Fix the Children Prop

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="content">{child}</div>
    </div>
  );
}
```

## Task 32: Fix the Boolean Attribute

```jsx
function Input({ disabled }) {
  return <input disabled={disabled ? "true" : "false"} />;
}
```

## Task 33: Fix the Component Lifecycle

```jsx
function Component() {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const result = await fetchData();
    setData(result);
  }, []);

  return <div>{data}</div>;
}
```

## Task 34: Fix the State Initialization

```jsx
function ExpensiveComponent() {
  const [data, setData] = useState(expensiveOperation());

  return <div>{data}</div>;
}
```

## Task 35: Fix the Event Object

```jsx
function Form() {
  const handleSubmit = (e) => {
    console.log(e.target.value);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## TypeScript Tasks

## Task 36: Fix the Component Props Type

```tsx
function Button({ label, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

## Task 37: Fix the State Type

```tsx
function UserList() {
  const [users, setUsers] = useState([]);

  const addUser = (user: { id: number; name: string; email: string }) => {
    setUsers([...users, user]);
  };

  return <div>{users.map((u) => u.name)}</div>;
}
```

## Task 38: Fix the Event Handler Type

```tsx
function Input() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return <input onChange={handleChange} />;
}
```

## Task 39: Fix the Children Type

```tsx
interface CardProps {
  title: string;
  children: any;
}

function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

## Task 40: Fix the Ref Type

```tsx
function FocusInput() {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return <input ref={inputRef} />;
}
```

## Task 41: Fix the Custom Hook Type

```tsx
function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(!value);

  return { value, toggle };
}
```

## Task 42: Fix the Context Type

```tsx
const UserContext = createContext();

interface User {
  id: number;
  name: string;
}

function UserProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
```

## Task 43: Fix the Async Function Type

```tsx
function DataFetcher() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch("/api/users");
    const result = await response.json();
    setData(result);
  };

  return <div>{data?.name}</div>;
}
```

## Task 44: Fix the Generic Component Type

```tsx
function List(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <li key={index}>{props.renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

## Task 45: Fix the Union Type Props

```tsx
type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  variant: ButtonVariant;
  onClick: () => void;
  children: string;
}

function Button({ variant, onClick, children }) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```
