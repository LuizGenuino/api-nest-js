export class NotFoundError extends Error {
    constructor(entity: string, key: string, attribute: string = 'id'){
        super(`${entity} with ${attribute} ${key} not found`) // é assim pois declaramos o erro assim: new Error("Not Found") o super chama o construtor da classe pai
    }
}