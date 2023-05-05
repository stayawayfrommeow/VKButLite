import { useEffect, useState } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [isAuthed, setIsAuthed] = useState<boolean>(true);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
