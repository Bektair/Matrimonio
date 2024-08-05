import { useState } from 'react';
import './HooverImage.sass';

interface IProps {
    srcOriginal: string
    srcHoover: string
}


const HoverImage = (hoover: IProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        console.log("MouseoverTriggered")
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        console.log("MouseOutTriggered")
        setIsHovered(false);
    };

    return (
        <div className="image-container"                
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}>
            <img
                src={hoover.srcOriginal}
                alt="Default"
                className="image"
            />
            {isHovered && (
                <img
                    src={hoover.srcHoover}
                    alt="Hover"
                    className="image overlay"
                />
            )}
        </div>
    );
};

export default HoverImage;
