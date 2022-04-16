import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { Post } from './routes/post'
import { Posts } from './routes/posts'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Posts />} />
          <Route path='/post/:postId' element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
