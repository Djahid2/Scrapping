export function emtyArticles(content) {
    let bool = true
    for (let i = 0; i < content.length; i++) {
        if (content[i] !== " ") {
            bool = false
            break
        }
    }
    return bool
}