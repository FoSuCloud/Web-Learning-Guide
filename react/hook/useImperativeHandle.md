### useImperativeHandle
* useImperativeHandle 是 React 提供的一个自定义 Hook，用于向父组件暴露子组件实例或特定方法，从而允许父组件直接调用子组件的方法或访问子组件的 DOM 元素。这可以在父子组件之间实现更灵活的通信和交互。

#### 目的：
* 允许子组件将特定的方法或实例暴露给父组件使用。
提供一种方式来限制父组件访问子组件的方法或属性，从而封装子组件的内部逻辑。
#### 使用方法：
* 在子组件中使用 useImperativeHandle 来指定需要暴露给父组件的方法或实例。
可以在父组件中通过 ref 访问子组件暴露的内容。
`useImperativeHandle(ref, createHandle, [deps])`

#### demo
```jsx
const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current.focus();
    },
    customMethod: () => {
      // 实现自定义方法
    }
  }));

  return <input ref={inputRef} />;
});

```

```jsx
const ParentComponent = () => {
  const childRef = useRef();

  // 父组件通过子组件的 ref 访问子组件暴露的方法
  const handleFocusInput = () => {
    childRef.current.focusInput(); // 调用子组件暴露的 focusInput 方法
  }

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleFocusInput}>Focus Input</button>
    </div>
  );
}
```