import Note from './components/Note'
import { useState } from 'react'

const App = ({ notes }) => {
  const [newNote, setNewNote] = useState('')
  const [allNotes, setAllNotes] = useState(notes)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: allNotes.length + 1,
    }
    setAllNotes(allNotes.concat(noteObject))
    setNewNote('')
  }

  const handleNewNote = (event) => {
    setNewNote(event.target.value)
  }

  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll
    ? allNotes
    : allNotes.filter((note) => note.important === true)

  const hideIrrelevant = () => {
    const show = !showAll
    setShowAll(show)
  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <ul>
          {notesToShow.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      </ul>
      <button onClick={hideIrrelevant}>
        show {showAll ? 'important' : 'all'}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNewNote} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
