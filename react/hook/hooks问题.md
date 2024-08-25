## hooks问题

#### react hooks必须在函数组件内执行？
* react通过`切换上下文的方式`，在不同的时间点切换hooks指向的引用对象
```javascript
// packages/react/src/ReactHooks.js
export function useState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

function resolveDispatcher() {
  const dispatcher = ReactSharedInternals.H;
  if (__DEV__) {
    if (dispatcher === null) {
      console.error(
        'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
          ' one of the following reasons:\n' +
          '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
          '2. You might be breaking the Rules of Hooks\n' +
          '3. You might have more than one copy of React in the same app\n' +
          'See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.',
      );
    }
  }
  // Will result in a null access error if accessed outside render phase. We
  // intentionally don't throw our own error because this is in a hot path.
  // Also helps ensure this is inlined.
  return ((dispatcher: any): Dispatcher);
}
```
* `可以看出关键在于 ReactSharedInternals.H； 在这里有hook 是否在函数组件内执行的判断`
* 找到ReactSharedInternals文件 command+p快捷键
```javascript
// packages/shared/ReactSharedInternals.js
const ReactSharedInternals =
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
// packages/react/src/ReactClient.js
  ReactSharedInternals as __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,

const ReactSharedInternals: SharedStateClient = ({
  H: null,
  A: null,
  T: null,
  S: null,
}: any);
```
* `H一开始是null，所以默认执行useState会报错`
```javascript
// packages/react-reconciler/src/ReactFiberHooks.js
// 看到renderWithHooks 这个执行函数组件的代码
  if (__DEV__) {
    if (current !== null && current.memoizedState !== null) {
      ReactSharedInternals.H = HooksDispatcherOnUpdateInDEV;
    } else if (hookTypesDev !== null) {
      // This dispatcher handles an edge case where a component is updating,
      // but no stateful hooks have been used.
      // We want to match the production code behavior (which will use HooksDispatcherOnMount),
      // but with the extra DEV validation to ensure hooks ordering hasn't changed.
      // This dispatcher does that.
      ReactSharedInternals.H = HooksDispatcherOnMountWithHookTypesInDEV;
    } else {
      ReactSharedInternals.H = HooksDispatcherOnMountInDEV;
    }
  } else {
    ReactSharedInternals.H =
      current === null || current.memoizedState === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;
  }
// 把ReactSharedInternals.H 设置为HooksDispatcherOnMount /HooksDispatcherOnUpdate/HooksDispatcherOnMountWithHookTypesInDEV/HooksDispatcherOnMountInDEV
```
* `也就是我们的hook对象！`
```javascript
const HooksDispatcherOnMount: Dispatcher = {
  readContext,

  use,
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useInsertionEffect: mountInsertionEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition,
  useSyncExternalStore: mountSyncExternalStore,
  useId: mountId,
};

function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountStateImpl(initialState);
  const queue = hook.queue;
  const dispatch: Dispatch<BasicStateAction<S>> = (dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any);
  queue.dispatch = dispatch;
  return [hook.memoizedState, dispatch];
}
```
* `那么函数组件渲染完毕呢？`
```javascript
// HooksDispatcherOnMount 函数最后会执行
finishRenderingHooks(current, workInProgress, Component);
return children;
```
```javascript
  // We can assume the previous dispatcher is always this one, since we set it
  // at the beginning of the render phase and there's no re-entrance.
  ReactSharedInternals.H = ContextOnlyDispatcher;
  export const ContextOnlyDispatcher: Dispatcher = {
  readContext,

  use,
  useCallback: throwInvalidHookError,
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useImperativeHandle: throwInvalidHookError,
  useLayoutEffect: throwInvalidHookError,
  useInsertionEffect: throwInvalidHookError,
  useMemo: throwInvalidHookError,
  useReducer: throwInvalidHookError,
  useRef: throwInvalidHookError,
  useState: throwInvalidHookError,
  useDebugValue: throwInvalidHookError,
  useDeferredValue: throwInvalidHookError,
  useTransition: throwInvalidHookError,
  useSyncExternalStore: throwInvalidHookError,
  useId: throwInvalidHookError,
};
function throwInvalidHookError() {
  throw new Error(
    'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
      ' one of the following reasons:\n' +
      '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
      '2. You might be breaking the Rules of Hooks\n' +
      '3. You might have more than one copy of React in the same app\n' +
      'See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.',
  );
}
```
* 所以我们可以得出结论，在函数组件之外的周期执行 hook 函数，会报错throwInvalidHookError
* 因为此时的hook对象已经被指向了错误对象！

#### hooks如何把状态保存起来？保存的信息存在哪里？
* 函数组件的fiber里面存在Fiber.memoizedState; `Fiber.memoizedState hook状态信息，维护一个链表`
* 每个hook都会创建一个对象，记忆状态保存在hook对象上面
```javascript
// packages/react-reconciler/src/ReactFiberHooks.js
function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,

    baseState: null,
    baseQueue: null,
    queue: null,

    next: null,
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}
```
* memoizedState指向函数组件的第一个钩子

