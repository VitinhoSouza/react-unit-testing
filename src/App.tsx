import Counter from "./components/Counter/Counter";
import List from "./components/List/List";

import "./index.css";

export default function App(){
  return (
    <>
      <List initialItems={['Victor','Edu','João']}/>
      <Counter/>
    </>
  )
}