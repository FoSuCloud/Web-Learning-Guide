#### dependabot
* 当 Dependabot 检测到有`依赖更新`时，它会自动为你的项目创建一个拉取请求，
* `你可以查看这个拉取请求并决定是否接受更新`。
* 这样，你就可以很容易地将依赖项更新到最新版本，以确保项目的安全性和稳定性。
```yml
version: 2
updates:
  # Set update schedule for GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      # Check for updates to GitHub Actions every month
      interval: "monthly"
    groups:
      actions:
        patterns:
          - "*"
  # Set update schedule for pip
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      # Check for updates to GitHub Actions every month
      # Align with pre-commit configuration .pre-commit-config.yaml
      interval: "monthly"
    groups:
      actions:
        patterns:
          - "*"
    ignore:
      # Prevent the UI tests from failing, as the version number of ipython is visible
      # in some of the Galata snapshots
      - dependency-name: "ipython"
        update-types: ["version-update:semver-minor", "version-update:semver-patch"]
```
* 这个 dependabot.yml 文件配置了两个更新策略，一个用于 `GitHub Actions`，
* 另一个用于 `Python 的 pip 包管理器`

#### npm也可以
```yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"  # 每日检查更新
    ignore:
      # 忽略更新的依赖项
      - dependency-name: "eslint"
      - dependency-name: "react"
        versions: ["^16.0.0"]  # 版本号在 16.x.x 的范围内不更新
```
