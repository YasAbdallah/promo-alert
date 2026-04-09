import {FcLikePlaceholder, FcLike} from 'react-icons/fc';
import { Button } from './ui/button';

export default function ButtonFavorite({ favorite, handleFavorite }: { favorite: boolean, handleFavorite: () => void }) {
    return (
        <Button variant="outline" onClick={handleFavorite}>
            {favorite ? <FcLike/> : <FcLikePlaceholder/>}
        </Button>
    );
}