export default function Button(props){
    let {text, color, disabled, children, onClick} = props;
    let displayText;

    if(children === undefined){
        displayText = text;
    }else {
        displayText = children;
    }

    return (
        <button style={{backgroundColor: color}} disabled={disabled}>
            {displayText}
        </button>
    );
}