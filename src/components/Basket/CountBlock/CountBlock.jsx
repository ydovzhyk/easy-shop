import { useState } from 'react';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import s from 'components/Basket/CountBlock/CountBlock.module.scss';

const CountBlock = ({ price }) => {
    const [value, setValue] = useState(1);

    const handleDecrement = () => {
        setValue(value - 1);
    }
    const handleIncrement = () => {
        setValue(value + 1) ;
    }

    const sum = () => {
        return price * value;
    }
    return (
        <div className={s.priceAndQuantity}>
            <div className={s.smallBox}>
                <div className={s.key }>Ціна</div>
                <div className={s.sumValue}>{`${price} грн.` }</div>
            </div>
            <div className={s.smallBox}>
                <div className={s.key }>Кількість</div>
                <div className={s.buttonWrapper}>
                    <button
                        onClick={handleDecrement}
                    >
                        <AiOutlineMinus />
                    </button>
                    <span className={s.quantValue}>{value}</span>
                    <button
                        onClick={handleIncrement}
                    >
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>
            <div className={s.smallBox}>
                <div className={s.key }>Сума</div>
                <div className={s.sumValue}>{`${sum()} грн.` }</div>
            </div>
        </div>  
        
    )
}

export default CountBlock;