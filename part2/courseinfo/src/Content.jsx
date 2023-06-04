export const Content = ({course}) => {

    
    return (
            <div>
              <h2>{course.name}</h2>
              {course.parts.map(part => (
                  <p key={`parts${part.id}`}>{part.name}: {part.exercises}</p>
              )
              )}
            </div>
        )
}
