import {useState} from 'react'
import root from "./router/root.jsx"
import './App.css'
import {RouterProvider} from "react-router-dom";

function App() {

  return (
        <RouterProvider router={root}/>
  )
}

export default App