* 例如我们一个函数组件中先写了一个 useState 函数，再写了一个useMemo函数
```javascript
链表首先是：useState对象 :{
    memoizedState:1,
    baseState:1
    queue:{},
    next:{useMemo的hook}
}
根据上个节点的next指向useMemo对象：{
    memoizedState:[2,[]],
    baseState:1
    queue:{},
    next:{...}
}
```
* 由于useMemo有自己的额外依赖项，所以memoizedState属性是一个数组
```javascript
function mountMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const nextValue = nextCreate();
  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    setIsStrictModeForDevtools(true);
    nextCreate();
    setIsStrictModeForDevtools(false);
  }
  // 可以看到 useMemo的 记忆状态memoizedState 就是数组[值，依赖项]
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

#### 为什么useMemo内部引用的state参数要添加到依赖项？
* `在更新的时候，useMemo会获取上次的依赖数组，和当前的依赖项做浅比较，如果一致则不更新`
* 注意：是浅比较！
```javascript
// 由于此时是update更新周期，所以 hook对象 使用的是 HooksDispatcherOnUpdate
const HooksDispatcherOnUpdate: Dispatcher = {
  readContext,

  use,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
  useDeferredValue: updateDeferredValue,
  useTransition: updateTransition,
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId,
};
```
* 所以useMemo指向updateMemo函数
```javascript
function updateMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  // Assume these are defined. If they're not, areHookInputsEqual will warn.
  if (nextDeps !== null) {
    const prevDeps: Array<mixed> | null = prevState[1];
    // 关键代码！比较当前依赖项 和 上次依赖项 是否一致，如果一致则返回上次的计算结果！
    if (areHookInputsEqual(nextDeps, prevDeps)) {
      return prevState[0];
    }
  }
  // 否则 重新计算
  const nextValue = nextCreate();
  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    setIsStrictModeForDevtools(true);
    nextCreate();
    setIsStrictModeForDevtools(false);
  }
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```
* 关键代码是；areHookInputsEqual(nextDeps, prevDeps)
```javascript
// 对应的比较逻辑：
  // $FlowFixMe[incompatible-use] found when upgrading Flow
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    // $FlowFixMe[incompatible-use] found when upgrading Flow
    if (is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
// is函数（可以看出是浅比较！）
function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}
```

#### useEffect和useLayoutEffect 和其他state hook的区别
```javascript
function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  if (
    __DEV__ &&
    (currentlyRenderingFiber.mode & StrictEffectsMode) !== NoMode &&
    (currentlyRenderingFiber.mode & NoStrictPassiveEffectsMode) === NoMode
  ) {
    mountEffectImpl(
      MountPassiveDevEffect | PassiveEffect | PassiveStaticEffect,
      HookPassive,
      create,
      deps,
    );
  } else {
    mountEffectImpl(
      PassiveEffect | PassiveStaticEffect,
      HookPassive,
      create,
      deps,
    );
  }
}
function mountEffectImpl(
  fiberFlags: Flags,
  hookFlags: HookFlags,
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber.flags |= fiberFlags;
  // memoizedState结果是pushEffect结果
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    createEffectInstance(),
    nextDeps,
  );
}
// pushEffect的结果是如下 Effect对象！
  const effect: Effect = {
    tag,
    create,
    inst,
    deps,
    // Circular
    next: (null: any),
  };
```
* 同样的，我们也去看下 mountLayoutEffect hook的代码
```javascript
function mountLayoutEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  let fiberFlags: Flags = UpdateEffect | LayoutStaticEffect;
  if (
    __DEV__ &&
    (currentlyRenderingFiber.mode & StrictEffectsMode) !== NoMode
  ) {
    fiberFlags |= MountLayoutDevEffect;
  }
  return mountEffectImpl(fiberFlags, HookLayout, create, deps);
}
// mountEffectImpl 函数的关键代码在于
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    createEffectInstance(),
    nextDeps,
  );
```
* `所以我们可以得到结论，useEffect和useLayoutEffect的memoizedState属性是一个effect对象，而不是useState一个初始值/useMemo一个[state,deps]数组`

#### useEffect和useLayoutEffect的区别
1. memoizedState属性的tag属性不一致
2. 执行时机不一致
```markdown
* commit阶段（操作dom,提交阶段）的主要工作（即Renderer的工作流程）分为三部分： 
1. `before mutation 阶段（执行DOM操作前）会在最后执行useEffect hook`
2. mutation 阶段（执行DOM操作） 
3. `layout 阶段（执行DOM操作后）会在最后执行useLayoutEffect hook`
```
3. 执行方式不同
* useEffect是通过fiber发送`postMessage`消息，`宏任务`调度的方式`异步执行`的
* useLayoutEffect是`同步`执行的

```javascript
// packages/react-reconciler/src/ReactFiberCommitWork.js
// 查看commitHookEffectListMount函数
        // Mount
        const create = effect.create;
        if (__DEV__) {
          if ((flags & HookInsertion) !== NoHookEffect) {
            setIsRunningInsertionEffect(true);
          }
        }
        const inst = effect.inst;
        // 调用 useEffect/useLayoutEffect hook函数 
        const destroy = create();
        inst.destroy = destroy;
```
