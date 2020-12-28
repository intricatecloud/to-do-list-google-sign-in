/* global gapi */
import { useEffect, useState } from 'react'
import './App.css';

function ToDoList() {
  const [list, setList] = useState([])
  const [newListItem, setNewListItem] = useState("")

  const createNewListItem = () => {
    const newList = list.concat(newListItem);
    setList(newList);
  }

  return (
    <div className="todo-container">
      <div className="input-container">
        <input
          type="text"
          placeholder='Buy eggs, get water...'
          value={newListItem}
          onChange={event => setNewListItem(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? createNewListItem() : null}
          >
        </input>
        <button disabled={newListItem === ''} className='primary' onClick={() => createNewListItem()}>Create</button>
      </div>
      {list && list.length > 0 && list.map((item, index) => {
        return <div key={index}>{item}<hr/></div>
      })
    }
    </div>
  )
}

function SignedOut(props) {
  useEffect(() => {
    gapi.load('signin2', () => {
      const opts = {
        width: 200,
        height: 50,
        onsuccess: props.onUserSignedIn,
      }
      gapi.signin2.render('login-button', opts)
    })
  })


  return (
    <div className="sign-in-container">
      <div id="login-button"></div>
    </div>
  )
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null)

  const onUserSignedIn = (googleUser) => {
    setIsSignedIn(true);
  }

  const onGoogleSignInLoaded = () => {
    gapi.load('auth2', () => {
      gapi.auth2.init({client_id: '1006632388683-o9hnumvl6j0fp0ckqguqeutfe3fs308g.apps.googleusercontent.com'}).then(() => {
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        setIsSignedIn(isSignedIn);
      })
    })
  }

  const addGoogleSignIn = () => {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.async = true
    script.onload = onGoogleSignInLoaded
    document.querySelector('body').appendChild(script)
  }

  useEffect(() => {
    addGoogleSignIn()
  }, [])

  const signOut = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      setIsSignedIn(false);
    });
  }

  return (
    <div className="app-container">
      <header>
        To-Do List with Google Sign-In
      </header>
      { isSignedIn && <>
        <ToDoList></ToDoList>
        <div className="sign-out-container">
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        </>
      }
      { isSignedIn === false && <SignedOut onUserSignedIn={(googleUser) => onUserSignedIn(googleUser)}></SignedOut>}
      { isSignedIn === null && <div style={{textAlign: 'center', marginTop: '5em'}}>Checking if you're signed in...</div>}
    </div>
  );
}

export default App;
