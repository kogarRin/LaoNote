export function setBriefContent(dataObject, contentStringLength) {
    return dataObject.content && dataObject.content.trim().length > contentStringLength ?
           `${dataObject.content.trim().slice(0, contentStringLength)}...` :
           dataObject.content.trim();
}
function awa(){
    let a = 0;
    for(let i=1; i<=1000; i++ ){
        if(i%3!==0 && i%5!==0 && i%7!==0){
            a++;
        }
    }
    console.log(a);
}
awa()