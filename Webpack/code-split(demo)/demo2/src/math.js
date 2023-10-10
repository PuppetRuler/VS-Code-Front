export function sum(...args){
    return args.reduce((m,n) => {
        return m+n
    })
}