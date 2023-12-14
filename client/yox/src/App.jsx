import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async ()=>{
      const response = await fetch("http://localhost:5500/books")
      const jsonData = await response.json()
      setData(jsonData)
    }
    fetchData()
  }, [])
  
  return (
    <>
      {data && data.map((item)=>(
        <ul>
          <li>{item.title}</li>
        </ul>
      ))}
    </>
  )
}

export default App
