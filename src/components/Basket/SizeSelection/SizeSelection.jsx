import ProductSizes from 'components/ProductCard/Productsizes';
export const SizeSelection = ({ size }) => {
    const sizeValuesArray = size ? size.map(item => item[0].value) : [];

    return (
        // <div>
            
            <ProductSizes sizeValuesArray={sizeValuesArray} text="Оберіть розмір:"/>
        // </div>
        
    )
}