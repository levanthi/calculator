import { useState } from 'react'
import clsx from 'clsx'

import styles from './App.module.scss'
import Button from './button'

function App()
{
    const [data,setData] = useState('0')
    const btnArr = [
        '+',
        '7','8','9','-',
        '4','5','6','x',
        '1','2','3','÷',
        '%','0','.',
    ]
    function handleClick(e)
    {
        if(data==='0')
            setData(e.target.innerHTML)
        else
            setData(pre=>(pre+e.target.innerHTML))
    }
    function formatString(s)
    {
        var y=s
        while(true)
        {
            s=s.replaceAll('x','*')
            s=s.replaceAll('÷','/')
            s=s.replaceAll('%','/100')
            s=s.replaceAll('--','+')
            s=s.replaceAll('++','+')
            if(y!==s)
            {
                y=s
                continue
            }
            else
                break
        }
        
        return s
    }
    console.log(data)
    return(
        <>
            <input value={data} onChange={()=>setData(data)} className={clsx(styles.display)}/>
            <Button click={()=>setData('0')}>AC</Button>
            <Button click={()=>setData(pre=>{
                if(pre.length>1 && (pre[0]!=='-' || pre[0]!=='+' || pre[0]!=='.'
                    || pre[0]!=='x' || pre[0]!=='÷' || pre[0]!=='%'))
                    return pre.slice(0,pre.length-1)
                return '0'
                })}>DC
            </Button>
            <Button click={()=>setData(pre=>{
                if(pre[0]==='0')
                    return '0'
                return (pre[0]==='-')?pre.slice(1):`-${pre}`
                })}>+/-
            </Button>
            {btnArr.map((btn,index)=>{
                return (
                    <Button 
                        {...(index%4===0)?{warning:true}:''}
                        key={index} 
                        click={handleClick}
                    >{btn}</Button>
                )
            })}
            <Button click={()=>setData(eval(formatString(data)).toString())} warning >=</Button>
        </>
    )
}


export default App