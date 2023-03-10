import { useState } from 'react'
import { auth, storage } from '@/lib/firebase'
import Loader from './Loader'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

//Uploads images to Firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState(null)

  //Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    try {
      // Obtener el archivo seleccionado
      const file = Array.from(e.target.files)[0]
      const extension = file.type.split('/')[1]

      // Obtener una referencia a la ubicación del archivo
      const fileRef = ref(
        storage,
        `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
      )
      setUploading(true)

      // Iniciar la subida del archivo a Storage
      const task = uploadBytesResumable(fileRef, file)

      // Escuchar los cambios en la tarea de subida
      task.on('state_changed', (snapshot) => {
        const pct = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0)
        setProgress(pct)
      })

      // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
      task
        .then((d) => getDownloadURL(fileRef))
        .then((url) => {
          setDownloadURL(url)
          setUploading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div class='box'>
      <Loader show={uploading} />
      {uploading && <h3>{progress}</h3>}

      {!uploading && (
        <>
          <label className='btn'>
            📷 Upload IMG
            <input
              type='file'
              onChange={uploadFile}
              accept='image/x-png,image/gif,image/jpeg'
            />
          </label>
        </>
      )}

      {downloadURL && (
        <code className='upload-snippet'>{`![alt](${downloadURL})`}</code>
      )}
    </div>
  )
}
