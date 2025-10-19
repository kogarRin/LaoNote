//复制内容展示
export function setBriefContent(dataObject, contentStringLength) {
    return dataObject.content && dataObject.content.trim().length > contentStringLength ?
           `${dataObject.content.trim().slice(0, contentStringLength)}...` :
           dataObject.content.trim();
}
