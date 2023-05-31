## StartCoroutine
* `在 Unity 中，StartCoroutine() 是用于启动协程（Coroutine）的方法。`
* 协程是一种特殊的函数，可以`在多帧中分段执行`，以实现异步操作和延时执行等功能。

以下是关于 StartCoroutine() 方法和协程的一些要点：
1. 启动协程：通过调用 StartCoroutine() 方法并传递协程函数作为参数，可以启动一个协程。
* `协程函数是一个返回类型为 IEnumerator 的函数`，
* `它使用特殊的语法 yield return 来控制协程的执行过程。`

2. 协程函数：协程函数通过使用 `yield return 来暂停执行，并在下一帧继续执行`。
* 可以使用`多种 yield 语句来实现不同的功能，如等待一段时间、等待某个条件满足`等。

3. 异步操作：协程可以用于执行异步操作，例如等待网络请求返回、加载资源、播放动画等。
* 通过在协程中使用适当的 yield 语句，可以使协程在等待期间让出执行权，而不会阻塞主线程。

4. 延时执行：协程可以用于实现延时执行的功能。通过使用 yield return new WaitForSeconds(delayTime) 
* 可以在协程中等待指定的时间，然后继续执行下一步操作。

5. 生命周期：协程的生命周期与 MonoBehaviour 组件的生命周期相关联。
* `协程只能在继承了 MonoBehaviour 的类中启动，并且只有当对应的 MonoBehaviour 组件处于活动状态时才会执行`。





