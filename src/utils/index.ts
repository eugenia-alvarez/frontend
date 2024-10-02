export function formatCurrency(amount : number){
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount)
}

export function toBoolean (str : string){
    return str.toLowerCase() === "true" //si es "true" devuelve true como boolean y si es "false" devuelve false como boolean
}