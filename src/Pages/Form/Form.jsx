
import axios from "axios";
import styles from './Form.module.css';
import { getDiets } from "../../Redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Form = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state?.recipes);
  const allDiets = useSelector((state) => state.allDiet);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({

    name: "",
    image: "",
    summary: "",
    healthy: "",
    steps: "",
    diets: [],
  });

  const [errors, setErrors] = useState({

    name: "",
    image: "",
    summary: "",
    healthy: "",
    steps: "",
  });
  useEffect(() => {

    dispatch(getDiets());
  }, [dispatch])


  // const changeHandler = (event) => {
  //   const property = event.target.name;
  //   const value = event.target.value;

  //   setForm({ ...form, [property]: value });
  // };
  const handleChange = (event) => {
    // const selectedDiets = Array.from(event.target.selectedOptions, (option) => option.value);
    // setForm({ ...form, diets: selectedDiets });
    const propiedad = event.target.name
    const value = event.target.value
    if (propiedad === "diets") {
      if (form?.diets.includes(value) || value === "") {
        if (form?.diets.includes(value)) {
          alert(`La dieta ${value} ya fue seleccionada`)
        }
      } else {
        setForm({ ...form, diets: [...form?.diets, value] })
      }
    } else {
      setForm({ ...form, [propiedad]: value })
    }
  };

  const borrarHandler = (dieta) => {
    const newDiet = form?.diets.filter((d) => d !== dieta)
    setForm({ ...form, diets: newDiet })

  };


  const validate = () => {
    const newErrors = {

      name: "",
      image: "",
      summary: "",
      healthy: "",
      steps: "",
    };
    if (form.diets.length === 0) {
      newErrors.diets = "Debe seleccionar al menos una opción de dieta";
    }

    if (form.name.trim() === "") {
      newErrors.name = "Nombre vacío";
    } else if (form.name.length > 50) {
      newErrors.name = "El nombre debe ser MENOR o igual a 50 caracteres";
    } else if (form.name.length < 4) {
      newErrors.name = "El nombre debe ser MAYOR o igual a  caracteres";
    } else if (!/^[a-zA-ZñÑ]+(([',. -][a-zA-ZñÑ ])?[a-zA-ZñÑ]*)*$/.test(form.name)) {
      newErrors.name = "El nombre tiene algún carácter no permitido";
    }
    if (form.image.trim() === "") {
      newErrors.image = "Image vacío";
    }
    if (form.image.trim() !== "") {
      try {
        new URL(form.image);
      } catch (error) {
        newErrors.image = "El valor ingresado no es una URL válida";
      }
    }

    if (form.healthy !== "" && (isNaN(form.healthy) || form.healthy < 1 || form.healthy > 100)) {
      newErrors.healthy = "El Healthy debe ser un número entre 1 y 100";
    } else if (form.healthy.trim() === "") {
      newErrors.healthy = "Healthy vacío";
    }

    if (form.summary.trim() === "") {
      newErrors.summary = "Summary vacío";
    } else if (form.summary.length < 10) {
      newErrors.summary = "El Summary debe ser Mayor o igual a 10 caracteres";
    } else if (form.summary.length > 300) {
      newErrors.summary = "El Summary debe ser MENOR o igual a 300 caracteres";
    }

    if (form.steps.trim() === "") {
      newErrors.steps = "Steps vacío";
    } else if (form.steps.length > 900) {
      newErrors.steps = "El Steps debe ser MENOR o igual a 900 caracteres";
    } else if (form.steps.length < 10) {
      newErrors.steps = "El Steps debe ser Mayor o igual a 10 caracteres";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === ""); // Devuelve true si no hay errores
  };

  const resetForm = () => {
    setForm({

      name: "",
      image: "",
      summary: "",
      healthy: "",
      steps: "",
      diets: [],
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!validate()) {
      setMessage("Por favor, complete o corrija correctamente todos los campos");
      return;
    }

    axios
      .post("http://localhost:3001/recipe", form)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setMessage("La receta fue creada exitosamente");
          resetForm();
        } else {
          setMessage("Verifique los datos ingresados");
        }
      })
      .catch((err) => {
        setMessage("Verifique los datos ingresados");
      });
  };

  return (
    <>
      <div className={styles.title_activities}>
        <h1>Recetas</h1>
      </div>

      <form className={styles.form} onSubmit={submitHandler}>

        <div>
          <label>Tipos de dieta:</label>
          <select name="diets" onChange={handleChange} value={form?.diets} multiple>
            <option value="">-- Seleccionar dieta --</option>
            {allDiets?.map((diet, i) => (
              <option name={diet} key={i} value={diet}>
                {diet}
              </option>
            ))}
          </select>
          {errors.diets && <span>{errors.diets}</span>}
        </div>

        <div>

          {form?.diets.map((diet, i) => (
            <div key={diet || i} className="selected-diets" value="diet">
              {diet}{" "}
              <button onClick={() => borrarHandler(diet)} name={diet}>
                x
              </button>
            </div>
          ))}
        </div>
        <div>
          <label>Nombre de la receta</label>
          <input type="text" value={form.name} onChange={handleChange} name="name" />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
  <label>Imagen de la receta</label>
  <input type="text" value={form.image} onChange={handleChange} name="image" />
  {errors.image && <span>{errors.image}</span>}
</div>

        <div>
          <label>Summary</label>
          <input type="text" value={form.summary} onChange={handleChange} name="summary" />
          {errors.summary && <span>{errors.summary}</span>}
        </div>
        <div>
          <label>Healthy</label>
          <input type="text" value={form.healthy} onChange={handleChange} name="healthy" />
          {errors.healthy && <span>{errors.healthy}</span>}
        </div>
        <div>
          <label>Steps</label>
          <input type="text" value={form.steps} onChange={handleChange} name="steps" />
          {errors.steps && <span>{errors.steps}</span>}
        </div>
        {message && <span>{message}</span>}
        <button type="submit">Crear receta</button>
      </form>
    </>
  );
};

export default Form;

