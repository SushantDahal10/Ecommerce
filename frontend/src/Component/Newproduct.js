import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ImagetoBase64 } from "./imagetobase64";
import { toast } from "react-hot-toast";

export default function Home() {
  const [datas, setdatas] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();

    console.log(datas);
    const { name, image, category, price } = datas;
    if (name && image && category && price) {
      const fetchdata = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadproduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/JSON",
          },
          body: JSON.stringify(datas),
        }
      );
      const fetchres = await fetchdata.json();
      console.log(fetchres);
      toast(fetchres.message);
      setdatas(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Enter all the fields");
    }
  };
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdatas((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    setdatas((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  return (
    <div>
      <div className="py-10  relative top-10 text-black">
        <div className="p-4">
          <form
            action=""
            className="m-auto w-full max-w-md shadow  flex flex-col p-3 bg-white"
            onSubmit={handlesubmit}
          >
            <label htmlFor="name">Name:</label>
            <input
              type={"text"}
              name="name"
              className="bg-slate-200 p-1"
              onChange={handleonchange}
              value={datas.name}
            ></input>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              className="bg-slate-200 p-1 my-1 "
              onChange={handleonchange}
              value={datas.category}
            >
              <option value="other">Select Category</option>
              <option value="Hp">Hp</option>
              <option value="Dell">Dell</option>
              <option value="Acer">Acer</option>
              <option value="Asus">Asus</option>
              <option value="Apple">Apple</option>
              <option value="Lenevo">Lenevo</option>
              <option value="Samsung">Samsung</option>
            </select>
            <label htmlFor="image" className="my-2">
              Image:
              <div className="h-40 w-full bg-slate-300 my-3 rounded flex items-center justify-center cursor-pointer">
                {datas.image ? (
                  <img src={datas.image} className="h-full " alt="" />
                ) : (
                  <span className="text-8xl ">
                    <AiOutlineCloudUpload />
                  </span>
                )}

                <input
                  type={"file"}
                  className="hidden"
                  id="image"
                  accept="image/*"
                  name="image"
                  onChange={uploadImage}
                />
              </div>
            </label>

            <label htmlFor="price" className="my-1">
              price:
            </label>
            <input
              type={"text"}
              className="bg-slate-200 p-1"
              onChange={handleonchange}
              name="price"
              value={datas.price}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              cols="20"
              rows="5"
              className="bg-slate-200 p-1 my-1 resize-none"
              onChange={handleonchange}
              value={datas.description}
            ></textarea>
            <button
              className="bg-red-500 hover:bg-red-600 my-4 text-white text-lg font-medium drop-shadow "
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
