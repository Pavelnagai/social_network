import styles from './FormControls.module.css'


export const FormControl = ({input, meta, ...props}: any) => {
    const error = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (error ? styles.error : '')}>
            <div>
                {props.children}
            </div>
            {error && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>
}
export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input}{...restProps}/></FormControl>
}

