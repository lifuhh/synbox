import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

interface Lyric {
  id: number
  text: string
}

const TestLyricsPage: React.FC = () => {
  const [lyrics, setLyrics] = useState<Lyric[]>([
    { id: 1, text: 'Line 1 of the lyrics' },
    { id: 2, text: 'Line 2 of the lyrics' },
    { id: 3, text: 'Line 3 of the lyrics' },
    { id: 4, text: 'Line 4 of the lyrics' },
    { id: 5, text: 'Line 5 of the lyrics' },
    { id: 6, text: 'Line 6 of the lyrics' },
    { id: 7, text: 'Line 7 of the lyrics' },
    { id: 8, text: 'Line 8 of the lyrics' },
    { id: 9, text: 'Line 9 of the lyrics' },
    { id: 10, text: 'Line 10 of the lyrics' },
  ])

  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    if (confirmDelete === id) {
      setLyrics(lyrics.filter((lyric) => lyric.id !== id))
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id)
    }
  }

  const handleSave = () => {
    // Here you can use the updated lyrics data
    console.log('Updated lyrics:', lyrics)
    // You can send this data to an API or perform any other action
  }

  return (
    <div className='mx-auto mt-28 flex w-full flex-col items-center'>
      <Helmet>
        <title>Lyrics Edit Test | Synbox</title>
      </Helmet>
      <h1>Lyrics Editor</h1>
      {lyrics.map((lyric) => (
        <div
          key={lyric.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
          <span style={{ marginRight: '10px' }}>{lyric.text}</span>
          <button
            onClick={() => handleDelete(lyric.id)}
            style={{
              backgroundColor: confirmDelete === lyric.id ? 'red' : 'gray',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              cursor: 'pointer',
            }}>
            {confirmDelete === lyric.id ? 'Confirm Delete' : 'Delete'}
          </button>
        </div>
      ))}
      <button
        onClick={handleSave}
        style={{
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          marginTop: '20px',
          cursor: 'pointer',
        }}>
        Save
      </button>
    </div>
  )
}

export default TestLyricsPage
