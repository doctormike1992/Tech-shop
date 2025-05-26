export default function Input({ label, labelClass, inputClass, hidden, id, ...props }) {
  return <>
    <label className={labelClass} {...props}>{ label}</label>
    <input className={inputClass} hidden={hidden} {...props} id={id}  />
  </>
}