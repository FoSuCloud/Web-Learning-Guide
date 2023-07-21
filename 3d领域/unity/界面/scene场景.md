## scene
* 场景切换
```unity
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneSwitcher : MonoBehaviour
{
    public string sceneName; // 要切换到的场景的名称

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            SceneManager.LoadScene(sceneName); // 切换到指定名称的场景
        }
    }
}
```


