let a=10;
const update=(val)=>{
    a=val;
}
const getVal=()=>{
    a++;
    return a;
}
exports.getVal=getVal;
exports.update=update;

