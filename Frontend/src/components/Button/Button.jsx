import './Button.css';

const Button = ({ 
    size = '', 
    color = '', 
    position = '', 
    text_color = '', 
    hover = '', 
    children 
}) => {
    const buttonClasses = [
        'text2',
        'container',
        'button',
        size,
        color,
        position,
        text_color,
        hover
    ].filter(Boolean).join(' ');

    return (
        <div>
            <button className={`${buttonClasses} button:hover`}>
                {children}
            </button>
        </div>
    );
};

export default Button;