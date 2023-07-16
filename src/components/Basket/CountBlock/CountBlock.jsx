import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import s from 'components/Basket/CountBlock/CountBlock.module.scss';

const CountBlock = ({ number, price, onMinus, onPlus, id }) => {
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
                        type="button"
                        onClick={() => onMinus(id)}
                    >
                        <AiOutlineMinus />
                    </button>
                    <span className={s.quantValue}>{number}</span>
                    <button
                        type="button"
                        onClick={() => onPlus(id)}
                    >
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>
            <div className={s.smallBox}>
                <div className={s.key }>Сума</div>
                <div className={s.sumValue}>{`${number * price} грн.` }</div>
            </div>
        </div>  
        
    )
}

export default CountBlock;