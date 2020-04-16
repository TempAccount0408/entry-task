// declare module '*.css' {
//     const content: string
//     export default content
// }
declare module '*.css'

declare module '*.scss'
// declare module '*.scss' {
//     const content: { [className: string]: string }
//     export default content
// }

declare module '*.svg' {
    const content: any
    export default content
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any
    }
}
