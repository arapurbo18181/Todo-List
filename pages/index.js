import Head from "next/head";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";

export default function Home() {
  const [addItem, setAddItem] = useState("");
  const [showItem, setShowItem] = useState([]);
  const [toggle, setToggle] = useState(true)
  const [id, setId] = useState();
  const showTheItem = () => {
    if (!addItem) {
      alert("plz add some item first");
    } else if(addItem && !toggle){
      setShowItem(
        showItem.map((elem)=>{
          if (id===elem.id) {
            return {...elem, myData: addItem}
          }
          return elem;
        })
      )
      setToggle(true)
      setAddItem("")
      setId(null)
    }
    else {
      const allInputData = {
        id: new Date().getTime().toString(),
        myData: addItem,
      };
      setShowItem([...showItem, allInputData]);
      setAddItem("");
    }
  };
  const deleteItem = (id) => {
    const newItems = showItem.filter((elem)=>{
      return id !== elem.id;
    })
    setShowItem(newItems)
  }
  const deleteAll = () => {
    setShowItem([]);
    setAddItem("");
  };
  const editItem = (idx) => {
    const editData = showItem.find((elem)=>{
      return idx === elem.id;
    })
    setAddItem(editData.myData);
    setToggle(false);
    setId(idx);
  }
  return (
    <div className="flex justify-center items-center bg-[#062540] h-screen">
      <div className="text-center flex flex-col">
        <div>
          <Image src="/logo.jpg" alt="" height={120} width={75} />
          <h1 className="text-white my-5">Add your Todo List✌️</h1>
        </div>
        <div className="relative">
          <input
            className="p-2 rounded w-96"
            type="text"
            placeholder="✍️Add Item..."
            value={addItem}
            onChange={(e) => setAddItem(e.target.value)}
          />
          {toggle?<AiOutlinePlus
            className="absolute top-3 right-2 cursor-pointer"
            onClick={showTheItem}
          />:<FaRegEdit className="absolute top-3 right-2 cursor-pointer" onClick={showTheItem} />
          }
        </div>
        <div className="mt-6">
          {showItem.map((elem) => {
            return (
              <div className="text-white relative my-3" key={elem.id}>
                <p className="bg-[#5128d8] py-2 text-left px-2 rounded">
                  {elem.myData}
                </p>
                <div className="flex space-x-4 absolute top-3 right-1">
                  <FaRegEdit className="cursor-pointer" onClick={()=>editItem(elem.id)} />
                  <BsFillTrashFill className="cursor-pointer" onClick={()=>deleteItem(elem.id)} />
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button
            className="bg-white px-7 py-2 rounded mt-3"
            onClick={deleteAll}
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}
