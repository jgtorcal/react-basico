import "./Card.css";
import { Link } from "react-router-dom";

function Card({ title = "titulo por defecto", description = "descripcion por defecto", image=""}) {
  return (
    <div className="Card">
      <h2>
        <Link to={title}>{title}</Link>
      </h2>
      <p>{description}</p>
      <img src={image} alt={title} />
    </div>
  );
}

export default Card;
