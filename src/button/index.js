import styles from './button.module.scss'
import clsx from 'clsx'

function Button({primary , disable, children,warning,click})
{
    const classes = clsx('btn',
        {
            [styles.primary]:primary,
            'disable':disable,
            [styles.warning]:warning
        },
    )
    return(
        <button onClick={click} className={classes}>{children}</button>
    )
}

export default Button
