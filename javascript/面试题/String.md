
## 版本号比较
```javascript
var compareVersion = function(version1, version2) {
    let arr1=version1.split('.').map((item)=> Number(item))
    let arr2=version2.split('.').map((item)=> Number(item))
    for(var i=0;i<arr1.length;i++){
        if(arr2[i] === undefined){
            if(Number(arr1.slice(i).join('')) === 0){
                return 0;
            }
            return 1;
        }else if(arr1[i]<arr2[i]){
            return -1;
        }else if(arr1[i]>arr2[i]){
            return 1;
        }
    }
    if(arr2.length>=i){
        if(Number(arr2.slice(i).join('')) === 0){
            return 0;
        }
        return -1;
    }
    return 0
};
```
