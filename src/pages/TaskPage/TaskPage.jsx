import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import "./style.css";
import TextField from "../../components/Button/TextField/TextField";

const TaskPage = () => {
  let initialState = [
    {
      id: 1,
      nos: "Dobeles milti",
      kat: "Milti",
      cpv: 1.34,
      skaits: 20,
      selected: false,
    },
    {
      id: 2,
      nos: "Tomāti",
      kat: "Dārzeņi",
      cpv: 0.15,
      skaits: 30,
      selected: false,
    },
    {
      id: 3,
      nos: "Burkāni",
      kat: "Dārzeņi",
      cpv: 0.18,
      skaits: 25,
      selected: false,
    },
  ];
  const [wannabeinitstate, setwannabeinitstate] = useState(initialState);
  const [categorydata, setcategorydata] = useState(null);
  const [db, setdb] = useState(initialState);
  const [categories, setcategories] = useState(null);
  const [input, setinput] = useState({
    id: null,
    nos: "",
    kat: "",
    cpv: "",
    skaits: "",
    selected: false,
  });

  useEffect(() => {
    updateUniqueCategories();
  }, [db]);

  const updateUniqueCategories = () => {
    let temp = [...new Set(db.map((db) => db.kat))];
    setcategories(temp);
  };

  const handleChange = (e) => {
    let temp = db;
    if (temp[e.target.value].selected == false) {
      temp[e.target.value].selected = true;
    } else {
      temp[e.target.value].selected = false;
    }
    setdb(temp);
    setwannabeinitstate(temp);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setinput({
      ...input,
      [name]: value,
    });
  };

  const addData = () => {
    if (
      input.nos != "" &&
      input.kat != "" &&
      input.cpv != "" &&
      input.skaits != ""
    ) {
      let temp = input;
      temp.id = wannabeinitstate[wannabeinitstate.length - 1].id + 1;
      setinput({
        ...input,
        id: wannabeinitstate[wannabeinitstate.length - 1].id + 1,
      });
      setdb([...db, input]);
      setwannabeinitstate([...db, input]);
    }
  };

  const handleDelete = () => {
    const isSelected = (item) => {
      return item.selected == false;
    };
    let temp = db.filter(isSelected);
    setdb(temp);
    setwannabeinitstate(temp);
  };

  const handleCellChange = (e) => {
    const { name, value, id } = e.target;
    let temp = Array.from(db);

    temp[id][name] = value;
    setdb(temp);
    setwannabeinitstate(temp);
  };

  const selectChange = (e) => {
    const { value } = e.target;
    let temp = db.filter((item) => {
      if (item.kat == value) return item;
    });
    let sum = 0,
      count = 0;
    for (let i = 0; i < temp.length; i++) {
      sum += parseFloat(temp[i].cpv) * parseInt(temp[i].skaits);
      count += parseInt(temp[i].skaits);
    }
    setcategorydata({ count: count, sum: sum });
  };
  const [sortcount, setsortcount] = useState(1);
  const handleSort = () => {
    setsortcount(sortcount + 1);
    let temp = Array.from(wannabeinitstate);
    switch (sortcount) {
      case 0:
        setdb(wannabeinitstate);
        break;
      case 1:
        setdb(
          temp.sort((a, b) => {
            return a.skaits - b.skaits;
          })
        );
        break;
      case 2:
        setdb(
          temp.sort((a, b) => {
            return b.skaits - a.skaits;
          })
        );
        setsortcount(0);
        break;
    }
  };

  return (
    <>
      <div className="containerCol">
        <Button name="Pievienot" onClick={addData} />
        <div style={{ display: "flex", gap: ".5rem" }}>
          <TextField
            name="nos"
            value={input.nos}
            onChange={handleInputChange}
            placeholder="Nosaukums"
            type="text"
          />
          <TextField
            name="kat"
            value={input.kat}
            onChange={handleInputChange}
            placeholder="Kategorija"
            type="text"
          />
          <TextField
            name="cpv"
            value={input.cpv}
            onChange={handleInputChange}
            placeholder="CPV"
            type="number"
          />
          <TextField
            name="skaits"
            value={input.skaits}
            onChange={handleInputChange}
            placeholder="Daudzums"
            type="number"
          />
        </div>
        <Button name="Dzēst" onClick={handleDelete} />

        <div className="containerCol">
          <table>
            <thead>
              <tr>
                <th>Darbība</th>
                <th>Preces ID</th>
                <th>Nosaukums</th>
                <th>Kategorija</th>
                <th>CPV</th>
                <th id="sortable" onClick={handleSort}>
                  Daudzums
                </th>
                <th>Kopsumma</th>
              </tr>
            </thead>
            <tbody>
              {db.map((item, i) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      name="selected"
                      onChange={handleChange}
                      value={i}
                    />
                  </td>
                  <td>
                    <input type="text" value={item.id} disabled />
                  </td>
                  <td>
                    <input
                      id={i}
                      name="nos"
                      type="text"
                      value={item.nos}
                      onChange={handleCellChange}
                    />
                  </td>
                  <td>
                    <input
                      id={i}
                      name="kat"
                      type="text"
                      value={item.kat}
                      onChange={handleCellChange}
                    />
                  </td>
                  <td>
                    <input
                      id={i}
                      name="cpv"
                      type="text"
                      value={item.cpv}
                      onChange={handleCellChange}
                    />
                  </td>
                  <td>
                    <input
                      id={i}
                      name="skaits"
                      type="text"
                      value={item.skaits}
                      onChange={handleCellChange}
                    />
                  </td>
                  <td>{(item.skaits * item.cpv).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <select name="categories" id="categories" onChange={selectChange}>
            <option value="" defaultValue>
              ...
            </option>
            {categories ? (
              categories.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })
            ) : (
              <></>
            )}
          </select>
          <p>Kopskaits: {categorydata ? categorydata.count : <>...</>}</p>
          <p>Kopējā vertība: {categorydata ? categorydata.sum : <>...</>}</p>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
