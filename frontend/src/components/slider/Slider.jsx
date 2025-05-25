import "swiper/css";
import { Swiper } from "swiper/react";
import { PropTypes } from "prop-types";
import { Autoplay, Keyboard } from "swiper/modules";
export default function Slider({ children }) {
    return (
        <Swiper
            modules={[Autoplay, Keyboard]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            speed={3000}
            keyboard={{
                enabled: true,
            }}
        >
            {children}
        </Swiper>
    );
}
// SwiperSlide
Slider.propTypes = {
    children: PropTypes.node.isRequired,
};
