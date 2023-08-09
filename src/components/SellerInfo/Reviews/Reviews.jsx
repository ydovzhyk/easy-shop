import { useParams} from 'react-router-dom';
const Reviews = () => {
  const { id } = useParams();
    // const location = useLocation();
    // const owner = location.state?.owner ?? null;
  
    
    return (
        <div>`відгуки про продавця: ${id} `</div>
    )
}

export default Reviews;