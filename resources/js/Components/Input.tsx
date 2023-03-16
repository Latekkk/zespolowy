export default function input({labelText, name, value, onChange, error}) {
    return (
        <label htmlFor={props.name}>{props.labelText}</label>
    <input id={props.name} value={props.value} onChange={props.onChange}/>
    {
        errors && <div>{errors}</div>
    }
)
}
