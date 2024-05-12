## use-immer
* https://github.com/immerjs/use-immer
* 使用immer作为 React hook来操作状态的钩子。

#### 安装
```shell
npm install immer use-immer
```

### 更新对象例子
* 可以看到每次都需要 ... 来复制其他属性,创建新的对象
```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
    </>
  );
}
```

#### 使用Immer的写法
* 不需要使用...复制,只需要在update函数中更新对象属性即可
```jsx
import {useImmer} from "use-immer";

export default function Form() {
    const [person, setPerson] = useImmer({
        name: 'Niki de Saint Phalle',
        artwork: {
            title: 'Blue Nana',
            city: 'Hamburg',
            image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
    });

    function handleNameChange(e) {
        setPerson((draft)=>{
            draft.name = e.target.value
        })
    }

    function handleTitleChange(e) {
        setPerson((draft)=>{
            draft.artwork.title = e.target.value
        })
    }

    function handleCityChange(e) {
        setPerson((draft)=>{
            draft.artwork.city = e.target.value
        })
    }

    function handleImageChange(e) {
        setPerson((draft)=>{
            draft.artwork.image = e.target.value;
        })
    }

    return (
        <>
            <label>
                Name:
                <input
                    value={person.name}
                    onChange={handleNameChange}
                />
            </label>
            <label>
                Title:
                <input
                    value={person.artwork.title}
                    onChange={handleTitleChange}
                />
            </label>
            <label>
                City:
                <input
                    value={person.artwork.city}
                    onChange={handleCityChange}
                />
            </label>
            <label>
                Image:
                <input
                    value={person.artwork.image}
                    onChange={handleImageChange}
                />
            </label>
            <p>
                <i>{person.artwork.title}</i>
                {' by '}
                {person.name}
                <br />
                (located in {person.artwork.city})
            </p>
            <img
                src={person.artwork.image}
                alt={person.artwork.title}
            />
        </>
    );
}
```

### 数组例子
* 切换checkbox选中状态,需要创建一个新数组  
```jsx
import { useState } from 'react';

const initialList = [
    { id: 0, title: 'Big Bellies', seen: false },
    { id: 1, title: 'Lunar Landscape', seen: false },
    { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
    const [list, setList] = useState(
        initialList
    );

    function handleToggle(artworkId, nextSeen) {
        setList(list.map(artwork => {
            if (artwork.id === artworkId) {
                return { ...artwork, seen: nextSeen };
            } else {
                return artwork;
            }
        }));
    }

    return (
        <>
            <h1>Art Bucket List</h1>
            <h2>My list of art to see:</h2>
            <ItemList
                artworks={list}
                onToggle={handleToggle} />
        </>
    );
}

function ItemList({ artworks, onToggle }) {
    return (
        <ul>
            {artworks.map(artwork => (
                <li key={artwork.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={artwork.seen}
                            onChange={e => {
                                onToggle(
                                    artwork.id,
                                    e.target.checked
                                );
                            }}
                        />
                        {artwork.title}
                    </label>
                </li>
            ))}
        </ul>
    );
}
```

#### 使用immer更新数组
* 把setState改为useImmer
```jsx
    const [list, setList] = useImmer(
        initialList
    );
```
* 可以在更新函数中直接更新对应数组元素的属性
```jsx
    function handleToggle(artworkId, nextSeen) {
        setList((draft)=>{
            const item = draft.find(artwork => {
                return artwork.id === artworkId
            })
            item.seen = nextSeen;
        });
    }
```



