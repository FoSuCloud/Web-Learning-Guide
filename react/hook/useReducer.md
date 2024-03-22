## useReducer
* useReducer 是 React 中一个用于管理复杂状态逻辑的钩子。
* 它提供了一种替代方案，用于通过`分发操作来更新状态`，而不是直接调用 setState。

#### 使用场景
1. 数组的 增加、删除、更新 等操作通过 useReducer 可以组合到一个dispatch操作中
2. `性能优化`：在某些情况下，使用 useReducer 可以提高性能。
* 尤其是当需要`连续触发多个状态更新时`，使用 useReducer 可以将这些更新`合并成一个，减少了不必要的重渲染`。

#### 1.传递初始化函数
* 函数仅在`初始化期间运行`。当组件重新render时，例如当您在输入中键入时，它不会运行。
```javascript
import { useReducer } from 'react';

function createInitialState(username) {
    console.log("createInitialState");
    const initialTodos:any[] = [];
    for (let i = 0; i < 50; i++) {
        initialTodos.push({
            id: i,
            text: username + "'s task #" + (i + 1)
        });
    }
    return {
        draft: '',
        todos: initialTodos,
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'changed_draft': {
            return {
                draft: action.nextDraft,
                todos: state.todos,
            };
        };
        case 'added_todo': {
            return {
                draft: '',
                todos: [{
                    id: state.todos.length,
                    text: state.draft
                }, ...state.todos]
            }
        }
    }
    throw Error('Unknown action: ' + action.type);
}

export default function TodoList({ username }) {
    const [state, dispatch] = useReducer(
        reducer,
        username,
        createInitialState
    );
    return (
        <>
            <input
                value={state.draft}
                onChange={e => {
                    dispatch({
                        type: 'changed_draft',
                        nextDraft: e.target.value
                    })
                }}
            />
            <button onClick={() => {
                dispatch({ type: 'added_todo' });
            }}>Add</button>
            <ul>
                {state.todos.map(item => (
                    <li key={item.id}>
                        {item.text}
                    </li>
                ))}
            </ul>
        </>
    );
}
```

#### 2.直接传递初始状态
* 函数在每次渲染时运行，例如当您在输入中键入时。行为上没有明显的差异，但此代码效率较低。
* 在输入框输入 或者 点击add 按钮都会触发 函数调用
* 注意：useReducer 只有两个参数，第二个参数是调用函数后的结果
```javascript
import { useReducer } from 'react';

function createInitialState(username) {
    console.log("createInitialState");
    const initialTodos:any[] = [];
    for (let i = 0; i < 50; i++) {
        initialTodos.push({
            id: i,
            text: username + "'s task #" + (i + 1)
        });
    }
    return {
        draft: '',
        todos: initialTodos,
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'changed_draft': {
            return {
                draft: action.nextDraft,
                todos: state.todos,
            };
        };
        case 'added_todo': {
            return {
                draft: '',
                todos: [{
                    id: state.todos.length,
                    text: state.draft
                }, ...state.todos]
            }
        }
    }
    throw Error('Unknown action: ' + action.type);
}

export default function TodoList({ username }) {
    const [state, dispatch] = useReducer(
        reducer,
        createInitialState(username)
    );
    return (
        <>
            <input
                value={state.draft}
                onChange={e => {
                    dispatch({
                        type: 'changed_draft',
                        nextDraft: e.target.value
                    })
                }}
            />
            <button onClick={() => {
                dispatch({ type: 'added_todo' });
            }}>Add</button>
            <ul>
                {state.todos.map(item => (
                    <li key={item.id}>
                        {item.text}
                    </li>
                ))}
            </ul>
        </>
    );
}
```








