import { useParams} from 'react-router-dom';
const About = () => {
  const { id } = useParams();
    // const location = useLocation();
    // const owner = location.state?.owner ?? null;
  
    
    return (
        <div>`Про продавця: ${id} `</div>
    )
}

export default About;