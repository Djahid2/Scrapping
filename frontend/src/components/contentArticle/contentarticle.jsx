import { Children } from "react";
import PropTypes from "prop-types";

export default function Contentarticle({ children }) {
    return (
        <div className={"contentarticles"}>
            {Children.map(children, (child) => child)}
        </div>
    );
}
Contentarticle.propTypes = {
    children: PropTypes.node.isRequired,
};
