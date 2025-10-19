//获取时间
export function showCreateInfo({createAt}) {
    let createDate = new Date(createAt);
    const nyr = `${createDate.getFullYear().toString().padStart(4, '0')}/${(createDate.getMonth() + 1).toString().padStart(2, '0')}/${createDate.getDate().toString().padStart(2, '0')}`
    const xsfz = `${createDate.getHours().toString().padStart(2, '0')}:${createDate.getMinutes().toString().padStart(2, '0')}`
    return `${nyr} ${xsfz}`;
}
