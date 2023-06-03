export const Button = ({handleClick, content}) => {
 return (
    <div>
     <button onClick={handleClick}>{content}</button>
     </div>
 )
}
