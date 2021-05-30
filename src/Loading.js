import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Loading.css';

const Loading = () => {
    return (<div data-testid="loading" className="Loading display-1 d-flex flex-column justify-content-center text-center">
        <div><FontAwesomeIcon icon={["fas", "spinner"]} size="lg" spin /></div>
    </div>);
}

export default Loading;