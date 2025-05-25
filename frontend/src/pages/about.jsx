import Span from "../components/span";
import "../scss/_about.scss";
export default function About() {
    return (
        <div className="about">
            <Span />
            <div className="container">
                <h2>
                    Power by <span>TEAM D</span> :{" "}
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Saepe iure veritatis suscipit consectetur! Molestiae error
                    ipsa veniam itaque. Expedita ipsa blanditiis iste repellat
                    obcaecati voluptate rem hic fugiat vero ratione?
                </p>
                <h2>meet out members</h2>
                <ul>
                    <li>
                        <p>ABDI Naila</p>
                    </li>
                    <li>
                        <p>AMIMER Abderrahmane Mohamed Elmahdi</p>
                    </li>
                    <li>
                        <p>AOUDIA Djahid</p>
                    </li>
                    <li>
                        <p>BOUREKIA Nihad </p>
                    </li>
                    <li>
                        <p>Dhairi Fatima Ez-zahra </p>
                    </li>
                    <li>
                        <p>SEDDIKI Aridj </p>
                    </li>
                    <li>
                        <p>Zeghouf Samir</p>
                    </li>
                    <li>
                        <p>Zouaoui Mohamed </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}
